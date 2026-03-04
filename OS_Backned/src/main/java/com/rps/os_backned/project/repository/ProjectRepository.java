package com.rps.os_backned.project.repository;

import com.rps.os_backned.project.model.ProjectDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectRepository extends MongoRepository<ProjectDocument, String> {
}

