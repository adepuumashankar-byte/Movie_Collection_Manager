package com.batch10.moviecollectionmanager.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.batch10.moviecollectionmanager.entity.User;
import com.batch10.moviecollectionmanager.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        System.out.println("========================================");
        System.out.println("Loading User From Database");
        System.out.println("Requested Email : " + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    System.out.println("User NOT Found!");
                    return new UsernameNotFoundException(
                            "User not found with email: " + email);
                });

        System.out.println("User Found Successfully");
        System.out.println("Email : " + user.getEmail());
        System.out.println("Role  : " + user.getRole());
        System.out.println("========================================");

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority(user.getRole()))
        );
    }
}