package com.batch10.moviecollectionmanager.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.batch10.moviecollectionmanager.dto.AuthResponse;
import com.batch10.moviecollectionmanager.dto.LoginRequest;
import com.batch10.moviecollectionmanager.dto.RegisterRequest;
import com.batch10.moviecollectionmanager.entity.User;
import com.batch10.moviecollectionmanager.repository.UserRepository;
import com.batch10.moviecollectionmanager.security.JwtService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Override
    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists!";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Default role
        user.setRole("ROLE_USER");

        userRepository.save(user);

        return "User registered successfully!";
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        System.out.println("================================");
        System.out.println("Email entered : " + request.getEmail());
        System.out.println("Password entered : " + request.getPassword());

        Optional<User> optionalUser =
                userRepository.findByEmail(request.getEmail());

        System.out.println("User exists? : " + optionalUser.isPresent());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        User user = optionalUser.get();

        System.out.println("DB Email : " + user.getEmail());
        System.out.println("DB Password : " + user.getPassword());

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        System.out.println("Password Match : " + matches);

        if (!matches) {
            throw new RuntimeException("Invalid email or password");
        }

        // Generate JWT with Email + Role
        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole()
        );

        return new AuthResponse(
        token,
        user.getRole(),
        "Login Successful"
);
    }
}