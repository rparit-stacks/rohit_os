package com.rps.os_backned.experience.service;

import com.rps.os_backned.experience.model.ExperienceDocument;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public final class ExperienceMocks {

    private ExperienceMocks() {
    }

    public static List<ExperienceDocument> getMockExperiences() {
        List<ExperienceDocument> list = new ArrayList<>();

        ExperienceDocument studioSara = new ExperienceDocument();
        studioSara.setRole("Full Stack Developer");
        studioSara.setCompany("Studio Sara India");
        studioSara.setLocation("India");
        studioSara.setPeriod("Jan 2026 – Present");
        studioSara.setType("FULL_TIME");
        studioSara.setSummary("Building a production-ready full-stack e-commerce platform with Spring Boot backend and React frontend.");
        studioSara.setBulletPoints(Arrays.asList(
                "Developed a scalable e-commerce backend using Spring Boot, REST APIs, and MySQL.",
                "Implemented secure multi-currency payment integrations and order workflows.",
                "Built an admin CMS/dashboard for managing products, content, and marketing sections."
        ));
        studioSara.setTechnologies(Arrays.asList(
                "Java", "Spring Boot", "REST APIs", "MySQL", "React", "TypeScript", "Tailwind CSS"
        ));
        studioSara.setSortOrder(1);
        list.add(studioSara);

        ExperienceDocument debound = new ExperienceDocument();
        debound.setRole("Java Backend Developer");
        debound.setCompany("Debound India");
        debound.setLocation("India");
        debound.setPeriod("Nov 2025 – Jan 2026");
        debound.setType("FULL_TIME");
        debound.setSummary("Migrated critical banking systems from PHP to a modern Java/Spring Boot stack.");
        debound.setBulletPoints(Arrays.asList(
                "Migrated Bank of Maharashtra’s PHP-based modules to Spring Boot and Spring Data JPA.",
                "Improved performance and maintainability by refactoring legacy logic into clean service layers.",
                "Worked closely on domain modeling, database design, and secure API development."
        ));
        debound.setTechnologies(Arrays.asList(
                "Java", "Spring Boot", "Spring Data JPA", "PostgreSQL", "REST APIs"
        ));
        debound.setSortOrder(2);
        list.add(debound);

        ExperienceDocument gnext = new ExperienceDocument();
        gnext.setRole("Full Stack Developer");
        gnext.setCompany("GNEXT India");
        gnext.setLocation("India");
        gnext.setPeriod("Jul 2025 – Oct 2025");
        gnext.setType("FULL_TIME");
        gnext.setSummary("Designed and built a complete physiotherapy booking system from scratch.");
        gnext.setBulletPoints(Arrays.asList(
                "Implemented end-to-end booking flows including schedule management and patient records.",
                "Designed database schema and REST APIs for core booking operations.",
                "Collaborated on UI flows to make the system easy for clinic staff to use."
        ));
        gnext.setTechnologies(Arrays.asList(
                "PHP", "MySQL", "JavaScript", "HTML/CSS"
        ));
        gnext.setSortOrder(3);
        list.add(gnext);

        return list;
    }
}

