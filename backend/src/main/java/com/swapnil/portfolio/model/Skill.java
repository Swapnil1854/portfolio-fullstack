package com.swapnil.portfolio.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;

    @ElementCollection
    @CollectionTable(name = "skill_items", joinColumns = @JoinColumn(name = "skill_id"))
    @Column(name = "item")
    private List<String> items;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public List<String> getItems() { return items; }
    public void setItems(List<String> items) { this.items = items; }
}