package com.rps.os_backned.terminal.model;

import java.time.Instant;

public class SessionContext {

    private String sessionId;
    private String currentDirectory;
    private String theme;
    private Instant createdAt;
    private Instant lastAccessedAt;
    private String note; // simple editable note per session

    public SessionContext(String sessionId) {
        this.sessionId = sessionId;
        this.currentDirectory = "~";
        this.theme = "default";
        this.createdAt = Instant.now();
        this.lastAccessedAt = this.createdAt;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getCurrentDirectory() {
        return currentDirectory;
    }

    public void setCurrentDirectory(String currentDirectory) {
        this.currentDirectory = currentDirectory;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getLastAccessedAt() {
        return lastAccessedAt;
    }

    public void setLastAccessedAt(Instant lastAccessedAt) {
        this.lastAccessedAt = lastAccessedAt;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}

