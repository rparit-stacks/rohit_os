package com.rps.os_backned.skill.repository;

import com.rps.os_backned.skill.model.SkillCategoryDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SkillCategoryRepository extends MongoRepository<SkillCategoryDocument, String> {

    List<SkillCategoryDocument> findAllByOrderBySortOrderAsc();
}

