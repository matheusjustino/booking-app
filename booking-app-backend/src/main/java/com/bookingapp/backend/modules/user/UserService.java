package com.bookingapp.backend.modules.user;

import com.bookingapp.backend.exceptions.exceptions.ResourceNotFoundException;
import com.bookingapp.backend.modules.database.entities.UserEntity;
import com.bookingapp.backend.modules.database.repositories.UserRepository;
import com.bookingapp.backend.modules.user.dtos.UpdateUserDTO;
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
public class UserService {
    private final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    public UserDTO me(UUID userId) {
        this.logger.info("UserService:me");
        return this.getOne(userId);
    }

    public List<UserDTO> findAll() {
        this.logger.info("UserService:findAll");
        return this.userRepository.findAll().stream().map(this::convertToUserDTO).toList();
    }

    public UserDTO getOne(UUID userId) {
        this.logger.info("UserService:getOne");

        Optional<UserEntity> user = this.userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        return this.convertToUserDTO(user.get());
    }

    public UserDTO updateOne(UUID userId, UpdateUserDTO data) {
        this.logger.info("UserService:updateOne");

        Optional<UserEntity> user = this.userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        UserEntity updatedUser = new UserEntity();
        BeanUtils.copyProperties(user, data, CopyPropertiesWithoutNull.getNullPropertyNames(data));
        this.userRepository.save(updatedUser);
        
        return this.convertToUserDTO(user.get());
    }

    private UserDTO convertToUserDTO(UserEntity user) {
        UserDTO mappedUser = new UserDTO();
        BeanUtils.copyProperties(user, mappedUser);
        return mappedUser;
    }
}
