package com.rps.os_backned.experience.repository;

import com.rps.os_backned.experience.model.ExperienceDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExperienceRepository extends MongoRepository<ExperienceDocument, String> {

    List<ExperienceDocument> findAllByOrderBySortOrderAsc();
}

