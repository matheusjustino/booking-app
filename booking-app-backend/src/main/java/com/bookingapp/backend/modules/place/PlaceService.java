package com.bookingapp.backend.modules.place;

import com.bookingapp.backend.exceptions.exceptions.BadRequestException;
import com.bookingapp.backend.exceptions.exceptions.ResourceNotFoundException;
import com.bookingapp.backend.modules.database.entities.PlaceEntity;
import com.bookingapp.backend.modules.database.entities.UserEntity;
import com.bookingapp.backend.modules.database.repositories.PlaceRepository;
import com.bookingapp.backend.modules.database.repositories.UserRepository;
import com.bookingapp.backend.modules.place.dtos.CreatePlaceDTO;
import com.bookingapp.backend.modules.place.dtos.PlaceDTO;
import com.bookingapp.backend.modules.place.dtos.UpdatePlaceDTO;
import com.bookingapp.backend.modules.place.interfaces.PlaceServiceInterface;
import com.bookingapp.backend.modules.storage.StorageService;
import com.bookingapp.backend.modules.user.dtos.UserDTO;
import com.bookingapp.backend.utils.CopyPropertiesWithoutNull;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CountDownLatch;
import java.util.regex.Pattern;

@RequiredArgsConstructor
@Service
public class PlaceService implements PlaceServiceInterface {
    private final Logger logger = LoggerFactory.getLogger(PlaceService.class);
    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;
    private final StorageService storageService;

    @Transactional
    public void createPlace(UUID userId, CreatePlaceDTO data, List<MultipartFile> files) {
        Optional<UserEntity> user = this.userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        PlaceEntity newPlace = new PlaceEntity();
        BeanUtils.copyProperties(data, newPlace, CopyPropertiesWithoutNull.getNullPropertyNames(data));
        newPlace.setOwner(user.get());
        List<String> photos = new ArrayList<>();
        List<CompletableFuture<Void>> futures = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                String originalFilename = file.getOriginalFilename();
                String[] splitFilename = originalFilename.split(Pattern.quote("."));
                String filename = splitFilename[0] + "-" + new Date().getTime() + "." + splitFilename[1];

                CompletableFuture<Void> future = CompletableFuture.runAsync(() ->
                        this.storageService.saveFile(userId, filename, file)
                ).exceptionally(ex -> {
                    this.logger.error(ex.getMessage(), ex.getCause());
                    throw new BadRequestException("Couldn't save file: " + filename);
                });

                futures.add(future);
                photos.add(filename);
            } catch (Exception e) {
                this.logger.error(e.getMessage(), e.getCause());
                throw new BadRequestException("Couldn't save image");
            }
        }

        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
        newPlace.setPhotos(photos);
        this.placeRepository.save(newPlace);
    }

    public List<PlaceDTO> findAllPlaces() {
        this.logger.info("PlaceService:findAllPlaces");
        return this.placeRepository.findAll().stream().map(this::buildPlaceResponse).toList();
    }

    public PlaceDTO findById(UUID placeId) {
        this.logger.info("PlaceService:findById");

        Optional<PlaceEntity> placeEntity = this.placeRepository.findById(placeId);
        if (placeEntity.isEmpty()) {
            throw new BadRequestException("Place not found");
        }

        return this.buildPlaceResponse(placeEntity.get());
    }

    public InputStream getFileImage(String filename) {
        this.logger.info("PlaceService:getFileImage");
        return this.storageService.loadAsResource(filename);
    }

    public List<PlaceDTO> findPlacesByOwnerId(UUID ownerId) {
        this.logger.info("PlaceService:findPlacesByOwnerId");
        return this.placeRepository.findPlacesByOwnerId(ownerId).stream().map(this::buildPlaceResponse).toList();
    }

    @Transactional
    @SuppressWarnings("ConstantConditions")
    public PlaceDTO updatePlace(UUID ownerId, UUID placeId, UpdatePlaceDTO data, @Nullable List<MultipartFile> files) {
        Optional<PlaceEntity> placeEntity = this.placeRepository.findPlaceByOwnerId(ownerId, placeId);
        if (placeEntity.isEmpty()) {
            throw new BadRequestException("Place not found");
        }

        List<CompletableFuture<Void>> futures = new ArrayList<>();
        List<String> newPhotos = new ArrayList<>();

        this.deletePlacePhotos(ownerId, futures, placeEntity.get().getPhotos(), data.getPhotos());

        if (files != null) {
            for (MultipartFile file : files) {
                String originalFilename = file.getOriginalFilename();
                String[] splitFilename = originalFilename.split(Pattern.quote("."));
                String filename = splitFilename[0] + "-" + new Date().getTime() + "." + splitFilename[1];
                newPhotos.add(filename);

                CompletableFuture<Void> future = CompletableFuture.runAsync(() ->
                        this.storageService.saveFile(ownerId, filename, file)
                ).exceptionally(ex -> {
                    this.logger.error(ex.getMessage(), ex.getCause());
                    throw new BadRequestException("Couldn't save file: " + filename);
                });
                futures.add(future);
            }
        }

        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

        BeanUtils.copyProperties(data, placeEntity.get(), CopyPropertiesWithoutNull.getNullPropertyNames(data));
        if (data.getPhotos() != null) {
            newPhotos.addAll(data.getPhotos());
        }
        placeEntity.get().setPhotos(newPhotos);
        this.placeRepository.save(placeEntity.get());

        return this.buildPlaceResponse(placeEntity.get());
    }

    private void deletePlacePhotos(UUID ownerId, List<CompletableFuture<Void>> futures, List<String> entityPhotos, @Nullable List<String> photosToDelete) {
        if (photosToDelete == null) {
            for (String photo : entityPhotos) {
                CompletableFuture<Void> future = CompletableFuture.runAsync(() ->
                        this.storageService.deleteFile(ownerId, photo)
                ).exceptionally(ex -> {
                    this.logger.error(ex.getMessage(), ex.getCause());
                    throw new BadRequestException("Couldn't delete file: " + photo);
                });
                futures.add(future);
            }
        } else {
            for (String photo : entityPhotos) {
                if (!photosToDelete.contains(photo)) {
                    CompletableFuture<Void> future = CompletableFuture.runAsync(() ->
                            this.storageService.deleteFile(ownerId, photo)
                    ).exceptionally(ex -> {
                        this.logger.error(ex.getMessage(), ex.getCause());
                        throw new BadRequestException("Couldn't delete file: " + photo);
                    });
                    futures.add(future);
                }
            }
        }
    }

    private PlaceDTO buildPlaceResponse(PlaceEntity placeEntity) {
        PlaceDTO placeDTO = new PlaceDTO();
        BeanUtils.copyProperties(placeEntity, placeDTO);
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(placeEntity.getOwner(), userDTO);
        placeDTO.setOwner(userDTO);

        return placeDTO;
    }

    private PlaceDTO buildPlaceResponse(PlaceEntity placeEntity, UserEntity user) {
        PlaceDTO placeDTO = new PlaceDTO();
        BeanUtils.copyProperties(placeEntity, placeDTO);
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(user, userDTO);
        placeDTO.setOwner(userDTO);

        return placeDTO;
    }
}
