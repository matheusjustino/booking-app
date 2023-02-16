package com.bookingapp.backend.modules.database.repositories;

import com.bookingapp.backend.modules.database.entities.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, UUID> {
/*    Optional<ImageEntity> findByName(String name);
    List<ImageEntity> findByPlaceId(UUID placeId);*/
}
