package com.vehicle.servicebooking.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtFilter extends OncePerRequestFilter {

  @Autowired
  private JwtUtil jwtUtil;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {

    String path = request.getServletPath();

    // Allow unauthenticated access for login/register APIs
    if (path.startsWith("/api/auth/")) {
      chain.doFilter(request, response);
      return;
    }

    String header = request.getHeader("Authorization");

    if (header != null && header.startsWith("Bearer ")) {
      String token = header.substring(7).trim();

      if (jwtUtil.validateToken(token)) {
        String email = jwtUtil.extractEmail(token);
        String role = jwtUtil.extractRole(token);

        System.out.println("✅ Token validated successfully for: " + email + " | Role: " + role);

        // Create Spring authentication object
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
            email,
            null,
            Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role)));

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        // ✅ Set authentication context for Spring Security
        SecurityContextHolder.getContext().setAuthentication(authentication);

        System.out.println("✅ Authentication set for user: " + email);
      } else {
        System.out.println("❌ Invalid or expired token");
      }
    } else {
      System.out.println("⚠️ No Authorization header found or not Bearer type");
    }

    System.out.println("🔹 JwtFilter START: " + request.getServletPath());
    chain.doFilter(request, response);
    System.out.println("🔹 JwtFilter END: " + request.getServletPath());
  }
}
