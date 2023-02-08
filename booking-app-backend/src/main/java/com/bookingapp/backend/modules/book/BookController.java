package com.bookingapp.backend.modules.book;

import com.bookingapp.backend.modules.book.dtos.BookDTO;
import com.bookingapp.backend.modules.book.dtos.CreateBookDTO;
import com.bookingapp.backend.modules.database.entities.UserEntity;
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
@RequestMapping("/books")
public class BookController {
    private final BookService bookService;

    @PostMapping
    public ResponseEntity<BookDTO> createBook(@RequestBody @Valid CreateBookDTO body) {
        UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return ResponseEntity.status(HttpStatus.OK).body(this.bookService.createBook(userId, body));
    }

    @GetMapping
    public ResponseEntity<List<BookDTO>> findAllBooks() {
        return ResponseEntity.status(HttpStatus.OK).body(this.bookService.findAllBooks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> findBookById(@PathVariable("id") UUID bookId) {
        return ResponseEntity.status(HttpStatus.OK).body(this.bookService.findBookById(bookId));
    }

    @GetMapping("/user")
    public ResponseEntity<List<BookDTO>> findAllBooksByOwner() {
        UUID userId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return ResponseEntity.status(HttpStatus.OK).body(this.bookService.findAllBooksByOwner(userId));
    }
}
