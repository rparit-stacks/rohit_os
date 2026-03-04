package com.rps.os_backned.skill.service;

import com.rps.os_backned.skill.model.SkillCategoryDocument;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public final class SkillMocks {

    private SkillMocks() {
    }

    public static List<SkillCategoryDocument> getMockSkillCategories() {
        List<SkillCategoryDocument> list = new ArrayList<>();

        SkillCategoryDocument languages = new SkillCategoryDocument();
        languages.setName("Languages");
        languages.setItems(Arrays.asList("Java", "JavaScript", "TypeScript", "C++", "SQL", "HTML/CSS"));
        languages.setSortOrder(1);
        list.add(languages);

        SkillCategoryDocument backend = new SkillCategoryDocument();
        backend.setName("Backend");
        backend.setItems(Arrays.asList(
                "Spring Boot",
                "Spring MVC",
                "Spring Data JPA",
                "Spring Security (RBAC)",
                "REST APIs",
                "Microservices",
                "WebSocket"
        ));
        backend.setSortOrder(2);
        list.add(backend);

        SkillCategoryDocument database = new SkillCategoryDocument();
        database.setName("Database & Messaging");
        database.setItems(Arrays.asList(
                "MySQL",
                "PostgreSQL",
                "MongoDB",
                "Redis",
                "Kafka"
        ));
        database.setSortOrder(3);
        list.add(database);

        SkillCategoryDocument devops = new SkillCategoryDocument();
        devops.setName("DevOps & Cloud");
        devops.setItems(Arrays.asList(
                "Docker",
                "AWS (EC2, S3, SQS)",
                "CI/CD",
                "Git",
                "GitHub Actions",
                "Linux"
        ));
        devops.setSortOrder(4);
        list.add(devops);

        SkillCategoryDocument frontend = new SkillCategoryDocument();
        frontend.setName("Frontend");
        frontend.setItems(Arrays.asList(
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Component Libraries"
        ));
        frontend.setSortOrder(5);
        list.add(frontend);

        SkillCategoryDocument tools = new SkillCategoryDocument();
        tools.setName("Testing & Tools");
        tools.setItems(Arrays.asList(
                "JUnit",
                "Mockito",
                "Postman",
                "Swagger/OpenAPI",
                "System Design",
                "DSA (160+ LeetCode)"
        ));
        tools.setSortOrder(6);
        list.add(tools);

        return list;
    }
}

