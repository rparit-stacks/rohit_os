package com.rps.os_backned.profile.service;

import com.rps.os_backned.profile.model.ProfileDocument;

public final class ProfileMocks {

    private ProfileMocks() {
    }

    public static ProfileDocument getMockProfile() {
        ProfileDocument profile = new ProfileDocument();
        profile.setFullName("Rohit Parit");
        profile.setTitle("Full Stack / Java Backend Developer");
        profile.setLocation("India");
        profile.setEmail("rohitparit1934@gmail.com");
        profile.setPhone("+91 9810167696");
        profile.setGithub("https://github.com/rparit-stacks");
        profile.setPortfolioUrl("https://your-portfolio-url-here");
        profile.setResumeUrl(null);

        profile.setSummary(
                "I'm a Full Stack Developer who enjoys taking ideas from a blank file to production-ready systems. " +
                        "My primary focus is Java and Spring Boot on the backend, where I design clean REST APIs, modular service layers, and secure data flows. " +
                        "On the frontend side I work with React and TypeScript to build responsive, pixel-perfect UIs that still feel lightweight and fast. " +
                        "I care a lot about code quality, readable architecture, and making sure that the systems I build actually solve real business problems."
        );

        profile.setExperienceSummary(
                "• Full Stack Developer – Studio Sara India (Jan 2026 – Present)\n" +
                        "  Built a full-stack e-commerce platform end to end using Spring Boot, React, REST APIs, and MySQL. " +
                        "  Implemented secure payments, admin CMS, and production-friendly features like order management and content-driven sections.\n\n" +
                        "• Java Backend Developer – Debound India (Nov 2025 – Jan 2026)\n" +
                        "  Migrated Bank of Maharashtra's legacy PHP system to a modern Java/Spring Boot stack with Spring Data JPA and PostgreSQL. " +
                        "  Focused on performance, maintainability, and clean domain modeling.\n\n" +
                        "• Full Stack Developer – GNEXT India (Jul 2025 – Oct 2025)\n" +
                        "  Designed and developed a complete Physiotherapy Booking System, handling everything from database schema to REST APIs and frontend flows."
        );

        profile.setSkillsSummary(
                "Backend: Java (primary), Spring Boot, Spring MVC, Spring Data JPA, Spring Security (RBAC), REST API design, microservice-style architectures.\n" +
                        "Databases & Messaging: MySQL, PostgreSQL, Redis, Kafka.\n" +
                        "DevOps & Cloud: Docker, AWS (EC2, S3, SQS), CI/CD, GitHub Actions, Linux.\n" +
                        "Frontend: React, TypeScript, Tailwind CSS, modern component libraries.\n" +
                        "Other: JUnit, Mockito, Postman, Swagger/OpenAPI, system design, DSA (160+ LeetCode problems), and a mindset focused on writing clean, maintainable code."
        );

        return profile;
    }
}

