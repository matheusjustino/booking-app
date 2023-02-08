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
import com.bookingapp.backend.modules.user.dtos.UserDTO;
import com.bookingapp.backend.utils.CopyPropertiesWithoutNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class PlaceService {
    private final Logger logger = LoggerFactory.getLogger(PlaceService.class);
    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;

    public PlaceDTO createPlace(UUID userId, CreatePlaceDTO data) {
        this.logger.info("PlaceService:createPlace");

        Optional<UserEntity> user = this.userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        PlaceEntity newPlace = new PlaceEntity();
        BeanUtils.copyProperties(data, newPlace, CopyPropertiesWithoutNull.getNullPropertyNames(data));
        newPlace.setOwner(user.get());
        this.placeRepository.save(newPlace);

        return this.buildPlaceResponse(newPlace, user.get());
    }

    public List<PlaceDTO> findAllPlaces() {
        this.logger.info("PlaceService:findAllPlaces");
        return this.placeRepository.findAll().stream().map(this::buildPlaceResponse).toList();
    }

    public List<PlaceDTO> findAllPlacesByOwner(UUID ownerId) {
        this.logger.info("PlaceService:findAllPlacesByOwner");
        return this.placeRepository.findPlacesByOwnerId(ownerId).stream().map(this::buildPlaceResponse).toList();
    }

    public PlaceDTO updatePlace(UUID placeId, UUID userId, UpdatePlaceDTO data) {
        this.logger.info("PlaceService:updatePlace");

        Optional<PlaceEntity> place = this.placeRepository.findPlaceByPlaceIdAndOwnerId(placeId, userId);
        if (place.isEmpty()) {
            throw new BadRequestException("Place not found");
        }

        BeanUtils.copyProperties(data, place.get(), CopyPropertiesWithoutNull.getNullPropertyNames(data));
        return this.buildPlaceResponse(place.get());
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
