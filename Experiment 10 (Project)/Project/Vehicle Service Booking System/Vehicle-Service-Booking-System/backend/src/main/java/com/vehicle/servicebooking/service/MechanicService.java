package com.vehicle.servicebooking.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vehicle.servicebooking.entity.Role;
import com.vehicle.servicebooking.entity.User;
import com.vehicle.servicebooking.entity.VehicleService;
import com.vehicle.servicebooking.repository.ServiceRepository;
import com.vehicle.servicebooking.repository.UserRepository;
import com.vehicle.servicebooking.security.JwtUtil;

@Service
public class MechanicService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    /**
     * Validate token and return mechanic profile
     */
    public Optional<User> getMechanicProfile(String token) throws Exception {
        if (!jwtUtil.validateToken(token)) {
            throw new Exception("Invalid or expired token");
        }

        String email = jwtUtil.extractEmail(token);
        return userRepository.findByEmail(email);
    }

    /**
     * Get assigned jobs for mechanic using JWT token
     */
    public List<VehicleService> getAssignedJobs(String token) throws Exception {
        if (!jwtUtil.validateToken(token)) {
            throw new Exception("Invalid or expired token");
        }

        String email = jwtUtil.extractEmail(token);
        System.out.println("[MechanicService] Extracted email: " + email);

        List<VehicleService> assignedJobs = serviceRepository.findByAssignedMechanicEmail(email);
        System.out.println("[MechanicService] Assigned Jobs: " + assignedJobs);
        return assignedJobs;
    }

    public boolean assignJobToMechanic(Long id, String mechanicEmail) {
        try {
            // 🔹 Step 1: Find the job
            VehicleService job = serviceRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Job not found with ID: " + id));

            // 🔹 Step 2: Find the mechanic
            User mechanic = userRepository.findByEmail(mechanicEmail)
                    .orElseThrow(() -> new RuntimeException("No mechanic found with email: " + mechanicEmail));

            // 🔹 Step 3: Verify role
            if (mechanic.getRole() != Role.MECHANIC) {
                throw new RuntimeException("User with email " + mechanicEmail + " is not a mechanic.");
            }

            // 🔹 Step 4: Assign mechanic and update status
            job.setAssignedMechanicEmail(mechanic.getEmail());
            job.setStatus("In Progress");

            serviceRepository.save(job);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching mechanics: " + e.getMessage());
        }
    }

}
