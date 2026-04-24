package com.vehicle.servicebooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.vehicle.servicebooking.entity.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
  Optional<PasswordResetToken> findByToken(String token);
}
