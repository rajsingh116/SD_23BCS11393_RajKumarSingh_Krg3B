package com.vehicle.servicebooking.controller;

import com.vehicle.servicebooking.entity.Role;
import com.vehicle.servicebooking.entity.User;
import com.vehicle.servicebooking.repository.UserRepository;
import com.vehicle.servicebooking.security.JwtUtil;

import com.vehicle.servicebooking.entity.PasswordResetToken;
import com.vehicle.servicebooking.repository.PasswordResetTokenRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.vehicle.servicebooking.service.ForgotPasswordService;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private ForgotPasswordService forgotPasswordService;

  @Autowired
  private PasswordResetTokenRepository tokenRepository;

  // ----------------- SIGNUP -----------------
  @PostMapping("/signup")
  public ResponseEntity<?> signup(@RequestBody User user) {
    if (userRepository.findByEmail(user.getEmail()).isPresent()) {
      return ResponseEntity.badRequest().body("Email already registered");
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    if (user.getRole() == null) {
      user.setRole(Role.CUSTOMER); // default role
    }
    User saved = userRepository.save(user);
    return ResponseEntity.ok(saved);
  }

  // ----------------- LOGIN -----------------
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody User loginReq) {
    Optional<User> userOpt = userRepository.findByEmail(loginReq.getEmail());
    if (userOpt.isEmpty()) {
      return ResponseEntity.status(401).body("Invalid email or password");
    }

    User user = userOpt.get();
    if (!passwordEncoder.matches(loginReq.getPassword(), user.getPassword())) {
      return ResponseEntity.status(401).body("Invalid email or password");
    }

    // Generate JWT
    String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

    return ResponseEntity.ok(new LoginResponse(token, user.getRole().name()));
  }

  // ----------------- FORGOT PASSWORD -----------------
  @PostMapping("/forgot-password")
  public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
    String email = request.get("email");
    Optional<User> userOpt = userRepository.findByEmail(email);

    if (userOpt.isEmpty()) {
      return ResponseEntity.badRequest().body("Email not registered");
    }

    // Generate reset token
    String token = UUID.randomUUID().toString();
    PasswordResetToken resetToken = new PasswordResetToken();
    resetToken.setEmail(email);
    resetToken.setToken(token);
    resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(60));

    tokenRepository.save(resetToken);

    // ✅ send email with reset link
    String resetLink = "http://localhost:5173/reset-password?token=" + token;
    forgotPasswordService.sendResetEmail(email, resetLink);

    return ResponseEntity.ok(Map.of(
        "message", "Password reset link sent to your email",
        "token", token));
  }

  // ----------------- RESET PASSWORD -----------------
  @PostMapping("/reset-password")
  public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
    String token = request.get("token");
    String newPassword = request.get("newPassword");

    Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
    if (tokenOpt.isEmpty() || tokenOpt.get().getExpiryDate().isBefore(LocalDateTime.now())) {
      return ResponseEntity.badRequest().body("Invalid or expired token");
    }

    String email = tokenOpt.get().getEmail();
    Optional<User> userOpt = userRepository.findByEmail(email);
    if (userOpt.isEmpty()) {
      return ResponseEntity.badRequest().body("User not found");
    }

    User user = userOpt.get();
    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);

    // Delete used token
    tokenRepository.delete(tokenOpt.get());

    return ResponseEntity.ok("Password reset successful!");
  }

}
