package com.bookingapp.backend.modules.auth.dtos;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class LoginResponse {
    private String token;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LoginResponse that)) return false;
        return getToken().equals(that.getToken());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getToken());
    }
}
