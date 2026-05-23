package com.swapnil.portfolio.controller;

import com.swapnil.portfolio.model.Skill;
import com.swapnil.portfolio.repository.SkillRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillRepository repo;

    public SkillController(SkillRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Skill> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Skill create(@RequestBody Skill skill) {
        return repo.save(skill);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> update(@PathVariable Long id, @RequestBody Skill updated) {
        return repo.findById(id).map(s -> {
            s.setCategory(updated.getCategory());
            s.setItems(updated.getItems());
            return ResponseEntity.ok(repo.save(s));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}