package com.vehicle.servicebooking.controller;

import java.util.List;
import java.util.Map;
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

import com.vehicle.servicebooking.entity.VehicleService;
import com.vehicle.servicebooking.repository.ServiceRepository;
import com.vehicle.servicebooking.entity.User;
import com.vehicle.servicebooking.service.MechanicService;

@RestController
@RequestMapping("/api/mechanics")
public class MechanicController {

  @Autowired
  private MechanicService mechanicService;

  @Autowired
  private ServiceRepository serviceRepository;

  // ✅ Get mechanic profile using JWT
  @GetMapping("/profile")
  public ResponseEntity<?> getMechanicProfile(@RequestHeader("Authorization") String authHeader) {
    try {
      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(400).body("Missing or invalid Authorization header");
      }

      String token = authHeader.substring(7).trim();

      Optional<User> mechanic = mechanicService.getMechanicProfile(token);

      if (mechanic.isPresent()) {
        return ResponseEntity.ok(mechanic.get());
      } else {
        return ResponseEntity.status(404).body("Mechanic not found");
      }

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body(e.getMessage());
    }
  }

  // ✅ Get assigned jobs for mechanic
  @GetMapping("/assigned-jobs")
  public ResponseEntity<?> getAssignedJobs(@RequestHeader("Authorization") String authHeader) {

    System.out.println("[MechanicController] Received Authorization header: " + authHeader);
    try {
      System.out.println("[MechanicController] Inside /assigned-jobs");

      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(400).body("Missing or invalid Authorization header");
      }

      String token = authHeader.substring(7).trim();

      List<VehicleService> assignedJobs = mechanicService.getAssignedJobs(token);

      if (assignedJobs.isEmpty()) {
        return ResponseEntity.status(404).body("No assigned jobs found for this mechanic.");
      }

      return ResponseEntity.ok(assignedJobs);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body(e.getMessage());
    }
  }

  @PutMapping("/update-job-status/{id}")
  public ResponseEntity<?> updateJobStatus(
      @PathVariable Long id,
      @RequestBody Map<String, String> requestBody,
      @RequestHeader("Authorization") String authHeader) {
    try {
      if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(400).body("Missing or invalid Authorization header");
      }

      String token = authHeader.substring(7).trim();

      String newStatus = requestBody.get("status");
      if (newStatus == null || newStatus.isEmpty()) {
        return ResponseEntity.badRequest().body("Status is required");
      }

      // Fetch the job
      Optional<VehicleService> optionalService = serviceRepository.findById(id);
      if (optionalService.isEmpty()) {
        return ResponseEntity.status(404).body("Job not found");
      }

      VehicleService service = optionalService.get();
      service.setStatus(newStatus);
      serviceRepository.save(service);

      return ResponseEntity.ok("Job status updated successfully to: " + newStatus);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("Error while updating job status");
    }
  }

}
