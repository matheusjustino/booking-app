package com.bookingapp.backend.modules.place;

import com.bookingapp.backend.exceptions.exceptions.BadRequestException;
import com.bookingapp.backend.modules.database.entities.UserEntity;
import com.bookingapp.backend.modules.place.dtos.CreatePlaceDTO;
import com.bookingapp.backend.modules.place.dtos.PlaceDTO;
import com.bookingapp.backend.modules.place.dtos.UpdatePlaceDTO;
import org.apache.tika.Tika;
import org.springframework.core.io.InputStreamResource;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("/places")
public class PlaceController {
    private final PlaceService placeService;

    @PostMapping
    public ResponseEntity<?> createPlace(@ModelAttribute @Valid CreatePlaceDTO body, @RequestParam("images") List<MultipartFile> files) {
        UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        this.placeService.createPlace(userId, body, files);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<PlaceDTO>> findAllPlaces() {
        return ResponseEntity.status(HttpStatus.OK).body(this.placeService.findAllPlaces());
    }

    @GetMapping("/images/{filename}")
    public ResponseEntity<InputStreamResource> getFileImage(@PathVariable("filename") String filename) {
        try {
            Tika tika = new Tika();
            String mimeType = tika.detect(this.placeService.getFileImage(filename));
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.valueOf(mimeType))
                    .body(new InputStreamResource(this.placeService.getFileImage(filename)));
        } catch (Exception exception) {
            throw new BadRequestException(exception.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlaceDTO> findById(@PathVariable("id") UUID placeId) {
        return ResponseEntity.status(HttpStatus.OK).body(this.placeService.findById(placeId));
    }

    @GetMapping("/user")
    public ResponseEntity<List<PlaceDTO>> findPlacesByOwner() {
        UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return ResponseEntity.status(HttpStatus.OK).body(this.placeService.findPlacesByOwnerId(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlaceDTO> updatePlace(@PathVariable("id") UUID placeId, @ModelAttribute UpdatePlaceDTO body, @RequestParam("images") @Nullable List<MultipartFile> files) {
        UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return ResponseEntity.status(HttpStatus.OK).body(this.placeService.updatePlace(userId, placeId, body, files));
    }
}
