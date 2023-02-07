package com.bookingapp.backend.modules.place;

import com.bookingapp.backend.exceptions.exceptions.ResourceNotFoundException;
import com.bookingapp.backend.modules.database.entities.PlaceEntity;
import com.bookingapp.backend.modules.database.entities.UserEntity;
import com.bookingapp.backend.modules.database.repositories.PlaceRepository;
import com.bookingapp.backend.modules.database.repositories.UserRepository;
import com.bookingapp.backend.modules.place.dtos.CreatePlaceDTO;
import com.bookingapp.backend.modules.place.dtos.PlaceDTO;
import com.bookingapp.backend.modules.user.dtos.UserDTO;
import com.bookingapp.backend.utils.CopyPropertiesWithoutNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PlaceService {
    private final Logger logger = LoggerFactory.getLogger(PlaceService.class);
    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;

    public PlaceDTO createPlace(CreatePlaceDTO data) {
        this.logger.info("PlaceService:createPlace");

        Optional<UserEntity> user = this.userRepository.findById(data.getUserId());
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        PlaceEntity newPlace = new PlaceEntity();
        BeanUtils.copyProperties(data, newPlace, CopyPropertiesWithoutNull.getNullPropertyNames(data));
        newPlace.setOwner(user.get());
        this.placeRepository.save(newPlace);

        return this.buildCreatePlaceResponse(newPlace, user.get());
    }

    private PlaceDTO buildCreatePlaceResponse(PlaceEntity placeEntity, UserEntity user) {
        PlaceDTO placeDTO = new PlaceDTO();
        BeanUtils.copyProperties(placeEntity, placeDTO);
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(user, userDTO);
        placeDTO.setOwner(userDTO);

        return placeDTO;
    }
}
