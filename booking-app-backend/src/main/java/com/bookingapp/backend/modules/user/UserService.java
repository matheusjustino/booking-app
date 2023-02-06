package com.bookingapp.backend.modules.user;

import com.bookingapp.backend.modules.database.entities.UserEntity;
import com.bookingapp.backend.modules.database.repositories.UserRepository;
import com.bookingapp.backend.modules.user.dtos.UserDTO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {
    private final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    public List<UserDTO> findAll() {
        this.logger.info("UserService:findAll");
        return this.userRepository.findAll().stream().map(this::convertToUserDTO).toList();
    }

    private UserDTO convertToUserDTO(UserEntity user) {
        UserDTO mappedUser = new UserDTO();
        BeanUtils.copyProperties(user, mappedUser);
        return mappedUser;
    }
}
