package com.vehicle.servicebooking.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.vehicle.servicebooking.entity.Role;
import com.vehicle.servicebooking.entity.User;
import com.vehicle.servicebooking.entity.VehicleService;
import com.vehicle.servicebooking.repository.ServiceRepository;
import com.vehicle.servicebooking.repository.UserRepository;
import com.vehicle.servicebooking.security.JwtUtil;
import com.vehicle.servicebooking.service.MechanicService;
  
@RestController
@RequestMapping("/api/admin")
public class AdminController {

  @Autowired
  private MechanicService mechanicService;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private ServiceRepository serviceRepository;

  @GetMapping("/all-mechanics")
  public ResponseEntity<?> getAllMechanics(@RequestHeader("Authorization") String authHeader) {
    try {
      // 🔹 Validate Authorization header
      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(400).body("Missing or invalid Authorization header");
      }

      String token = authHeader.substring(7).trim();

      // 🔹 Validate token
      if (!jwtUtil.validateToken(token)) {
        return ResponseEntity.status(401).body("Invalid or expired token");
      }

      // 🔹 Extract email from token
      String email = jwtUtil.extractEmail(token);

      // 🔹 Fetch admin user
      User adminUser = userRepository.findByEmail(email)
          .orElseThrow(() -> new RuntimeException("Admin user not found"));

      // 🔹 Check if the role is ADMIN
      if (adminUser.getRole() != Role.ADMIN) { // ✅ Enum comparison
        return ResponseEntity.status(403).body("Unauthorized access");
      }

      // 🔹 Fetch all mechanics
      List<User> mechanics = userRepository.findByRole(Role.MECHANIC);

      if (mechanics.isEmpty()) {
        return ResponseEntity.ok("No mechanics found.");
      }

      // ✅ Return mechanic list
      return ResponseEntity.ok(mechanics);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("Server error: " + e.getMessage());
    }
  }

  @GetMapping("/all-users")
  public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String authHeader) {
    try {
      // 🔹 Validate Authorization header
      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(400).body("Missing or invalid Authorization header");
      }

      String token = authHeader.substring(7).trim();

      // 🔹 Validate token
      if (!jwtUtil.validateToken(token)) {
        return ResponseEntity.status(401).body("Invalid or expired token");
      }

      // 🔹 Extract email from token
      String email = jwtUtil.extractEmail(token);

      // 🔹 Fetch admin user
      User adminUser = userRepository.findByEmail(email)
          .orElseThrow(() -> new RuntimeException("Admin user not found"));

      // 🔹 Check if the role is ADMIN
      if (adminUser.getRole() != Role.ADMIN) { // ✅ Enum comparison
        return ResponseEntity.status(403).body("Unauthorized access");
      }

      // 🔹 Fetch all customers
      List<User> customers = userRepository.findByRole(Role.CUSTOMER);

      if (customers.isEmpty()) {
        return ResponseEntity.ok("No customers found.");
      }

      // ✅ Return customer list
      return ResponseEntity.ok(customers);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("Server error: " + e.getMessage());
    }
  }

  @PutMapping("Manage-job-status/{id}")
  public ResponseEntity<?> updateJobStatus(
      @PathVariable Long id,
      @RequestBody String mechanicEmail,
      @RequestHeader("Authorization") String authHeader) {
    try {
      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(400).body("Missing or invalid Authorization header");
      }

      String token = authHeader.substring(7).trim();

      if (!jwtUtil.validateToken(token)) {
        return ResponseEntity.status(401).body("Invalid or expired token");
      }

      String email = jwtUtil.extractEmail(token);

      User adminUser = userRepository.findByEmail(email)
          .orElseThrow(() -> new RuntimeException("Admin user not found"));

      if (adminUser.getRole() != Role.ADMIN) {
        return ResponseEntity.status(403).body("Unauthorized access");
      }

      // 🔹 Fix: Remove quotes and whitespace from mechanicEmail
      mechanicEmail = mechanicEmail.replace("\"", "").trim();

      boolean updated = mechanicService.assignJobToMechanic(id, mechanicEmail);

      if (!updated) {
        return ResponseEntity.status(404).body("Job not found");
      }

      return ResponseEntity.ok("Job status updated successfully");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("Server error: " + e.getMessage());
    }
  }

  @GetMapping("/all-services")
  public ResponseEntity<?> getAllServices(@RequestHeader("Authorization") String authHeader) {
    try {
      // 🔹 Validate Authorization header
      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(400).body("Missing or invalid Authorization header");
      }

      String token = authHeader.substring(7).trim();

      // 🔹 Validate token
      if (!jwtUtil.validateToken(token)) {
        return ResponseEntity.status(401).body("Invalid or expired token");
      }

      // 🔹 Extract email from token
      String email = jwtUtil.extractEmail(token);

      // 🔹 Fetch admin user
      User adminUser = userRepository.findByEmail(email)
          .orElseThrow(() -> new RuntimeException("Admin user not found"));

      // 🔹 Check if the role is ADMIN
      if (adminUser.getRole() != Role.ADMIN) { // ✅ Enum comparison
        return ResponseEntity.status(403).body("Unauthorized access");
      }

      // 🔹 Fetch all services
      List<VehicleService> services = serviceRepository.findAll();

      if (services.isEmpty()) {
        return ResponseEntity.ok("No services found.");
      }

      // ✅ Return service list
      return ResponseEntity.ok(services);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("Server error: " + e.getMessage());
    }
  }

  @GetMapping("/profile")
  public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {

    try {
      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(400).body("Missing or invalid Authorization header");
      }

      String token = authHeader.substring(7).trim();

      if (!jwtUtil.validateToken(token)) {
        return ResponseEntity.status(401).body("Invalid or expired token");
      }

      String email = jwtUtil.extractEmail(token);

      Optional<User> admin = userRepository.findByEmail(email);

      return ResponseEntity.ok(admin);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("internal server error");
    }

  }

}
