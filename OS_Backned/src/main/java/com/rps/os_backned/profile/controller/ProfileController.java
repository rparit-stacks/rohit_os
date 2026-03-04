package com.rps.os_backned.profile.controller;

import com.rps.os_backned.profile.model.ProfileDocument;
import com.rps.os_backned.profile.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<ProfileDocument> getProfile() {
        ProfileDocument profile = profileService.getProfile();
        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<ProfileDocument> updateProfile(@RequestBody ProfileDocument profile) {
        ProfileDocument saved = profileService.saveProfile(profile);
        return ResponseEntity.ok(saved);
    }
}

