package com.rps.os_backned.project.service;

import com.rps.os_backned.project.model.ProjectDocument;
import com.rps.os_backned.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectDocument> getAllProjects() {
        List<ProjectDocument> fromDb = projectRepository.findAll();
        if (!fromDb.isEmpty()) {
            return fromDb;
        }
        // Fallback to in-memory mock data when database is empty
        return ProjectMocks.getMockProjects();
    }

    public ProjectDocument getProjectById(String id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ProjectNotFoundException(id));
    }

    public ProjectDocument createProject(ProjectDocument project) {
        // If id is blank, let MongoDB generate one
        if (project.getId() != null && project.getId().isBlank()) {
            project.setId(null);
        }
        return projectRepository.save(project);
    }

    public ProjectDocument updateProject(String id, ProjectDocument updated) {
        ProjectDocument existing = getProjectById(id);
        updated.setId(existing.getId());
        return projectRepository.save(updated);
    }

    public void deleteProject(String id) {
        if (!projectRepository.existsById(id)) {
            throw new ProjectNotFoundException(id);
        }
        projectRepository.deleteById(id);
    }
}

