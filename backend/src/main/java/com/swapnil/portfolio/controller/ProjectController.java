package com.swapnil.portfolio.controller;

import com.swapnil.portfolio.model.Project;
import com.swapnil.portfolio.repository.ProjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository repo;

    public ProjectController(ProjectRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Project> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Project create(@RequestBody Project project) {
        return repo.save(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> update(@PathVariable Long id, @RequestBody Project updated) {
        return repo.findById(id).map(p -> {
            p.setTitle(updated.getTitle());
            p.setDescription(updated.getDescription());
            p.setTech(updated.getTech());
            p.setFeatures(updated.getFeatures());
            p.setGithubLink(updated.getGithubLink());
            p.setDemoLink(updated.getDemoLink());
            return ResponseEntity.ok(repo.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}