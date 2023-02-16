package com.bookingapp.backend.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnvsConfig {
    private static final Dotenv dotenv = Dotenv.configure().filename(".env").ignoreIfMissing().load();

    public static String getEnv(String name) {
        return dotenv.get(name);
    }
}
