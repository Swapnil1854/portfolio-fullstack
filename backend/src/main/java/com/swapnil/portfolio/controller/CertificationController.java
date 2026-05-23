package com.swapnil.portfolio.controller;

import com.swapnil.portfolio.model.Certification;
import com.swapnil.portfolio.repository.CertificationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
public class CertificationController {

    private final CertificationRepository repo;

    public CertificationController(CertificationRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Certification> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Certification create(@RequestBody Certification cert) {
        return repo.save(cert);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Certification> update(@PathVariable Long id, @RequestBody Certification updated) {
        return repo.findById(id).map(c -> {
            c.setTitle(updated.getTitle());
            c.setIssuer(updated.getIssuer());
            c.setDate(updated.getDate());
            c.setDescription(updated.getDescription());
            c.setIcon(updated.getIcon());
            return ResponseEntity.ok(repo.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}