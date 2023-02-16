package com.bookingapp.backend.modules.auth;

import com.bookingapp.backend.modules.auth.dtos.DoLoginDTO;
import com.bookingapp.backend.modules.auth.dtos.LoginResponse;
import com.bookingapp.backend.modules.auth.dtos.RegisterDTO;
import com.bookingapp.backend.modules.user.dtos.UserDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Controller
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody @Valid RegisterDTO body) {
        return ResponseEntity.status(HttpStatus.OK).body(this.authService.register(body));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> doLogin(@RequestBody @Valid DoLoginDTO body) {
        return ResponseEntity.status(HttpStatus.OK).body(this.authService.doLogin(body));
    }
}
