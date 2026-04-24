package com.vehicle.servicebooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ForgotPasswordService {

  @Autowired
  private JavaMailSender mailSender;

  public void sendResetEmail(String toEmail, String resetLink) {
    try {
      SimpleMailMessage message = new SimpleMailMessage();
      message.setTo(toEmail);
      message.setSubject("Password Reset Request");
      message.setText("Hello,\n\nClick the link below to reset your password:\n" + resetLink +
          "\n\nIf you did not request this, please ignore this email.\n\nThanks,\nVehicle Service Booking System");

      mailSender.send(message);

      System.out.println("✅ Email sent successfully to: " + toEmail);
    } catch (Exception e) {
      System.err.println("❌ Failed to send email to: " + toEmail);
      e.printStackTrace();
    }
  }
}
