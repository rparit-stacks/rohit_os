import { useEffect, useState } from "react";

const BACKEND_BASE_URL = "http://localhost:8080";

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

type Project = {
  id?: string;
  title: string;
  description: string;
  techStack: string[];
  github: string;
  docker?: string | null;
  demo: string | null;
  blog: string | null;
};

type Tab = "profile" | "projects";

const emptyProfile: Profile = {
  fullName: "",
  title: "",
  location: "",
  email: "",
  phone: "",
  github: "",
  portfolioUrl: "",
  resumeUrl: null,
  summary: "",
  experienceSummary: "",
  skillsSummary: "",
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [projectLoading, setProjectLoading] = useState(true);
  const [projectSaving, setProjectSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resp = await fetch(`${BACKEND_BASE_URL}/api/profile`);
        if (resp.ok) {
          const data = (await resp.json()) as Profile;
          setProfile({ ...emptyProfile, ...data });
        } else {
          console.error("Failed to load profile", resp.status);
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setProfileLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const resp = await fetch(`${BACKEND_BASE_URL}/api/projects`);
        if (resp.ok) {
          const data = (await resp.json()) as Project[];
          setProjects(data);
          if (data.length > 0) {
            setSelectedProjectIndex(0);
          }
        } else {
          console.error("Failed to load projects", resp.status);
        }
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setProjectLoading(false);
      }
    };

    fetchProfile();
    fetchProjects();
  }, []);

  const handleProfileChange = (field: keyof Profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfile = async () => {
    setProfileSaving(true);
    try {
      const resp = await fetch(`${BACKEND_BASE_URL}/api/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!resp.ok) {
        console.error("Failed to save profile", resp.status);
      }
    } catch (err) {
      console.error("Failed to save profile", err);
    } finally {
      setProfileSaving(false);
    }
  };

  const uploadResume = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setProfileSaving(true);
    try {
      const resp = await fetch(`${BACKEND_BASE_URL}/api/resume/upload`, {
        method: "POST",
        body: formData,
      });
      if (!resp.ok) {
        console.error("Failed to upload resume", resp.status);
      } else {
        const updated = (await resp.json()) as Profile;
        setProfile((prev) => ({ ...prev, resumeUrl: updated.resumeUrl }));
      }
    } catch (err) {
      console.error("Failed to upload resume", err);
    } finally {
      setProfileSaving(false);
    }
  };

  const currentProject: Project | null =
    selectedProjectIndex !== null ? projects[selectedProjectIndex] ?? null : null;

  const handleProjectFieldChange = (field: keyof Project, value: string) => {
    if (selectedProjectIndex === null) return;
    setProjects((prev) => {
      const next = [...prev];
      const proj = { ...next[selectedProjectIndex] };
      if (field === "techStack") {
        proj.techStack = value.split(",").map((s) => s.trim()).filter(Boolean);
      } else if (field === "demo" || field === "blog" || field === "docker") {
        (proj as any)[field] = value || null;
      } else {
        (proj as any)[field] = value;
      }
      next[selectedProjectIndex] = proj;
      return next;
    });
  };

  const createNewProject = () => {
    const newProject: Project = {
      title: "",
      description: "",
      techStack: [],
      github: "",
      docker: null,
      demo: null,
      blog: null,
    };
    setProjects((prev) => [...prev, newProject]);
    setSelectedProjectIndex(projects.length);
  };

  const saveCurrentProject = async () => {
    if (!currentProject) return;
    setProjectSaving(true);
    try {
      const hasId = !!currentProject.id;
      const url = hasId
        ? `${BACKEND_BASE_URL}/api/projects/${currentProject.id}`
        : `${BACKEND_BASE_URL}/api/projects`;
      const method = hasId ? "PUT" : "POST";
      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProject),
      });
      if (!resp.ok) {
        console.error("Failed to save project", resp.status);
      } else {
        const saved = (await resp.json()) as Project;
        setProjects((prev) => {
          const next = [...prev];
          if (selectedProjectIndex !== null) {
            next[selectedProjectIndex] = saved;
          }
          return next;
        });
      }
    } catch (err) {
      console.error("Failed to save project", err);
    } finally {
      setProjectSaving(false);
    }
  };

  const deleteCurrentProject = async () => {
    if (!currentProject || !currentProject.id) return;
    setProjectSaving(true);
    try {
      const resp = await fetch(`${BACKEND_BASE_URL}/api/projects/${currentProject.id}`, {
        method: "DELETE",
      });
      if (!resp.ok && resp.status !== 404) {
        console.error("Failed to delete project", resp.status);
      }
      setProjects((prev) => {
        const next = prev.filter((p) => p.id !== currentProject.id);
        return next;
      });
      setSelectedProjectIndex((prevIndex) => {
        if (prevIndex === null) return null;
        if (projects.length <= 1) return null;
        return Math.max(0, prevIndex - 1);
      });
    } catch (err) {
      console.error("Failed to delete project", err);
    } finally {
      setProjectSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 font-terminal">
      <div className="max-w-5xl mx-auto space-y-4">
        <h1 className="text-primary font-pixel text-sm mb-2">{">"} admin_panel.exe</h1>

        <div className="flex gap-2 mb-4">
          <button
            className={`pixel-btn !text-[10px] !px-3 !py-1 ${
              activeTab === "profile" ? "!bg-primary !text-primary-foreground" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            PROFILE
          </button>
          <button
            className={`pixel-btn !text-[10px] !px-3 !py-1 ${
              activeTab === "projects" ? "!bg-primary !text-primary-foreground" : ""
            }`}
            onClick={() => setActiveTab("projects")}
          >
            PROJECTS
          </button>
        </div>

        {activeTab === "profile" && (
          <div className="pixel-border bg-secondary/40 p-4 space-y-3">
            {profileLoading ? (
              <p className="text-muted-foreground text-sm">Loading profile...</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-primary font-pixel">FULL NAME</label>
                    <input
                      className="w-full bg-background border-2 border-border px-2 py-1 text-sm"
                      value={profile.fullName}
                      onChange={(e) => handleProfileChange("fullName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-primary font-pixel">TITLE</label>
                    <input
                      className="w-full bg-background border-2 border-border px-2 py-1 text-sm"
                      value={profile.title}
                      onChange={(e) => handleProfileChange("title", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-primary font-pixel">LOCATION</label>
                    <input
                      className="w-full bg-background border-2 border-border px-2 py-1 text-sm"
                      value={profile.location}
                      onChange={(e) => handleProfileChange("location", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-primary font-pixel">EMAIL</label>
                    <input
                      className="w-full bg-background border-2 border-border px-2 py-1 text-sm"
                      value={profile.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-primary font-pixel">PHONE</label>
                    <input
                      className="w-full bg-background border-2 border-border px-2 py-1 text-sm"
                      value={profile.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-primary font-pixel">GITHUB URL</label>
                    <input
                      className="w-full bg-background border-2 border-border px-2 py-1 text-sm"
                      value={profile.github}
                      onChange={(e) => handleProfileChange("github", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-primary font-pixel">PORTFOLIO URL</label>
                    <input
                      className="w-full bg-background border-2 border-border px-2 py-1 text-sm"
                      value={profile.portfolioUrl}
                      onChange={(e) => handleProfileChange("portfolioUrl", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-primary font-pixel">RESUME URL (auto from upload)</label>
                    <input
                      className="w-full bg-background border-2 border-border px-2 py-1 text-sm"
                      value={profile.resumeUrl ?? ""}
                      readOnly
                    />
                    <input
                      type="file"
                      accept="application/pdf"
                      className="mt-1 text-[11px]"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadResume(file);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-primary font-pixel">SUMMARY</label>
                  <textarea
                    className="w-full bg-background border-2 border-border px-2 py-1 text-sm min-h-[60px]"
                    value={profile.summary}
                    onChange={(e) => handleProfileChange("summary", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[11px] text-primary font-pixel">EXPERIENCE SUMMARY</label>
                  <textarea
                    className="w-full bg-background border-2 border-border px-2 py-1 text-sm min-h-[60px]"
                    value={profile.experienceSummary}
                    onChange={(e) => handleProfileChange("experienceSummary", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[11px] text-primary font-pixel">SKILLS SUMMARY</label>
                  <textarea
                    className="w-full bg-background border-2 border-border px-2 py-1 text-sm min-h-[60px]"
                    value={profile.skillsSummary}
                    onChange={(e) => handleProfileChange("skillsSummary", e.target.value)}
                  />
                </div>

                <button
                  className="pixel-btn !text-[10px] !px-4 !py-2 mt-2"
                  onClick={saveProfile}
                  disabled={profileSaving}
                >
                  {profileSaving ? "SAVING..." : "SAVE_PROFILE"}
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-4">
            <div className="pixel-border bg-secondary/40 p-3 space-y-2 max-h-[60vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-1">
                <p className="text-primary font-pixel text-[11px]">PROJECTS</p>
                <button
                  className="pixel-btn !text-[9px] !px-2 !py-1"
                  onClick={createNewProject}
                >
                  + NEW
                </button>
              </div>
              {projectLoading ? (
                <p className="text-muted-foreground text-xs">Loading projects...</p>
              ) : projects.length === 0 ? (
                <p className="text-muted-foreground text-xs">No projects yet.</p>
              ) : (
                projects.map((p, idx) => (
                  <button
                    key={p.id ?? idx}
                    className={`w-full text-left pixel-border px-2 py-1 bg-secondary/40 hover:bg-secondary/70 text-[11px] ${
                      selectedProjectIndex === idx ? "border-primary bg-secondary/80" : ""
                    }`}
                    onClick={() => setSelectedProjectIndex(idx)}
                  >
                    {p.title || "(untitled project)"}
                  </button>
                ))
              )}
            </div>

            <div className="pixel-border bg-secondary/40 p-4 space-y-3">
              {!currentProject ? (
                <p className="text-muted-foreground text-sm">
                  Select a project from the list or create a new one.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-primary font-pixel">TITLE</label>
                      <input
                        className="w-full bg-background border-2 border-border px-2 py-1 text-sm"
                        value={currentProject.title}
                        onChange={(e) => handleProjectFieldChange("title", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-primary font-pixel">GITHUB URL</label>
                      <input
                        className="w-full bg-background border-2 border-border px-2 py-1 text-sm"
                        value={currentProject.github}
                        onChange={(e) => handleProjectFieldChange("github", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-primary font-pixel">DEMO URL</label>
                      <input
                        className="w-full bg-background border-2 border-border px-2 py-1 text-sm"
                        value={currentProject.demo ?? ""}
                        onChange={(e) => handleProjectFieldChange("demo", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-primary font-pixel">BLOG / DOCS URL</label>
                      <input
                        className="w-full bg-background border-2 border-border px-2 py-1 text-sm"
                        value={currentProject.blog ?? ""}
                        onChange={(e) => handleProjectFieldChange("blog", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-primary font-pixel">DOCKER IMAGE URL</label>
                      <input
                        className="w-full bg-background border-2 border-border px-2 py-1 text-sm"
                        value={currentProject.docker ?? ""}
                        onChange={(e) => handleProjectFieldChange("docker", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-primary font-pixel">TECH STACK (comma separated)</label>
                      <input
                        className="w-full bg-background border-2 border-border px-2 py-1 text-sm"
                        value={currentProject.techStack.join(", ")}
                        onChange={(e) => handleProjectFieldChange("techStack", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-primary font-pixel">SHORT DESCRIPTION</label>
                    <textarea
                      className="w-full bg-background border-2 border-border px-2 py-1 text-sm min-h-[60px]"
                      value={currentProject.description}
                      onChange={(e) => handleProjectFieldChange("description", e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      className="pixel-btn !text-[10px] !px-4 !py-2"
                      onClick={saveCurrentProject}
                      disabled={projectSaving}
                    >
                      {projectSaving ? "SAVING..." : "SAVE_PROJECT"}
                    </button>
                    {currentProject.id && (
                      <button
                        className="pixel-btn !text-[10px] !px-4 !py-2 hover:!bg-destructive"
                        onClick={deleteCurrentProject}
                        disabled={projectSaving}
                      >
                        DELETE_PROJECT
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

