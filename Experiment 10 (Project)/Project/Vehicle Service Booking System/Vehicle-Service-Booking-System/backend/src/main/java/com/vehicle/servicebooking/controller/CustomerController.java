package com.vehicle.servicebooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.http.ResponseEntity;

import com.vehicle.servicebooking.repository.ServiceRepository;
import com.vehicle.servicebooking.repository.UserRepository;
import com.vehicle.servicebooking.security.JwtUtil;
import com.vehicle.servicebooking.entity.VehicleService;
import com.vehicle.servicebooking.entity.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173")

public class CustomerController {
  // Customer-related endpoints would go here
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private JwtUtil jwtUtil;

  @GetMapping("/profile")
  public ResponseEntity<?> getCustomerProfile(@RequestHeader("Authorization") String authHeader) {
    try {
      //System.out.println("Header received: " + authHeader);

      String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
      //System.out.println("Extracted token: " + token);

      boolean valid = jwtUtil.validateToken(token);
      //System.out.println("Token valid? " + valid);

      if (!valid) {
        //System.out.println("Token validation failed!");
        return ResponseEntity.status(401).body("Invalid or expired token");
      }

      String email = jwtUtil.extractEmail(token);
      //System.out.println("Extracted email: " + email);

      Optional<User> customer = userRepository.findByEmail(email);
      if (customer.isPresent()) {
        //System.out.println("Customer found: " + customer.get().getFullName());
        return ResponseEntity.ok(customer.get());
      } else {
        System.out.println("Customer not found for email: " + email);
        return ResponseEntity.status(404).body("Customer not found");
      }
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(401).body("Invalid or expired token");
    }
  }

  @Autowired
  private ServiceRepository serviceRepository; // your JPA repository

  @PostMapping("/book-service")
  public ResponseEntity<?> bookService(
      @RequestHeader("Authorization") String authHeader,
      @RequestBody VehicleService service) {
    try {
      String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
      boolean valid = jwtUtil.validateToken(token);
      if (!valid) {
        return ResponseEntity.status(401).body("Invalid or expired token");
      }

      String email = jwtUtil.extractEmail(token);
      Optional<User> customerOpt = userRepository.findByEmail(email);

      if (customerOpt.isEmpty()) {
        return ResponseEntity.status(404).body("Customer not found");
      }

      // ✅ Save service booking
      service.setCustomerId(customerOpt.get().getId());
      service.setStatus("Pending");
      service.setServiceDate(LocalDate.now()); // Set current date for booking

      serviceRepository.save(service);

      return ResponseEntity.ok(service);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(401).body("Invalid or expired token");
    }

  }

  @GetMapping("/booking-status")
  public ResponseEntity<?> checkBookingStatus(@RequestHeader("Authorization") String authHeader) {
    try {
      String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
      boolean valid = jwtUtil.validateToken(token);
      if (!valid) {
        return ResponseEntity.status(401).body("Invalid or expired token");
      }

      String email = jwtUtil.extractEmail(token);
      Optional<User> customerOpt = userRepository.findByEmail(email);

      if (customerOpt.isEmpty()) {
        return ResponseEntity.status(404).body("Customer not found");
      }

      Long customerId = customerOpt.get().getId();
      List<VehicleService> bookings = serviceRepository.findByCustomerId(customerId);

      return ResponseEntity.ok(bookings);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(401).body("Invalid or expired token");
    }
  }

}
