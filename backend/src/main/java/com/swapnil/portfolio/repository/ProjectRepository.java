package com.swapnil.portfolio.repository;

import com.swapnil.portfolio.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProjectRepository extends JpaRepository<Project, Long> {}