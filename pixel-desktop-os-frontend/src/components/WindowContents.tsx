  import { useEffect, useState } from "react";
import { projectsData, type Project } from "@/lib/projects";

const BACKEND_BASE_URL = "http://localhost:8080";

const openInOsBrowser = (url: string) => {
  if (!url) return;
  window.dispatchEvent(
    new CustomEvent("os-open-browser", {
      detail: { url },
    }),
  );
};

const resolveImageUrl = (image?: string | null): string => {
  if (!image) return "";
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  if (image.startsWith("/")) {
    // Our static files live under Spring Boot's /public path
    return `${BACKEND_BASE_URL}/public${image}`;
  }
  return `${BACKEND_BASE_URL}/public/${image}`;
};

type Profile = {
  fullName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  portfolioUrl: string;
  resumeUrl?: string | null;
  summary: string;
  experienceSummary: string;
  skillsSummary: string;
};

export const AboutContent = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/profile`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data: Profile = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile from backend, using fallback.", err);
        setError("Using fallback about data (backend not reachable).");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const name = profile?.fullName ?? "Rohit Parit";
  const title = profile?.title ?? "Full Stack / Java Backend Developer";
  const location = profile?.location ?? "India";
  const email = profile?.email ?? "rohitparit1934@gmail.com";
  const phone = profile?.phone ?? "+91 9810167696";
  const github = profile?.github ?? "https://github.com/rparit-stacks";
  const summary =
    profile?.summary ??
    "I'm Rohit — a developer who loves building real-world systems that live on the internet, from APIs and backend services to polished frontends.";
  const experienceSummary =
    profile?.experienceSummary ??
    "I’ve worked on full-stack e-commerce platforms, banking system migrations from PHP to Java, and custom booking/management systems.";
  const skillsSummary =
    profile?.skillsSummary ??
    "Strong in Java, Spring Boot, REST APIs, databases like MySQL/PostgreSQL, and modern React/TypeScript frontends.";

  return (
    <div className="space-y-4">
      <h2 className="text-primary font-pixel text-sm mb-1">{">"} about_rohit.exe</h2>
      {loading && (
        <p className="text-muted-foreground text-xs">Loading profile from backend...</p>
      )}
      {!loading && error && (
        <p className="text-[11px] text-yellow-500">{error}</p>
      )}

      <div className="space-y-2">
        <p className="text-foreground text-lg font-semibold">
          {name}
        </p>
        <p className="text-primary text-sm font-medium">
          {title}
        </p>
        <p className="text-muted-foreground text-sm">
          {summary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-primary font-pixel text-[11px]">
            EXPERIENCE HIGHLIGHTS:
          </p>
          <p className="text-muted-foreground text-sm whitespace-pre-line">
            {experienceSummary}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-primary font-pixel text-[11px]">
            SKILLS & TOOLS:
          </p>
          <p className="text-muted-foreground text-sm whitespace-pre-line">
            {skillsSummary}
          </p>
        </div>
      </div>

      <div className="mt-2 border-t border-border pt-3 flex flex-col gap-1 text-sm">
        <p className="text-primary font-pixel text-[11px]">
          STATUS: <span className="text-primary/80">BUILDING REAL-WORLD SYSTEMS</span>
        </p>
        <p className="text-primary font-pixel text-[11px]">
          LOCATION: <span className="text-primary/80">{location}</span>
        </p>
        <p className="text-primary font-pixel text-[11px]">
          EMAIL:{" "}
          <button
            type="button"
            onClick={() => openInOsBrowser(`mailto:${email}`)}
            className="underline"
          >
            {email}
          </button>
        </p>
        <p className="text-primary font-pixel text-[11px]">
          PHONE: <span className="text-primary/80">{phone}</span>
        </p>
        <p className="text-primary font-pixel text-[11px]">
          GITHUB:{" "}
          <button
            type="button"
            onClick={() => openInOsBrowser(github)}
            className="underline"
          >
            {github}
          </button>
        </p>
        {profile?.portfolioUrl && (
          <p className="text-primary font-pixel text-[11px]">
            PORTFOLIO:{" "}
            <button
              type="button"
              onClick={() => openInOsBrowser(profile.portfolioUrl)}
              className="underline"
            >
              {profile.portfolioUrl}
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export const ProjectsContent = () => {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [selectedProject, setSelectedProject] = useState<Project | null>(projectsData[0] ?? null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/projects");
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data: Project[] = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          setSelectedProject(data[0]);
        }
      } catch (err) {
        console.error("Failed to load projects from backend, using local mock.", err);
        setError("Using local mock data (backend not reachable or DB empty).");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="space-y-3 h-full flex flex-col">
      <h2 className="text-primary font-pixel text-sm mb-2">{">"} ls projects/</h2>

      <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-3 flex-1 min-h-0">
        <div className="space-y-3 overflow-y-auto pr-1">
          {projects.map((project) => (
            <button
              key={project.id}
              className={`w-full text-left pixel-border px-3 py-2.5 bg-secondary/40 hover:bg-secondary/70 transition-colors ${
                selectedProject?.id === project.id ? "border-primary bg-secondary/80" : ""
              }`}
              onClick={() => setSelectedProject(project)}
            >
              <p className="text-primary font-pixel text-xs truncate">📁 {project.title}</p>
              <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                {project.description}
              </p>
              <p className="text-primary/70 text-xs mt-1 truncate">
                [{project.techStack.join(" · ")}]
              </p>
            </button>
          ))}
        </div>

        <div className="pixel-border bg-secondary/40 p-3 overflow-y-auto">
          {loading && (
            <p className="text-muted-foreground text-xs mb-2">
              Loading projects from backend...
            </p>
          )}
          {!loading && error && (
            <p className="text-xs text-yellow-500 mb-2">
              {error}
            </p>
          )}
          {selectedProject ? (
            <div className="space-y-3">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 space-y-1">
                  <p className="text-primary font-pixel text-xs uppercase tracking-wide">
                    {selectedProject.id}
                  </p>
                  <h3 className="text-foreground font-semibold text-base md:text-lg">
                    {selectedProject.title}
                  </h3>
                  <p className="text-muted-foreground text-base">
                    {selectedProject.detailedDescription}
                  </p>
                </div>
                {selectedProject.image && (
                  <div className="w-full md:w-48 lg:w-56 shrink-0">
                    <div className="pixel-border overflow-hidden bg-black/40">
                      <img
                        src={resolveImageUrl(selectedProject.image)}
                        alt={selectedProject.title}
                        className="w-full h-32 md:h-32 lg:h-36 object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <p className="text-primary font-pixel text-xs mb-1">
                    FEATURES:
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    {selectedProject.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-primary font-pixel text-xs mb-1">
                    TECH STACK:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="pixel-border px-2 py-0.5 text-xs bg-background/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-primary font-pixel text-xs">
                    LINKS:
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <button
                      type="button"
                      onClick={() => openInOsBrowser(selectedProject.github)}
                      className="pixel-btn !px-2 !py-1 !text-xs"
                    >
                      &gt; GitHub Repo
                    </button>
                    {selectedProject.demo && (
                      <button
                        type="button"
                        onClick={() => openInOsBrowser(selectedProject.demo as string)}
                        className="pixel-btn !px-2 !py-1 !text-xs"
                      >
                        &gt; Live Demo
                      </button>
                    )}
                    {selectedProject.blog && (
                      <button
                        type="button"
                        onClick={() => openInOsBrowser(selectedProject.blog as string)}
                        className="pixel-btn !px-2 !py-1 !text-xs"
                      >
                        &gt; Blog / Docs
                      </button>
                    )}
                    {selectedProject.docker && (
                      <button
                        type="button"
                        onClick={() => openInOsBrowser(selectedProject.docker as string)}
                        className="pixel-btn !px-2 !py-1 !text-xs"
                      >
                        &gt; Docker Image
                      </button>
                    )}
                    {selectedProject.videoTutorial && (
                      <button
                        type="button"
                        onClick={() => openInOsBrowser(selectedProject.videoTutorial as string)}
                        className="pixel-btn !px-2 !py-1 !text-xs"
                      >
                        &gt; Video
                      </button>
                    )}
                  </div>
                  {selectedProject.extraLinks && selectedProject.extraLinks.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {selectedProject.extraLinks.map((link) => (
                        <button
                          key={link.url}
                          type="button"
                          onClick={() => openInOsBrowser(link.url)}
                          className="text-xs text-primary underline"
                        >
                          {">"} {link.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {selectedProject.adminCredentials && (
                  <div className="space-y-1">
                    <p className="text-primary font-pixel text-xs">
                      ADMIN CREDS (DEMO):
                    </p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Email: <span className="text-foreground">{selectedProject.adminCredentials.email}</span></p>
                      <p>Password: <span className="text-foreground">{selectedProject.adminCredentials.password}</span></p>
                      <p>
                        Login:{" "}
                        <button
                          type="button"
                          onClick={() => openInOsBrowser(selectedProject.adminCredentials!.loginUrl)}
                          className="text-primary underline text-xs"
                        >
                          {selectedProject.adminCredentials.loginUrl}
                        </button>
                      </p>
                      {selectedProject.adminCredentials.note && (
                        <p className="text-xs text-primary/80">
                          {selectedProject.adminCredentials.note}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {selectedProject.entities && (
                <div>
                  <p className="text-primary font-pixel text-xs mb-1">
                    DOMAIN ENTITIES:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedProject.entities.join(" · ")}
                  </p>
                </div>
              )}

              {selectedProject.apiEndpoints && (
                <div>
                  <p className="text-primary font-pixel text-xs mb-1">
                    KEY API ENDPOINTS:
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    {selectedProject.apiEndpoints.map((ep) => (
                      <li key={ep}>{ep}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Select a project from the list on the left to view details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

type SkillCategory = {
  id?: string;
  name: string;
  items: string[];
  sortOrder?: number;
};

export const SkillsContent = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/skills`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data: SkillCategory[] = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
          return;
        }
      } catch (err) {
        console.error("Failed to load skills from backend, using static fallback.", err);
        setError("Using fallback skills (backend not reachable).");
      } finally {
        setLoading(false);
      }

      // Fallback to static categories matching old UI
      setCategories([
        { name: "Languages", items: ["Java", "JavaScript", "TypeScript", "SQL", "HTML/CSS"] },
        { name: "Backend", items: ["Spring Boot", "REST APIs", "Hibernate", "Maven"] },
        { name: "Frontend", items: ["React", "Tailwind CSS", "Bootstrap"] },
        { name: "Database", items: ["MySQL", "PostgreSQL", "MongoDB"] },
        { name: "Tools", items: ["Git", "Docker", "Postman", "VS Code", "IntelliJ"] },
      ]);
    };

    fetchSkills();
  }, []);

  return (
    <div className="space-y-3 h-full flex flex-col">
      <h2 className="text-primary font-pixel text-xs mb-2">{">"} cat skills.cfg</h2>
      {loading && (
        <p className="text-muted-foreground text-xs">Loading skills from backend...</p>
      )}
      {!loading && error && (
        <p className="text-[11px] text-yellow-500">{error}</p>
      )}

      <div className="space-y-3 overflow-y-auto pr-1">
        {categories.map((s) => (
          <div key={s.id ?? s.name}>
            <p className="text-primary font-pixel text-[11px] mb-1">[{s.name}]</p>
            <div className="flex flex-wrap gap-2">
              {s.items.map((item) => (
                <span key={item} className="pixel-border px-2 py-1 text-sm bg-secondary/50">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

type Experience = {
  id?: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  type?: string;
  summary?: string;
  bulletPoints?: string[];
  technologies?: string[];
};

export const ExperienceContent = () => {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/experience`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data: Experience[] = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
          return;
        }
      } catch (err) {
        console.error("Failed to load experience from backend, using static fallback.", err);
        setError("Using fallback work history (backend not reachable).");
      } finally {
        setLoading(false);
      }

      setItems([
        {
          role: "Software Developer",
          company: "Tech Corp",
          period: "2023 – Present",
          summary: "Building scalable microservices and REST APIs using Spring Boot.",
        },
        {
          role: "Java Intern",
          company: "StartupXYZ",
          period: "2022 – 2023",
          summary: "Developed backend services, database schemas, and API integrations.",
        },
      ]);
    };

    fetchExperience();
  }, []);

  return (
    <div className="space-y-3 h-full flex flex-col">
      <h2 className="text-primary font-pixel text-xs mb-2">{">"} history --work</h2>
      {loading && (
        <p className="text-muted-foreground text-xs">Loading work history from backend...</p>
      )}
      {!loading && error && (
        <p className="text-[11px] text-yellow-500">{error}</p>
      )}

      <div className="space-y-3 overflow-y-auto pr-1">
        {items.map((e) => (
          <div key={e.id ?? `${e.role}-${e.company}`} className="pixel-border p-3 bg-secondary/50">
            <p className="text-primary font-pixel text-[9px]">{e.role}</p>
            <p className="text-foreground text-sm">
              @ {e.company}
              {e.location ? ` • ${e.location}` : ""}
            </p>
            <p className="text-muted-foreground text-xs">{e.period}</p>
            {e.summary && (
              <p className="text-muted-foreground text-sm mt-2">{e.summary}</p>
            )}
            {e.bulletPoints && e.bulletPoints.length > 0 && (
              <ul className="list-disc list-inside text-[12px] space-y-1 text-muted-foreground mt-2">
                {e.bulletPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            {e.technologies && e.technologies.length > 0 && (
              <p className="text-primary/80 text-[11px] mt-2">
                Tech: {e.technologies.join(" · ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ContactContent = () => (
  <div className="space-y-3">
    <h2 className="text-primary font-pixel text-xs mb-4">{'>'} open contact.sh</h2>
    <div className="space-y-2">
      <p>
        📧{" "}
        <button
          type="button"
          className="text-primary underline"
          onClick={() => openInOsBrowser("mailto:rohitparit1934@gmail.com")}
        >
          rohitparit1934@gmail.com
        </button>
      </p>
      <p>
        📱 <span className="text-primary">+91 9810167696</span>
      </p>
      <p>
        📍 <span className="text-muted-foreground">India</span>
      </p>
      <p>
        🖥{" "}
        <button
          type="button"
          className="text-primary underline"
          onClick={() => openInOsBrowser("https://github.com/rparit-stacks")}
        >
          github.com/rparit-stacks
        </button>
      </p>
      <p>
        🔗{" "}
        <button
          type="button"
          className="text-primary underline"
          onClick={() => openInOsBrowser("https://www.linkedin.com/in/rparit1934")}
        >
          linkedin.com/in/rparit1934
        </button>
      </p>
    </div>
    <div className="mt-4 pixel-border p-3 bg-secondary/50">
      <p className="text-primary font-pixel text-[9px] mb-2">SEND_MESSAGE:</p>
      <p className="text-muted-foreground text-sm">
        Feel free to reach out for collaborations, projects, or just to say hello!
      </p>
    </div>
  </div>
);

export const ResumeContent = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resp = await fetch(`${BACKEND_BASE_URL}/api/profile`);
        if (resp.ok) {
          const data = (await resp.json()) as Profile;
          setProfile(data);
        }
      } catch (err) {
        console.error("Failed to load profile for resume", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const resumeUrl =
    profile?.resumeUrl && profile.resumeUrl.trim().length > 0
      ? profile.resumeUrl
      : null;

  return (
    <div className="space-y-3 h-full flex flex-col">
      <h2 className="text-primary font-pixel text-xs mb-4">{">"} open resume.pdf</h2>
      <div className="pixel-border p-4 bg-secondary/50 flex flex-col md:flex-row gap-4 flex-1 min-h-[220px]">
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3">
          <p className="text-4xl mb-1">📄</p>
          <p className="text-foreground mb-1">Resume / CV</p>
          {loading && (
            <p className="text-muted-foreground text-sm mb-2 px-2">
              Loading resume info from backend...
            </p>
          )}
          {!loading && !resumeUrl && (
            <p className="text-muted-foreground text-sm mb-2 px-2">
              Resume is not uploaded yet. Go to <span className="text-primary">/admin</span> and upload a PDF.
            </p>
          )}
          {!loading && resumeUrl && (
            <>
              <p className="text-muted-foreground text-sm mb-2 px-2">
                Preview or download my latest resume directly from this OS.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                <button
                  type="button"
                  className="pixel-btn !text-[10px] !px-4 !py-2"
                  onClick={() => openInOsBrowser(resumeUrl)}
                >
                  👁 PREVIEW_RESUME.PDF
                </button>
                <a
                  href={resumeUrl}
                  download="Rohit-Parit-Resume.pdf"
                  className="pixel-btn !text-[10px] !px-4 !py-2 inline-flex items-center justify-center"
                >
                  ⬇ DOWNLOAD_RESUME.PDF
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
