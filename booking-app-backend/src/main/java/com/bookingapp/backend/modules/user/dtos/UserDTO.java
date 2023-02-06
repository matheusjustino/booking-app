package com.bookingapp.backend.modules.user.dtos;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class UserDTO {
    private UUID id;
    private String username;
    private String email;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserDTO userDTO)) return false;
        return getId().equals(userDTO.getId()) && getUsername().equals(userDTO.getUsername()) && getEmail().equals(userDTO.getEmail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getUsername(), getEmail());
    }
}
