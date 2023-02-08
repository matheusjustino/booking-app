package com.bookingapp.backend.modules.book.dtos;

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
public class CreateBookDTO {
    @NotBlank
    private UUID placeId;
    @NotBlank
    private Date checkIn = new Date();
    @NotBlank
    private Date checkOut = new Date();
    @NotBlank
    private String name = "";
    @NotBlank
    private String phone = "";
    private Double price;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CreateBookDTO that)) return false;
        return getPlaceId().equals(that.getPlaceId()) && getCheckIn().equals(that.getCheckIn()) && getCheckOut().equals(that.getCheckOut()) && getName().equals(that.getName()) && getPhone().equals(that.getPhone()) && Objects.equals(getPrice(), that.getPrice());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getPlaceId(), getCheckIn(), getCheckOut(), getName(), getPhone(), getPrice());
    }
}
