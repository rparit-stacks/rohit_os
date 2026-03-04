package com.rps.os_backned.project.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "projects")
public class ProjectDocument {

    @Id
    private String id;

    private String title;
    private String description;
    private List<String> techStack;
    private String github;
    private String docker;
    private String demo;
    private String blog;
    private String image;
    private String detailedDescription;
    private List<String> features;
    private List<String> technologies;
    private List<String> keyFeatures;
    private List<String> entities;
    private List<String> apiEndpoints;
    private String videoTutorial;
    private List<ExtraLink> extraLinks;
    private AdminCredentials adminCredentials;
    private List<String> skills;
    private String primarySkill;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getTechStack() {
        return techStack;
    }

    public void setTechStack(List<String> techStack) {
        this.techStack = techStack;
    }

    public String getGithub() {
        return github;
    }

    public void setGithub(String github) {
        this.github = github;
    }

    public String getDocker() {
        return docker;
    }

    public void setDocker(String docker) {
        this.docker = docker;
    }

    public String getDemo() {
        return demo;
    }

    public void setDemo(String demo) {
        this.demo = demo;
    }

    public String getBlog() {
        return blog;
    }

    public void setBlog(String blog) {
        this.blog = blog;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDetailedDescription() {
        return detailedDescription;
    }

    public void setDetailedDescription(String detailedDescription) {
        this.detailedDescription = detailedDescription;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }

    public List<String> getTechnologies() {
        return technologies;
    }

    public void setTechnologies(List<String> technologies) {
        this.technologies = technologies;
    }

    public List<String> getKeyFeatures() {
        return keyFeatures;
    }

    public void setKeyFeatures(List<String> keyFeatures) {
        this.keyFeatures = keyFeatures;
    }

    public List<String> getEntities() {
        return entities;
    }

    public void setEntities(List<String> entities) {
        this.entities = entities;
    }

    public List<String> getApiEndpoints() {
        return apiEndpoints;
    }

    public void setApiEndpoints(List<String> apiEndpoints) {
        this.apiEndpoints = apiEndpoints;
    }

    public String getVideoTutorial() {
        return videoTutorial;
    }

    public void setVideoTutorial(String videoTutorial) {
        this.videoTutorial = videoTutorial;
    }

    public List<ExtraLink> getExtraLinks() {
        return extraLinks;
    }

    public void setExtraLinks(List<ExtraLink> extraLinks) {
        this.extraLinks = extraLinks;
    }

    public AdminCredentials getAdminCredentials() {
        return adminCredentials;
    }

    public void setAdminCredentials(AdminCredentials adminCredentials) {
        this.adminCredentials = adminCredentials;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public String getPrimarySkill() {
        return primarySkill;
    }

    public void setPrimarySkill(String primarySkill) {
        this.primarySkill = primarySkill;
    }

    public static class ExtraLink {
        private String label;
        private String url;

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }

    public static class AdminCredentials {
        private String email;
        private String password;
        private String note;
        private String loginUrl;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getNote() {
            return note;
        }

        public void setNote(String note) {
            this.note = note;
        }

        public String getLoginUrl() {
            return loginUrl;
        }

        public void setLoginUrl(String loginUrl) {
            this.loginUrl = loginUrl;
        }
    }
}

