package com.bookingapp.backend.modules.place.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class CreatePlaceDTO {
    @NotBlank
    private String title;
    @NotBlank
    private String address = "";
    private String description = "";
    private List<String> perks = new ArrayList<>();
    private String extraInfo = "";
    private Integer checkIn = 0;
    private Integer checkOut = 0;
    private Integer maxGuests = 0;
    @NotNull
    private Double price;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CreatePlaceDTO that)) return false;
        return getTitle().equals(that.getTitle()) && getAddress().equals(that.getAddress()) && getDescription().equals(that.getDescription()) && getPerks().equals(that.getPerks()) && getExtraInfo().equals(that.getExtraInfo()) && getCheckIn().equals(that.getCheckIn()) && getCheckOut().equals(that.getCheckOut()) && getMaxGuests().equals(that.getMaxGuests()) && getPrice().equals(that.getPrice());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getTitle(), getAddress(), getDescription(), getPerks(), getExtraInfo(), getCheckIn(), getCheckOut(), getMaxGuests(), getPrice());
    }
}
