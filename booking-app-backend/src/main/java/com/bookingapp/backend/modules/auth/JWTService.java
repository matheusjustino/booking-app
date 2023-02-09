package com.bookingapp.backend.modules.auth;

import com.bookingapp.backend.modules.database.entities.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;

@Service
public class JWTService {
    public int TOKEN_EXPIRATION; // 600_000 * 6 * 12; // 12h
    public String SECRET;

    public JWTService(Environment environment) {
        this.TOKEN_EXPIRATION = Integer.parseInt(Objects.requireNonNull(environment.getProperty("TOKEN_EXPIRATION")));
        this.SECRET = environment.getProperty("SECRET");
    }

    /**
     * Método que extrai o email de usuário do token
     * @param jwtToken token de autenticação
     * @return retorna o email de usuário
     */
    public String extractUserEmail(String jwtToken) {
        return this.extractClaim(jwtToken, Claims::getSubject);
    }

    public <T> T extractClaim(String jwtToken, Function<Claims, T> claimsResolver) {
        final Claims claims = this.extractAllClaims(jwtToken);
        return claimsResolver.apply(claims);
    }

    /**
     * Método genérico de geração de token
     * @param userDetails dados do usuário que serão a base da criação do token de autenticação
     * @return retorna o token de autenticação
     */
    public String generateToken(UserEntity userDetails) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("email", userDetails.getEmail());
        extraClaims.put("username", userDetails.getUsername());
        extraClaims.put("id", userDetails.getId().toString());
        return this.generateToken(extraClaims, userDetails);
    }

    /**
     * Método que gera o token de autenticação
     * @param extraClaims claims utilizados na criação do token
     * @param userDetails dados do usuário que serão a base da criação do token de autenticação
     * @return retorna um token de autenticação
     */
    public String generateToken(Map<String, Object> extraClaims, UserEntity userDetails) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + this.TOKEN_EXPIRATION))
                .signWith(this.getSignKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Método que verifica se o token de autenticação é válido
     * @param jwtToken token de autenticação
     * @param user dados do usuário
     * @return retorna se o token de autenticação é válido
     */
    public boolean isTokenValid(String jwtToken, UserEntity user) {
        final String userEmail = this.extractUserEmail(jwtToken);
        return (userEmail.equals(user.getEmail())) && !isTokenExpired(jwtToken);
    }

    /**
     * Método que verifica se o token está expirado
     * @param jwtToken token de autenticação
     * @return retorna se o token está expirado
     */
    private boolean isTokenExpired(String jwtToken) {
        return this.extractExpiration(jwtToken).before(new Date());
    }

    /**
     * Método genérico que extrai a informação de data de expiração do token
     * @param jwtToken token de autenticação
     * @return retorna a data de expiração do token
     */
    private Date extractExpiration(String jwtToken) {
        return this.extractClaim(jwtToken, Claims::getExpiration);
    }

    /**
     * Método que extrai todos os claims do token de autenticação
     * @param jwtToken token de autenticação
     * @return retorna todos os claims do token
     */
    private Claims extractAllClaims(String jwtToken) {
        return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(jwtToken).getBody();
    }

    /**
     * Método que gera uma nova secret key para usar com o hmac-sha
     * @return retorna uma secret key
     */
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(this.SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
