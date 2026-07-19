package com.batch10.moviecollectionmanager.service;

public interface PasswordResetService {

    String generateOtp(String email);

    String verifyOtp(String email, String otp);

    String resetPassword(String email, String newPassword);

}