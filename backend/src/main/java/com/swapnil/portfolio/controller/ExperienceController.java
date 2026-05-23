package com.swapnil.portfolio.controller;

import com.swapnil.portfolio.model.Experience;
import com.swapnil.portfolio.repository.ExperienceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
public class ExperienceController {

    private final ExperienceRepository repo;

    public ExperienceController(ExperienceRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Experience> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Experience create(@RequestBody Experience experience) {
        return repo.save(experience);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Experience> update(@PathVariable Long id, @RequestBody Experience updated) {
        return repo.findById(id).map(e -> {
            e.setTitle(updated.getTitle());
            e.setCompany(updated.getCompany());
            e.setDate(updated.getDate());
            e.setDescription(updated.getDescription());
            e.setType(updated.getType());
            return ResponseEntity.ok(repo.save(e));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}