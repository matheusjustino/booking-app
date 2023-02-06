package com.bookingapp.backend.exceptions;


import com.bookingapp.backend.exceptions.error.ErrorMessage;
import com.bookingapp.backend.exceptions.exceptions.BadRequestException;
import com.bookingapp.backend.exceptions.exceptions.ForbiddenException;
import com.bookingapp.backend.exceptions.exceptions.ResourceNotFoundException;
import com.bookingapp.backend.exceptions.exceptions.UnauthorizedException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.text.SimpleDateFormat;
import java.util.Date;

@ControllerAdvice
public class RestExceptionHandler {
    private final Logger logger = LoggerFactory.getLogger(RestExceptionHandler.class);
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> handleBadRequestException(HttpServletRequest request, BadRequestException exception) {
        this.logger.error(exception.getMessage(), exception.getCause());
        final ErrorMessage error = this.generateErrorMessage("Bad Request", HttpStatus.BAD_REQUEST, exception.getMessage(), request.getRequestURI());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(HttpServletRequest request, ResourceNotFoundException exception) {
        this.logger.error(exception.getMessage(), exception.getCause());
        final ErrorMessage error = this.generateErrorMessage("Not Found", HttpStatus.NOT_FOUND, exception.getMessage(), request.getRequestURI());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<?> handleUnauthorizedException(HttpServletRequest request, UnauthorizedException exception) {
        this.logger.error(exception.getMessage(), exception.getCause());
        final ErrorMessage error = this.generateErrorMessage("Unauthorized", HttpStatus.UNAUTHORIZED, exception.getMessage(), request.getRequestURI());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<?> handleForbiddenException(HttpServletRequest request, ForbiddenException exception) {
        this.logger.error(exception.getMessage(), exception.getCause());
        final ErrorMessage error = this.generateErrorMessage("Forbidden", HttpStatus.FORBIDDEN, exception.getMessage(), request.getRequestURI());
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleGenericException(HttpServletRequest request, Exception exception) {
        this.logger.error(exception.getMessage(), exception.getCause());
        final ErrorMessage error = this.generateErrorMessage("Bad Request", HttpStatus.BAD_REQUEST, exception.getMessage(), request.getRequestURI());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    private ErrorMessage generateErrorMessage(String title, HttpStatus status, String message, String requestUri) {
        return new ErrorMessage(title, status.value(), message, requestUri,  this.dateFormat.format(new Date()));
    }
}
