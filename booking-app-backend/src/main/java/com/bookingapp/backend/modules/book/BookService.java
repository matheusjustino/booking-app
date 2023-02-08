package com.bookingapp.backend.modules.book;

import com.bookingapp.backend.exceptions.exceptions.ResourceNotFoundException;
import com.bookingapp.backend.modules.book.dtos.BookDTO;
import com.bookingapp.backend.modules.book.dtos.CreateBookDTO;
import com.bookingapp.backend.modules.database.entities.BookEntity;
import com.bookingapp.backend.modules.database.entities.PlaceEntity;
import com.bookingapp.backend.modules.database.entities.UserEntity;
import com.bookingapp.backend.modules.database.repositories.BookRepository;
import com.bookingapp.backend.modules.database.repositories.PlaceRepository;
import com.bookingapp.backend.modules.database.repositories.UserRepository;
import com.bookingapp.backend.modules.place.PlaceService;
import com.bookingapp.backend.modules.place.dtos.PlaceDTO;
import com.bookingapp.backend.modules.user.dtos.UserDTO;
import com.bookingapp.backend.utils.CopyPropertiesWithoutNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class BookService {
    private final Logger logger = LoggerFactory.getLogger(PlaceService.class);
    private final BookRepository bookRepository;
    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;

    public BookDTO createBook(UUID userId, CreateBookDTO data) {
        this.logger.info("BookService:createBook");

        Optional<UserEntity> userEntity = this.userRepository.findById(userId);
        if (userEntity.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        Optional<PlaceEntity> placeEntity = this.placeRepository.findById(data.getPlaceId());
        if (placeEntity.isEmpty()) {
            throw new ResourceNotFoundException("Place not found");
        }

        BookEntity bookEntity = new BookEntity();
        BeanUtils.copyProperties(data, bookEntity, CopyPropertiesWithoutNull.getNullPropertyNames(data));
        this.bookRepository.save(bookEntity);

        return this.buildBookResponse(bookEntity);
    }

    public List<BookDTO> findAllBooks() {
        this.logger.info("BookService:findAllBooks");
        return this.bookRepository.findAll().stream().map(this::buildBookResponse).toList();
    }

    public List<BookDTO> findAllBooksByOwner(UUID ownerId) {
        this.logger.info("BookService:findAllBooksByOwner");
        return this.bookRepository.findBookByOwnerId(ownerId).stream().map(this::buildBookResponse).toList();
    }

    public BookDTO findBookById(UUID bookId) {
        this.logger.info("BookService:findBookById");

        Optional<BookEntity> bookEntity = this.bookRepository.findById(bookId);
        if (bookEntity.isEmpty()) {
            throw new ResourceNotFoundException("Book not found");
        }

        return this.buildBookResponse(bookEntity.get());
    }

    private BookDTO buildBookResponse(BookEntity book) {
        UserDTO userDTO = new UserDTO();
        PlaceDTO placeDTO = new PlaceDTO();
        BookDTO bookDTO = new BookDTO();

        BeanUtils.copyProperties(book.getUser(), userDTO);
        BeanUtils.copyProperties(book.getPlace(), placeDTO);
        BeanUtils.copyProperties(book, bookDTO);
        bookDTO.setUser(userDTO);
        bookDTO.setPlace(placeDTO);

        return bookDTO;
    }
}
