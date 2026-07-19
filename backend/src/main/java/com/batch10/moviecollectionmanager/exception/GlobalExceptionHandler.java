package com.batch10.moviecollectionmanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.batch10.moviecollectionmanager.response.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ===========================
    // Movie Not Found Exception
    // ===========================
    @ExceptionHandler(MovieNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleMovieNotFoundException(
            MovieNotFoundException ex) {

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                ex.getMessage(),
                null
        );

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // ===========================
    // Runtime Exception
    // ===========================
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Object>> handleRuntimeException(
            RuntimeException ex) {

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                ex.getMessage(),
                null
        );

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // ===========================
    // Generic Exception
    // ===========================
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleException(
            Exception ex) {

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                "Something went wrong.",
                null
        );

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}