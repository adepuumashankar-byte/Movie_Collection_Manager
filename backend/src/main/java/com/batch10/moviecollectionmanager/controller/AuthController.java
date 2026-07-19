package com.batch10.moviecollectionmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.batch10.moviecollectionmanager.dto.AuthResponse;
import com.batch10.moviecollectionmanager.dto.ForgotPasswordRequest;
import com.batch10.moviecollectionmanager.dto.LoginRequest;
import com.batch10.moviecollectionmanager.dto.RegisterRequest;
import com.batch10.moviecollectionmanager.dto.ResetPasswordRequest;
import com.batch10.moviecollectionmanager.dto.VerifyOtpRequest;
import com.batch10.moviecollectionmanager.service.PasswordResetService;
import com.batch10.moviecollectionmanager.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@Validated
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordResetService passwordResetService;

    // ===========================
    // Register User
    // ===========================
    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest request) {

        String message = userService.register(request);
        return ResponseEntity.ok(message);
    }

    // ===========================
    // Login User / Admin
    // ===========================
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        AuthResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    // ===========================
    // Forgot Password - Generate OTP
    // ===========================
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        try {

            String message = passwordResetService.generateOtp(
                    request.getEmail());

            return ResponseEntity.ok(message);

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ===========================
    // Verify OTP
    // ===========================
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(
            @Valid @RequestBody VerifyOtpRequest request) {

        try {

            String message = passwordResetService.verifyOtp(
                    request.getEmail(),
                    request.getOtp());

            return ResponseEntity.ok(message);

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ===========================
    // Reset Password
    // ===========================
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        try {

            String message = passwordResetService.resetPassword(
                    request.getEmail(),
                    request.getNewPassword());

            return ResponseEntity.ok(message);

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}