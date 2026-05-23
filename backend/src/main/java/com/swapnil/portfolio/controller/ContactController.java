package com.swapnil.portfolio.controller;

import com.swapnil.portfolio.dto.ApiResponse;
import com.swapnil.portfolio.dto.ContactRequest;
import com.swapnil.portfolio.model.ContactMessage;
import com.swapnil.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired private ContactService contactService;

    /**
     * POST /api/contact
     * Public endpoint — saves message to DB and sends emails.
     */
    @PostMapping
    public ResponseEntity<ApiResponse> submitContact(@Valid @RequestBody ContactRequest request) {
        contactService.saveMessage(request);
        return ResponseEntity.ok(new ApiResponse(true,
            "Message received! I'll get back to you soon."));
    }
}
