package com.bookingapp.backend.modules.storage.dtos;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileUploadResponseDTO {
    private String fileName;
    private Long size;
    private String downloadUri;
}
