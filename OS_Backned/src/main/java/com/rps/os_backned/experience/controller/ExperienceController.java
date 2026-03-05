package com.rps.os_backned.experience.controller;

import com.rps.os_backned.experience.model.ExperienceDocument;
import com.rps.os_backned.experience.service.ExperienceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
@CrossOrigin(origins = "*")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public ResponseEntity<List<ExperienceDocument>> getAllExperience() {
        //Get All
        List<ExperienceDocument> experiences = experienceService.getAllExperiences();
        return ResponseEntity.ok(experiences);
    }
}

