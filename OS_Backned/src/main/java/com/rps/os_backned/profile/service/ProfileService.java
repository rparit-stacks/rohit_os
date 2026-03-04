package com.rps.os_backned.profile.service;

import com.rps.os_backned.profile.model.ProfileDocument;
import com.rps.os_backned.profile.repository.ProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public ProfileDocument getProfile() {
        List<ProfileDocument> all = profileRepository.findAll();
        if (!all.isEmpty()) {
            return all.get(0);
        }
        return ProfileMocks.getMockProfile();
    }

    public ProfileDocument saveProfile(ProfileDocument profile) {
        List<ProfileDocument> existing = profileRepository.findAll();
        if (!existing.isEmpty()) {
            // keep a single profile document; always update the first one
            profile.setId(existing.get(0).getId());
        } else if (profile.getId() != null && profile.getId().isBlank()) {
            profile.setId(null);
        }
        return profileRepository.save(profile);
    }
}

