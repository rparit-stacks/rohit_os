package com.rps.os_backned.project.service;

public class ProjectNotFoundException extends RuntimeException {

    public ProjectNotFoundException(String id) {
        super("Project not found with id: " + id);
    }
}

