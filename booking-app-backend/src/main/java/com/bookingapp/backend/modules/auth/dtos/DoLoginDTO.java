package com.bookingapp.backend.modules.auth.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class DoLoginDTO {
    @NotBlank
    private String email;
    @NotBlank
    private String password;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DoLoginDTO that)) return false;
        return getEmail().equals(that.getEmail()) && getPassword().equals(that.getPassword());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getEmail(), getPassword());
    }
}
