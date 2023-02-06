package com.bookingapp.backend.exceptions.error;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorMessage {
    private String title;
    private Integer status;
    private String message;
    private String path;
    private String timestamp;
}
