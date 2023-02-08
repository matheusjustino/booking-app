package com.bookingapp.backend.modules.place;

import com.bookingapp.backend.modules.database.entities.UserEntity;
import com.bookingapp.backend.modules.place.dtos.CreatePlaceDTO;
import com.bookingapp.backend.modules.place.dtos.PlaceDTO;
import com.bookingapp.backend.modules.place.dtos.UpdatePlaceDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("/places")
public class PlaceController {
    private final PlaceService placeService;

    @PostMapping
    public ResponseEntity<PlaceDTO> createPlace(@RequestBody @Valid CreatePlaceDTO body) {
        UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return ResponseEntity.status(HttpStatus.OK).body(this.placeService.createPlace(userId, body));
    }

    @GetMapping
    public ResponseEntity<List<PlaceDTO>> findAllPlaces() {
        return ResponseEntity.status(HttpStatus.OK).body(this.placeService.findAllPlaces());
    }

    @GetMapping("/user")
    public ResponseEntity<List<PlaceDTO>> findAllPlacesByOwner() {
        UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return ResponseEntity.status(HttpStatus.OK).body(this.placeService.findAllPlacesByOwner(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlaceDTO> updatePlace(@PathVariable("id") UUID placeId, @RequestBody UpdatePlaceDTO body) {
        UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return ResponseEntity.status(HttpStatus.OK).body(this.placeService.updatePlace(placeId, userId, body));
    }
}
