package com.bookingapp.backend.modules.book.dtos;

import com.bookingapp.backend.modules.place.dtos.PlaceDTO;
import com.bookingapp.backend.modules.user.dtos.UserDTO;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class BookDTO {
    private UUID id;
    private PlaceDTO place;
    private UserDTO user;
    private Date checkIn;
    private Date checkOut;
    private String name;
    private String phone;
    private Double price;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BookDTO bookDTO)) return false;
        return getId().equals(bookDTO.getId()) && getPlace().equals(bookDTO.getPlace()) && getUser().equals(bookDTO.getUser()) && getCheckIn().equals(bookDTO.getCheckIn()) && getCheckOut().equals(bookDTO.getCheckOut()) && getName().equals(bookDTO.getName()) && getPhone().equals(bookDTO.getPhone()) && getPrice().equals(bookDTO.getPrice());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getPlace(), getUser(), getCheckIn(), getCheckOut(), getName(), getPhone(), getPrice());
    }
}
