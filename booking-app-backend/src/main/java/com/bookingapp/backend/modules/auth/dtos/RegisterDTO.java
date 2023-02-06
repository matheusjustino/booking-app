package com.bookingapp.backend.modules.auth.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class RegisterDTO {
    @NotBlank
    private String username;
    @NotBlank
    private String email;
    @NotBlank
    private String password;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RegisterDTO that)) return false;
        return getUsername().equals(that.getUsername()) && getEmail().equals(that.getEmail()) && getPassword().equals(that.getPassword());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUsername(), getEmail(), getPassword());
    }
}
