package com.rps.os_backned.project.controller;

import com.rps.os_backned.project.model.ProjectDocument;
import com.rps.os_backned.project.service.CloudinaryService;
import com.rps.os_backned.project.service.ProjectNotFoundException;
import com.rps.os_backned.project.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectService projectService;
    private final CloudinaryService cloudinaryService;

    public ProjectController(ProjectService projectService, CloudinaryService cloudinaryService) {
        this.projectService = projectService;
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping
    public ResponseEntity<List<ProjectDocument>> getAllProjects() {
        List<ProjectDocument> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDocument> getProjectById(@PathVariable String id) {
        try {
            ProjectDocument project = projectService.getProjectById(id);
            return ResponseEntity.ok(project);
        } catch (ProjectNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ProjectDocument> createProject(@RequestBody ProjectDocument project) {
        ProjectDocument created = projectService.createProject(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDocument> updateProject(@PathVariable String id,
                                                         @RequestBody ProjectDocument project) {
        try {
            ProjectDocument updated = projectService.updateProject(id, project);
            return ResponseEntity.ok(updated);
        } catch (ProjectNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable String id) {
        try {
            projectService.deleteProject(id);
            return ResponseEntity.noContent().build();
        } catch (ProjectNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/image")
    public ResponseEntity<ProjectDocument> uploadProjectImage(@PathVariable String id,
                                                              @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        try {
            ProjectDocument project = projectService.getProjectById(id);
            String url = cloudinaryService.uploadImage(file, "rohit-os/projects");
            if (url != null && !url.isBlank()) {
                project.setImage(url);
                ProjectDocument saved = projectService.updateProject(id, project);
                return ResponseEntity.ok(saved);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (ProjectNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

