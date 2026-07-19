package com.batch10.moviecollectionmanager.service;

import com.batch10.moviecollectionmanager.dto.AuthResponse;
import com.batch10.moviecollectionmanager.dto.LoginRequest;
import com.batch10.moviecollectionmanager.dto.RegisterRequest;

public interface UserService {

    String register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}