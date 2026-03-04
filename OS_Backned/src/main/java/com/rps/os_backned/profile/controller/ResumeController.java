package com.rps.os_backned.profile.controller;

import com.rps.os_backned.profile.model.ProfileDocument;
import com.rps.os_backned.profile.service.ProfileService;
import com.rps.os_backned.project.service.CloudinaryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "*")
public class ResumeController {

    private final CloudinaryService cloudinaryService;
    private final ProfileService profileService;

    public ResumeController(CloudinaryService cloudinaryService, ProfileService profileService) {
        this.cloudinaryService = cloudinaryService;
        this.profileService = profileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<ProfileDocument> uploadResume(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        try {
            String url = cloudinaryService.uploadRaw(file, "rohit-os/resume");
            ProfileDocument profile = profileService.getProfile();
            profile.setResumeUrl(url);
            ProfileDocument saved = profileService.saveProfile(profile);
            return ResponseEntity.ok(saved);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

