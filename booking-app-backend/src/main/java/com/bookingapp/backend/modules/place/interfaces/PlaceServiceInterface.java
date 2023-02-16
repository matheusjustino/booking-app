package com.bookingapp.backend.modules.place.interfaces;

import com.bookingapp.backend.modules.place.dtos.CreatePlaceDTO;
import com.bookingapp.backend.modules.place.dtos.PlaceDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.UUID;

public interface PlaceServiceInterface {
    void createPlace(UUID userId, CreatePlaceDTO data, List<MultipartFile> files);
    List<PlaceDTO> findAllPlaces();
    PlaceDTO findById(UUID placeId);
    InputStream getFileImage(String filename);
    List<PlaceDTO> findPlacesByOwnerId(UUID ownerId);
}
