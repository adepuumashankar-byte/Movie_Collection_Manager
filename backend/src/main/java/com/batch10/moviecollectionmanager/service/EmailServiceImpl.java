package com.batch10.moviecollectionmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendOtp(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        // Recipient Email
        message.setTo(toEmail);

        // Email Subject
        message.setSubject("Movie Collection Manager - Password Reset OTP");

        // Email Body
        message.setText(
                "Hello,\n\n" +
                "You have requested to reset your password.\n\n" +
                "Your One-Time Password (OTP) is: " + otp + "\n\n" +
                "This OTP is valid for 5 minutes.\n\n" +
                "If you did not request a password reset, please ignore this email.\n\n" +
                "Regards,\n" +
                "Movie Collection Manager Team"
        );

        // Send Email
        mailSender.send(message);

        System.out.println("======================================");
        System.out.println("OTP Email Sent Successfully");
        System.out.println("Recipient : " + toEmail);
        System.out.println("OTP       : " + otp);
        System.out.println("======================================");
    }
}