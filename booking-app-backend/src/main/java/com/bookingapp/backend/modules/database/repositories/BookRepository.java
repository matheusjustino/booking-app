package com.bookingapp.backend.modules.database.repositories;

import com.bookingapp.backend.modules.database.entities.BookEntity;
import com.bookingapp.backend.modules.database.entities.PlaceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, UUID> {
    @Query("SELECT b FROM BookEntity b WHERE b.owner.id = :ownerId")
    List<BookEntity> findBookByOwnerId(@Param("ownerId") UUID ownerId);

    @Query("SELECT b FROM BookEntity b WHERE b.id = :bookId AND b.owner.id = :ownerId")
    Optional<PlaceEntity> findBookByBookIdAndOwnerId(@Param("bookId") UUID bookId, @Param("ownerId") UUID ownerId);
}
