package com.vehicle.servicebooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vehicle.servicebooking.entity.VehicleService;

import java.util.List;


@Repository
public interface ServiceRepository extends JpaRepository<VehicleService, Long> {
  List<VehicleService> findByCustomerId(Long customerId);

  List<VehicleService> findByAssignedMechanicEmail(String email);


  boolean existsByIdAndAssignedMechanicEmail(Long serviceId, String email);
}
