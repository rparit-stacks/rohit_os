package com.rps.os_backned.skill.service;

import com.rps.os_backned.skill.model.SkillCategoryDocument;
import com.rps.os_backned.skill.repository.SkillCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillCategoryRepository repository;

    public SkillService(SkillCategoryRepository repository) {
        this.repository = repository;
    }

    /**
     * Strictly read from MongoDB, no mock fallback.
     */
    public List<SkillCategoryDocument> getAllCategories() {
        return repository.findAllByOrderBySortOrderAsc();
    }

    /**
     * Used by REST API to still show something when DB is empty.
     */
    public List<SkillCategoryDocument> getAllCategoriesWithFallback() {
        List<SkillCategoryDocument> fromDb = repository.findAllByOrderBySortOrderAsc();
        if (!fromDb.isEmpty()) {
            return fromDb;
        }
        return SkillMocks.getMockSkillCategories();
    }
}

