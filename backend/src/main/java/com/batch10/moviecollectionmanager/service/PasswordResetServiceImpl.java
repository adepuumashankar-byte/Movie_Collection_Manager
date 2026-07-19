package com.batch10.moviecollectionmanager.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.batch10.moviecollectionmanager.entity.PasswordResetOtp;
import com.batch10.moviecollectionmanager.entity.User;
import com.batch10.moviecollectionmanager.repository.PasswordResetOtpRepository;
import com.batch10.moviecollectionmanager.repository.UserRepository;

@Service
public class PasswordResetServiceImpl implements PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetOtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String generateOtp(String email) {

        // Check whether the account exists
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Account does not exist. Please register first.");
        }

        // Get latest OTP if already exists
        otpRepository.findTopByEmailOrderByIdDesc(email)
                .ifPresent(otpRepository::delete);

        // Generate new 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(1000000));

        PasswordResetOtp resetOtp = new PasswordResetOtp();
        resetOtp.setEmail(email);
        resetOtp.setOtp(otp);
        resetOtp.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        resetOtp.setVerified(false);

        otpRepository.save(resetOtp);

        // Send OTP email
        emailService.sendOtp(email, otp);

        System.out.println("\n======================================");
        System.out.println("Password Reset OTP Generated");
        System.out.println("Recipient : " + email);
        System.out.println("OTP       : " + otp);
        System.out.println("======================================");

        return "OTP sent successfully.";
    }

    @Override
    public String verifyOtp(String email, String otp) {

        PasswordResetOtp resetOtp = otpRepository
                .findTopByEmailOrderByIdDesc(email)
                .orElseThrow(() -> new RuntimeException("OTP not found."));

        if (resetOtp.isVerified()) {
            throw new RuntimeException("OTP already used.");
        }

        if (LocalDateTime.now().isAfter(resetOtp.getExpiryTime())) {
            throw new RuntimeException("OTP expired.");
        }

        if (!resetOtp.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP.");
        }

        resetOtp.setVerified(true);

        otpRepository.save(resetOtp);

        return "OTP verified successfully.";
    }

    @Override
    public String resetPassword(String email, String newPassword) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Account does not exist."));

        PasswordResetOtp resetOtp = otpRepository
                .findTopByEmailOrderByIdDesc(email)
                .orElseThrow(() -> new RuntimeException("OTP not found."));

        if (!resetOtp.isVerified()) {
            throw new RuntimeException("Please verify the OTP first.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);

        // Optional: Remove OTP after successful password reset
        otpRepository.delete(resetOtp);

        return "Password updated successfully.";
    }
}