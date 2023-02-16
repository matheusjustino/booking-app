package com.bookingapp.backend.modules.auth.interfaces;

import com.bookingapp.backend.modules.database.entities.UserEntity;
import io.jsonwebtoken.Claims;

import java.util.Map;
import java.util.function.Function;

public interface JWTServiceInterface {
    String extractUserEmail(String jwtToken);
    <T> T extractClaim(String jwtToken, Function<Claims, T> claimsResolver);
    String generateToken(UserEntity userDetails);
    String generateToken(Map<String, Object> extraClaims, UserEntity userDetails);
    boolean isTokenValid(String jwtToken, UserEntity user);
}
