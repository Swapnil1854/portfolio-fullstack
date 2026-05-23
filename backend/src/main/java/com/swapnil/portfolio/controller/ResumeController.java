package com.swapnil.portfolio.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/resume")
@Slf4j
public class ResumeController {

    /**
     * GET /api/resume/download
     * Serves the resume PDF file as a downloadable attachment.
     */
    @GetMapping("/download")
    public ResponseEntity<Resource> downloadResume() {
        try {
            Resource resource = new org.springframework.core.io.ClassPathResource("static/resume.pdf");

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=resume.pdf")
                    .body(resource);

        } catch (Exception e) {
            e.printStackTrace(); // now you'll see real error if any
            return ResponseEntity.internalServerError().build();
        }
    }
}
