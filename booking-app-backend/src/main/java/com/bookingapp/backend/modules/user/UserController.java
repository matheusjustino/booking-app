package com.bookingapp.backend.modules.user;

import com.bookingapp.backend.modules.user.dtos.UpdateUserDTO;
import com.bookingapp.backend.modules.user.dtos.UserDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getOne(@PathVariable("id") UUID userId) {
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.getOne(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateOne(@PathVariable("id") UUID userId, @RequestBody @Valid UpdateUserDTO body) {
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.updateOne(userId, body));
    }
}
