package com.bookingapp.backend.modules.auth.jwt;

import com.bookingapp.backend.exceptions.exceptions.BadRequestException;
import com.bookingapp.backend.exceptions.exceptions.UnauthorizedException;
import com.bookingapp.backend.modules.auth.JWTService;
import com.bookingapp.backend.modules.auth.dtos.DoLoginDTO;
import com.bookingapp.backend.modules.auth.dtos.LoginResponse;
import com.bookingapp.backend.modules.auth.dtos.RegisterDTO;
import com.bookingapp.backend.modules.user.dtos.UserDTO;
import com.bookingapp.backend.modules.database.entities.UserEntity;
import com.bookingapp.backend.modules.database.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    /**
     * Método que salva um novo usuário na base de dados
     * @param data campos necessários para a criação de um usuário
     * @return retorna o usuário criado
     */
    @Transactional
    public UserDTO register(RegisterDTO data) {
        this.logger.info("AuthService:register");

        Optional<UserEntity> alreadyExists = this.userRepository.findByEmail(data.getEmail());

        if (alreadyExists.isPresent()) {
            throw new BadRequestException("Email already exists");
        }

        data.setPassword(this.passwordEncoder.encode(data.getPassword()));
        UserEntity newUser = new UserEntity();
        BeanUtils.copyProperties(data, newUser);
        this.userRepository.save(newUser);

        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(newUser, userDTO);
        return userDTO;
    }

    /**
     * Método que autentica um usuário
     * @param data campos necessários para a autenticação
     * @return retorna um token de autenticação válido por 12h
     */
    public LoginResponse doLogin(DoLoginDTO data) {
        this.logger.info("AuthService:doLogin");

        Optional<UserEntity> user = this.userRepository.findByEmail(data.getEmail());

        if (user.isEmpty()) {
            throw new UnauthorizedException("Invalid credentials");
        }

        boolean validPassword = this.passwordEncoder.matches(data.getPassword(), user.get().getPassword());

        if (!validPassword) {
            throw new UnauthorizedException("Invalid credentials");
        }

        String jwtToken = this.jwtService.generateToken(user.get());
        LoginResponse response = new LoginResponse();
        response.setToken(jwtToken);
        return response;
    }
}
