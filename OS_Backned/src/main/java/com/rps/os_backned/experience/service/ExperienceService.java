package com.rps.os_backned.experience.service;

import com.rps.os_backned.experience.model.ExperienceDocument;
import com.rps.os_backned.experience.repository.ExperienceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {

    private final ExperienceRepository repository;

    public ExperienceService(ExperienceRepository repository) {
        this.repository = repository;
    }

    public List<ExperienceDocument> getAllExperiences() {
        List<ExperienceDocument> fromDb = repository.findAllByOrderBySortOrderAsc();
        if (!fromDb.isEmpty()) {
            return fromDb;
        }
        return ExperienceMocks.getMockExperiences();
    }
}

