package com.bookingapp.backend;

import com.bookingapp.backend.config.EnvsConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.nio.file.Files;
import java.nio.file.Paths;

@Configuration
@EnableWebMvc
@SpringBootApplication
public class BookingAppBackendApplication implements CommandLineRunner {
	@Value("${environment}")
	String environment;

	public static void main(String[] args) {
		try {
			Files.createDirectories(Paths.get("src/main/resources/uploads/images/"));
		} catch (Exception exception) {
			throw new InternalError("Folder creation error", exception);
		}
		SpringApplication.run(BookingAppBackendApplication.class, args);
	}

	@Override
	public void run(String ...args) {
		System.out.println(this.environment);
	}
}
