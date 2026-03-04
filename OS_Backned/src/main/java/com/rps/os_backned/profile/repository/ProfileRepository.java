package com.rps.os_backned.profile.repository;

import com.rps.os_backned.profile.model.ProfileDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProfileRepository extends MongoRepository<ProfileDocument, String> {
}

