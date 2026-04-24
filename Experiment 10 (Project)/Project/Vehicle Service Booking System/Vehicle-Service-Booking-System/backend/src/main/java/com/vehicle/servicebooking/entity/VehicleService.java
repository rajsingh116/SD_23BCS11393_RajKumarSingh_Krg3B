package com.vehicle.servicebooking.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
public class VehicleService {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long customerId;
  private String vehicleType;
  @Column(name = "serviceDate")
  private LocalDate serviceDate;

  private String serviceType;
  private String description;
  private String status;
  private String assignedMechanicEmail;

  // Getters & Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getCustomerId() {
    return customerId;
  }

  public void setCustomerId(Long customerId) {
    this.customerId = customerId;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getVehicleType() {
    return vehicleType;
  }

  public void setVehicleType(String vehicleType) {
    this.vehicleType = vehicleType;
  }

  public LocalDate getServiceDate() {
    return serviceDate;
  }

  public void setServiceDate(LocalDate serviceDate) {
    this.serviceDate = serviceDate;
  }

  public String getServiceType() {
    return serviceType;
  }

  public void setServiceType(String serviceType) {
    this.serviceType = serviceType;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getAssignedMechanicEmail() {
    return assignedMechanicEmail;
  }

  public void setAssignedMechanicEmail(String assignedMechanicEmail) {
    this.assignedMechanicEmail = assignedMechanicEmail;
  }
}
