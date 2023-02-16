package com.bookingapp.backend.modules.storage;

import com.bookingapp.backend.config.EnvsConfig;
import com.bookingapp.backend.exceptions.exceptions.BadRequestException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class StorageService {
    private final Logger logger = LoggerFactory.getLogger(StorageService.class);

    public void saveFile(UUID userId, String filename, MultipartFile file) {
        this.logger.info("StorageService:saveFile");

        try (InputStream inputStream = file.getInputStream()) {
            Path uploadDirectory = Files.createDirectories(Paths.get(EnvsConfig.getEnv("UPLOAD_DIR") + "/" + userId));
            Path filePath = uploadDirectory.resolve(filename);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception exception) {
            this.logger.error(exception.getMessage(), exception.getCause());
            throw new BadRequestException("Couldn't save file: " + filename);
        }
    }

    public InputStream loadAsResource(@NonNull String filename) {
        this.logger.info("StorageService:loadAsResource");

        try {
            System.out.println(EnvsConfig.getEnv("UPLOAD_DIR"));
            Optional<Path> optionalPath = Files
                    .walk(Paths.get(EnvsConfig.getEnv("UPLOAD_DIR") + "/"))
                    .filter(path -> path.getFileName().toString().equals(filename))
                    .findFirst();

            if (optionalPath.isPresent()) {
                return Files.newInputStream(optionalPath.get());
            } else {
                throw new BadRequestException("Could not read file: " + filename);
            }
        } catch (BadRequestException exception) {
            this.logger.error(exception.getMessage(), exception.getCause());
            throw exception;
        } catch (Exception error) {
            this.logger.error(error.getMessage(), error.getCause());
            throw new BadRequestException("Error while load resource");
        }
    }
}
