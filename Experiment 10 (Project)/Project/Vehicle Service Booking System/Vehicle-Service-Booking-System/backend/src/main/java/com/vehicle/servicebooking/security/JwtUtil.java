package com.vehicle.servicebooking.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

  private final String SECRET = "mySuperSecretKeyForJwtAuthentication12345"; // at least 32 chars
  private final long EXPIRATION = 1000 * 60 * 60; // 1 hour

  private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

  public String generateToken(String email, String role) {
    return Jwts.builder()
        .setSubject(email)
        .claim("role", role)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  public String extractEmail(String token) {
    return parseClaims(token).getSubject();
  }

  public String extractRole(String token) {
    return parseClaims(token).get("role", String.class);
  }

  public boolean validateToken(String token) {
    try {
      parseClaims(token);
      System.out.println("✅ Token validated successfully");
      return true;
    } catch (JwtException e) {
      System.out.println("❌ Token validation error: " + e.getMessage());
      return false;
    }
  }

  private Claims parseClaims(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(token)
        .getBody();
  }
}
