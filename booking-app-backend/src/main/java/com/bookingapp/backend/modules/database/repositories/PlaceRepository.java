package com.bookingapp.backend.modules.database.repositories;

import com.bookingapp.backend.modules.database.entities.PlaceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlaceRepository extends JpaRepository<PlaceEntity, UUID> {
    @Query("SELECT p FROM PlaceEntity p WHERE p.owner.id = :ownerId")
    List<PlaceEntity> findPlacesByOwnerId(@Param("ownerId") UUID ownerId);
    @Query("SELECT p FROM PlaceEntity p WHERE p.id = :placeId AND p.owner.id = :ownerId")
    Optional<PlaceEntity> findPlaceByPlaceIdAndOwnerId(@Param("placeId") UUID placeId, @Param("ownerId") UUID ownerId);
}
