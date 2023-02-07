package com.bookingapp.backend.modules.place.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class CreatePlaceDTO {
    @NotNull
    private UUID userId;
    @NotBlank
    private String title;
    @NotBlank
    private String address = "";
    private String description = "";
    private List<String> perks = new ArrayList<>();
    private List<String> photos = new ArrayList<>();
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
        return getUserId().equals(that.getUserId()) && getTitle().equals(that.getTitle()) && getAddress().equals(that.getAddress()) && Objects.equals(getPerks(), that.getPerks()) && Objects.equals(getExtraInfo(), that.getExtraInfo()) && Objects.equals(getCheckIn(), that.getCheckIn()) && Objects.equals(getCheckOut(), that.getCheckOut()) && Objects.equals(getMaxGuests(), that.getMaxGuests()) && getPrice().equals(that.getPrice());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserId(), getTitle(), getAddress(), getPerks(), getExtraInfo(), getCheckIn(), getCheckOut(), getMaxGuests(), getPrice());
    }
}
