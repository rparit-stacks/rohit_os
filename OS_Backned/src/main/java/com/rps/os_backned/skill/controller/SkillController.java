package com.rps.os_backned.skill.controller;

import com.rps.os_backned.skill.model.SkillCategoryDocument;
import com.rps.os_backned.skill.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<SkillCategoryDocument>> getAllSkillCategories() {
        List<SkillCategoryDocument> categories = skillService.getAllCategoriesWithFallback();
        return ResponseEntity.ok(categories);
    }
}

