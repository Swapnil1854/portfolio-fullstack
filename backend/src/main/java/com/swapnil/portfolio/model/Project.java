package com.swapnil.portfolio.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String tech;

    @ElementCollection
    @CollectionTable(name = "project_features", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "feature")
    private List<String> features;

    private String githubLink;
    private String demoLink;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getTech() { return tech; }
    public void setTech(String tech) { this.tech = tech; }
    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features; }
    public String getGithubLink() { return githubLink; }
    public void setGithubLink(String githubLink) { this.githubLink = githubLink; }
    public String getDemoLink() { return demoLink; }
    public void setDemoLink(String demoLink) { this.demoLink = demoLink; }
}