package com.bookingapp.backend.modules.place.dtos;

import com.bookingapp.backend.modules.user.dtos.UserDTO;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class PlaceDTO {
    private UUID id;
    private UserDTO owner;
    private String title;
    private String address;
    private List<String> photos;
    private String description;
    private List<String> perks;
    private String extraInfo;
    private Integer checkIn;
    private Integer checkOut;
    private Integer maxGuests;
    private Double price;
}
