package com.swapnil.portfolio.controller;

import com.swapnil.portfolio.dto.ApiResponse;
import com.swapnil.portfolio.model.ContactMessage;
import com.swapnil.portfolio.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired private ContactService contactService;

    /**
     * GET /api/admin/messages
     * Returns all contact messages ordered by newest first.
     */
    @GetMapping("/messages")
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }

    /**
     * DELETE /api/admin/messages/{id}
     * Deletes a contact message by id.
     */
    @DeleteMapping("/messages/{id}")
    public ResponseEntity<ApiResponse> deleteMessage(@PathVariable Long id) {
        contactService.deleteMessage(id);
        return ResponseEntity.ok(new ApiResponse(true, "Message deleted successfully"));
    }
}
