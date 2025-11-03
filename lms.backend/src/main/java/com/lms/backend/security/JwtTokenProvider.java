package com.lms.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    // ✅ Secure key generation (512-bit for HS512)
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    // ✅ Token validity: 24 hours
    private static final long EXPIRATION_TIME = 24 * 60 * 60 * 1000;

    // ✅ Generate JWT with email + role
    public String generateToken(Authentication authentication) {
        org.springframework.security.core.userdetails.User userPrincipal =
                (org.springframework.security.core.userdetails.User) authentication.getPrincipal();

        // Extract role(s)
        Collection<? extends GrantedAuthority> authorities = userPrincipal.getAuthorities();
        String role = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .claim("role", role.replace("ROLE_", "")) // 👈 Add role in payload
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    // ✅ Get username (email) from token
    public String getUsernameFromJWT(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // ✅ Validate token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.out.println("Invalid JWT: " + e.getMessage());
            return false;
        }
    }
}
