package com.swapnil.portfolio.controller;
import java.util.Map;

import com.swapnil.portfolio.dto.LoginRequest;
import com.swapnil.portfolio.dto.LoginResponse;
import com.swapnil.portfolio.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtUtils jwtUtils;

    /**
     * POST /api/auth/login
     * Returns a JWT token on successful authentication.
     */
    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {

        System.out.println("REQUEST BODY: " + request);

        String username = request.get("username");
        String password = request.get("password");

        System.out.println("USERNAME: " + username);
        System.out.println("PASSWORD: " + password);

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtils.generateToken(userDetails.getUsername());

            return ResponseEntity.ok(new LoginResponse(token, userDetails.getUsername(), "Login successful"));

        } catch (Exception e) {
            System.out.println("AUTH EXCEPTION TYPE: " + e.getClass().getName());
            System.out.println("AUTH EXCEPTION MSG:  " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
