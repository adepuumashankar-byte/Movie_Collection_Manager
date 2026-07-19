package com.batch10.moviecollectionmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.batch10.moviecollectionmanager.service.EmailService;

@RestController
@RequestMapping("/test")
public class TestMailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/mail")
    public String sendMail(@RequestParam String email) {

        emailService.sendOtp(email, "123456");

        return "Mail Sent Successfully";
    }
}