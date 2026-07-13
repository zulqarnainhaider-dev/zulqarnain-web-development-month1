import { useEffect, useMemo, useState } from "react";
import profileImage from "./assets/zulqarnain-profile.png";

const skillGroups = [
  {
    title: "Frontend Development",
    icon: "</>",
    description: "Responsive interfaces, clean layouts and interactive user experiences.",
    skills: [["HTML", 95], ["CSS", 82], ["JavaScript", 82], ["React", 60], ["Bootstrap", 80]],
  },
  {
    title: "Programming",
    icon: "{}",
    description: "Strong programming foundations for solving technical and engineering problems.",
    skills: [["Python", 94], ["C++", 92], ["Java", 90]],
  },
  {
    title: "Data & Intelligence",
    icon: "AI",
    description: "Working with structured data, intelligent systems and practical ML workflows.",
    skills: [["Databases", 92], ["Machine Learning", 93]],
  },
  {
    title: "Tools & Design",
    icon: "✦",
    description: "Version control, collaboration and visual design for polished digital products.",
    skills: [["Git", 78], ["Graphic Design", 78]],
  },
];

const projectData = [
  {
    title: "TaskFlow",
    type: "Featured Web Application",
    description:
      "A professional productivity dashboard for planning, prioritising and tracking work with a clean responsive interface and persistent browser storage.",
    tags: ["React", "JavaScript", "Local Storage", "Responsive UI"],
    highlights: ["Task CRUD operations", "Search, filters and sorting", "Progress analytics"],
    icon: "TF",
    status: "Live in portfolio",
    action: "Open Live Application",
    hash: "#taskflow",
  },
  {
    title: "Spam Classification System",
    type: "Machine Learning Project",
    description:
      "A natural-language classification workflow that processes message text and predicts whether content is spam or legitimate.",
    tags: ["Python", "Machine Learning", "NLP"],
    highlights: ["Text preprocessing", "Model training", "Prediction workflow"],
    icon: "ML",
    status: "Completed project",
  },
  {
    title: "MNIST Digit Recognition",
    type: "Computer Vision Project",
    description:
      "A handwritten digit-recognition solution that classifies numerical images and demonstrates practical neural-network inference.",
    tags: ["Python", "Neural Networks", "Computer Vision"],
    highlights: ["Image classification", "Model evaluation", "Visual predictions"],
    icon: "AI",
    status: "Completed project",
  },
];

const initialTasks = [
  {
    id: 1,
    title: "Complete portfolio content",
    description: "Review education, experience and project descriptions.",
    category: "Portfolio",
    priority: "High",
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    completed: false,
    createdAt: Date.now(),
  },
  {
    id: 2,
    title: "Prepare internship report screenshots",
    description: "Capture desktop, mobile and TaskFlow application views.",
    category: "Internship",
    priority: "Medium",
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
    completed: false,
    createdAt: Date.now() - 1000,
  },
];

function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash || "#home");
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "#home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

function ThemeButton({ theme, setTheme }) {
  return (
    <button
      className="icon-button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}

function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Home", "#home"], ["About", "#about"], ["Skills", "#skills"],
    ["Projects", "#projects"], ["Experience", "#experience"], ["Contact", "#contact"],
  ];
  return (
    <header className="site-header">
      <nav className="nav container">
        <a className="brand" href="#home" onClick={() => setOpen(false)}>
          ZH<span>.</span>
        </a>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Open menu">
          ☰
        </button>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="nav-cta" href="#taskflow" onClick={() => setOpen(false)}>TaskFlow</a>
          <ThemeButton theme={theme} setTheme={setTheme} />
        </div>
      </nav>
    </header>
  );
}

function SectionTitle({ eyebrow, title, copy }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function Portfolio({ theme, setTheme }) {
  const professionalRoles = [
    "Web Developer",
    "Computer Engineering Student",
    "Software Developer",
    "Machine Learning Enthusiast",
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = professionalRoles[roleIndex];

    const typingSpeed = isDeleting ? 45 : 85;
    const pauseTime =
      displayedRole === currentRole && !isDeleting ? 1400 : typingSpeed;

    const typingTimer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));

        if (displayedRole === currentRole) {
          setIsDeleting(true);
        }
      } else {
        setDisplayedRole(currentRole.slice(0, displayedRole.length - 1));

        if (displayedRole === "") {
          setIsDeleting(false);
          setRoleIndex((currentIndex) =>
            (currentIndex + 1) % professionalRoles.length
          );
        }
      }
    }, pauseTime);

    return () => clearTimeout(typingTimer);
  }, [displayedRole, isDeleting, roleIndex]);

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <section id="home" className="hero section">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <div className="status-pill"><span /> Available for learning opportunities</div>
              <p className="eyebrow">Computer Engineering · Web Development</p>

              <div className="animated-role">
                <span>I’m a</span>
                <strong>{displayedRole}</strong>
                <i className="typing-cursor" />
              </div>
              <h1>Building thoughtful digital experiences with <em>code and creativity.</em></h1>
              <p className="hero-text">
                I’m Zulqarnain Haider, a Computer Engineering student in Islamabad focused on
                modern web development, software engineering and intelligent systems.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#projects">Explore Projects</a>
                <a className="button secondary" href="#contact">Contact Me</a>
                <a
                  className="button social-button"
                  href="https://www.linkedin.com/in/zulqarnain-haider-37a766413"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
              </div>
              <div className="hero-metrics">
                <div><strong>12+</strong><span>Technical Skills</span></div>
                <div><strong>06</strong><span>Current Semester</span></div>
                <div><strong>2027</strong><span>Graduation Year</span></div>
              </div>
            </div>
            <div className="portrait-wrap reveal">
              <div className="portrait-card">
                <img src={profileImage} alt="Zulqarnain Haider" />
                <div className="portrait-label">
                  <span>VIS at strive</span>
                  <strong>Islamabad, Pakistan</strong>
                </div>
              </div>
              <div className="floating-card code-card">
                <span>&lt;/&gt;</span>
                <div><strong>Clean Code</strong><small>Responsive Interfaces</small></div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <SectionTitle
              eyebrow="About Me"
              title="Engineering knowledge with a product-focused mindset."
              copy="I combine programming, web technologies, databases, machine learning and visual design to create solutions that are both functional and polished."
            />
            <div className="about-grid">
              <article className="glass-card about-story">
                <h3>My Direction</h3>
                <p>
                  I am pursuing Computer Engineering at Capital University of Science and Technology.
                  My goal is to become a capable software and full-stack developer who can design,
                  develop and improve reliable digital products.
                </p>
                <p>
                  Alongside web development, I have strong foundations in Python, C++, Java,
                  databases and machine learning. This gives me a broader understanding of how
                  intelligent applications are designed from interface to logic.
                </p>
              </article>
              <div className="fact-grid">
                <article className="glass-card fact"><span>Degree</span><strong>BS Computer Engineering</strong><small>CUST · 2023–2027</small></article>
                <article className="glass-card fact"><span>Intermediate</span><strong>ICS</strong><small>Punjab College, Quaid Campus</small></article>
                <article className="glass-card fact"><span>Internship</span><strong>Web Development Intern</strong><small>Professional learning experience</small></article>
                <article className="glass-card fact"><span>Focus</span><strong>Web & Software</strong><small>Modern, usable applications</small></article>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section muted-section">
          <div className="container">
            <SectionTitle
              eyebrow="Technical Toolkit"
              title="A multidisciplinary skill set."
              copy="Proficiency values are presented as a visual overview and can be adjusted as the portfolio develops."
            />
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <article className="skill-group-card" key={group.title}>
                  <div className="skill-group-head">
                    <span className="skill-group-icon">{group.icon}</span>
                    <div>
                      <h3>{group.title}</h3>
                      <p>{group.description}</p>
                    </div>
                  </div>
                  <div className="skill-list">
                    {group.skills.map(([name, value]) => (
                      <div className="skill-row" key={name}>
                        <div className="skill-row-top">
                          <strong>{name}</strong>
                          <span>{value}%</span>
                        </div>
                        <div className="skill-track">
                          <span style={{ width: `${value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <SectionTitle
              eyebrow="Selected Work"
              title="Projects that connect theory with practical implementation."
              copy="This portfolio will grow as more university, internship and independent projects are completed."
            />
            <div className="projects-grid">
              {projectData.map((project, index) => (
                <article className={`project-card project-${index + 1}`} key={project.title}>
                  <div className="project-visual" aria-hidden="true">
                    <span className="project-index">0{index + 1}</span>
                    <div className="project-mark">{project.icon}</div>
                    <div className="project-window-lines"><i /><i /><i /></div>
                  </div>

                  <div className="project-body">
                    <div className="project-top">
                      <span className="project-type">{project.type}</span>
                      <span className="project-status"><i />{project.status}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    <ul className="project-highlights">
                      {project.highlights.map((item) => <li key={item}>{item}</li>)}
                    </ul>

                    <div className="tag-list">
                      {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                    </div>

                    <div className="project-actions">
                      {project.hash ? (
                        <a className="button project-button" href={project.hash}>{project.action} <span>↗</span></a>
                      ) : (
                        <span className="project-note">Project documentation will be added to GitHub.</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section muted-section">
          <div className="container">
            <SectionTitle eyebrow="Experience & Education" title="A foundation built through study and applied learning." />
            <div className="timeline">
              <article>
                <span className="timeline-dot" />
                <div className="timeline-date">2023 — 2027</div>
                <div className="timeline-card">
                  <h3>BS Computer Engineering</h3>
                  <strong>Capital University of Science and Technology</strong>
                  <p>Studying computing, software, programming, databases and engineering concepts. Currently in the sixth semester.</p>
                </div>
              </article>
              <article>
                <span className="timeline-dot" />
                <div className="timeline-date">Internship Experience</div>
                <div className="timeline-card">
                  <h3>Web Devcelopment Intern</h3>
                  <strong>Strive Learning</strong>
                  <p>Completed a hands-on web development internship focused on React.js,
JavaScript, responsive web design and frontend development. Built
real-world projects while following industry best practices.</p>
<ul>
  <li>Developed responsive web applications using React.js</li>
  <li>Built the TaskFlow productivity dashboard</li>
  <li>Created machine learning project interfaces</li>
  <li>Improved UI/UX using modern CSS techniques</li>
</ul>
                </div>
              </article>
              <article>
                <span className="timeline-dot" />
                <div className="timeline-date">Completed</div>
                <div className="timeline-card">
                  <h3>Intermediate in Computer Science</h3>
                  <strong>Punjab College, Quaid Campus</strong>
                  <p>Built an academic foundation in computer science and related subjects before beginning Computer Engineering.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container contact-panel">
            <div>
              <p className="eyebrow">Let’s Connect</p>
              <h2>Open to collaboration, internships and meaningful learning opportunities.</h2>
              <p>Reach out through email, phone or LinkedIn.</p>
            </div>
            <div className="contact-links">
              <a href="mailto:zulqarnainhaider90656@gmail.com"><span>Email</span><strong>zulqarnainhaider90656@gmail.com</strong></a>
              <a href="tel:+923095258625"><span>Phone</span><strong>+92 309 5258625</strong></a>

<a
  href="https://www.linkedin.com/in/zulqarnain-haider-37a..."
  target="_blank"
  rel="noreferrer"
>
  <span>LinkedIn</span>
  <strong>View Professional Profile</strong>
</a>
<div className="contact-card">
  <span>LOCATION</span>
  <strong>Islamabad, Pakistan</strong>
</div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Zulqarnain Haider</span>
          <span>Designed and developed with React</span>
        </div>
      </footer>
    </>
  );
}

function TaskFlow({ theme, setTheme }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("taskflow.tasks");
      return saved ? JSON.parse(saved) : initialTasks;
    } catch {
      return initialTasks;
    }
  });
  const [form, setForm] = useState({
    title: "", description: "", category: "Personal", priority: "Medium", dueDate: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem("taskflow.tasks", JSON.stringify(tasks));
  }, [tasks]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const submitTask = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return notify("Please enter a task title.");
    if (editingId) {
      setTasks(tasks.map(task => task.id === editingId ? { ...task, ...form } : task));
      notify("Task updated successfully.");
    } else {
      setTasks([{ ...form, id: Date.now(), completed: false, createdAt: Date.now() }, ...tasks]);
      notify("Task added successfully.");
    }
    setEditingId(null);
    setForm({ title: "", description: "", category: "Personal", priority: "Medium", dueDate: "" });
  };

  const editTask = task => {
    setEditingId(task.id);
    setForm({
      title: task.title, description: task.description, category: task.category,
      priority: task.priority, dueDate: task.dueDate
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeTask = id => {
    if (window.confirm("Delete this task permanently?")) {
      setTasks(tasks.filter(task => task.id !== id));
      notify("Task deleted.");
    }
  };

  const filteredTasks = useMemo(() => {
    let output = tasks.filter(task =>
      `${task.title} ${task.description} ${task.category}`.toLowerCase().includes(query.toLowerCase())
    );
    if (filter === "Active") output = output.filter(task => !task.completed);
    if (filter === "Completed") output = output.filter(task => task.completed);
    if (filter === "High") output = output.filter(task => task.priority === "High");
    output = [...output].sort((a, b) => {
      if (sort === "Oldest") return a.createdAt - b.createdAt;
      if (sort === "Due Date") return (a.dueDate || "9999").localeCompare(b.dueDate || "9999");
      if (sort === "Priority") {
        const rank = { High: 3, Medium: 2, Low: 1 };
        return rank[b.priority] - rank[a.priority];
      }
      return b.createdAt - a.createdAt;
    });
    return output;
  }, [tasks, query, filter, sort]);

  const completed = tasks.filter(task => task.completed).length;
  const active = tasks.length - completed;
  const completion = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <div className="taskflow-page">
      {toast && <div className="toast">{toast}</div>}
      <header className="task-header">
        <div className="container task-nav">
          <a className="brand" href="#home">ZH<span>.</span></a>
          <div>
            <a className="back-link" href="#home">← Portfolio</a>
            <ThemeButton theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </header>

      <main className="container task-main">
        <section className="task-hero">
          <div>
            <p className="eyebrow">Professional Productivity App</p>
            <h1>TaskFlow</h1>
            <p>Plan intelligently, focus on priorities and track progress from one clean workspace.</p>
          </div>
          <div className="date-badge">
            <span>Today</span>
            <strong>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date())}</strong>
          </div>
        </section>

        <section className="stats-grid">
          <article><span>Total Tasks</span><strong>{tasks.length}</strong><small>All saved tasks</small></article>
          <article><span>Active</span><strong>{active}</strong><small>Needs attention</small></article>
          <article><span>Completed</span><strong>{completed}</strong><small>Finished tasks</small></article>
          <article className="progress-stat"><span>Progress</span><strong>{completion}%</strong><div><i style={{ width: `${completion}%` }} /></div></article>
        </section>

        <section className="task-layout">
          <form className="task-form glass-card" onSubmit={submitTask}>
            <div className="form-heading">
              <div>
                <p className="eyebrow">{editingId ? "Update Task" : "New Task"}</p>
                <h2>{editingId ? "Edit task details" : "Create a focused task"}</h2>
              </div>
              {editingId && <button type="button" className="cancel-edit" onClick={() => {
                setEditingId(null);
                setForm({ title: "", description: "", category: "Personal", priority: "Medium", dueDate: "" });
              }}>Cancel</button>}
            </div>
            <label>Task title
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="What needs to be done?" />
            </label>
            <label>Description
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Add useful context..." />
            </label>
            <div className="form-row">
              <label>Category
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option>Personal</option><option>Study</option><option>Portfolio</option><option>Internship</option><option>Development</option>
                </select>
              </label>
              <label>Priority
                <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                  <option>Low</option><option>Medium</option><option>High</option>
                </select>
              </label>
            </div>
            <label>Due date
              <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
            </label>
            <button className="button primary full" type="submit">{editingId ? "Save Changes" : "Add Task"}</button>
          </form>

          <div className="task-list-panel">
            <div className="task-toolbar">
              <input className="search-input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tasks..." />
              <select value={sort} onChange={e => setSort(e.target.value)}>
                <option>Newest</option><option>Oldest</option><option>Due Date</option><option>Priority</option>
              </select>
            </div>
            <div className="filter-tabs">
              {["All", "Active", "Completed", "High"].map(item => (
                <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>
              ))}
            </div>

            <div className="task-list">
              {filteredTasks.length === 0 ? (
                <div className="empty-state">
                  <div>✓</div><h3>No matching tasks</h3><p>Create a new task or change the active filters.</p>
                </div>
              ) : filteredTasks.map(task => {
                const overdue = task.dueDate && !task.completed && task.dueDate < new Date().toISOString().slice(0, 10);
                return (
                  <article className={`task-item ${task.completed ? "completed" : ""}`} key={task.id}>
                    <button className="check-button" onClick={() => setTasks(tasks.map(item => item.id === task.id ? { ...item, completed: !item.completed } : item))}>
                      {task.completed ? "✓" : ""}
                    </button>
                    <div className="task-content">
                      <div className="task-title-row">
                        <h3>{task.title}</h3>
                        <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                      </div>
                      {task.description && <p>{task.description}</p>}
                      <div className="task-meta">
                        <span>{task.category}</span>
                        {task.dueDate && <span className={overdue ? "overdue" : ""}>{overdue ? "Overdue · " : "Due · "}{task.dueDate}</span>}
                      </div>
                    </div>
                    <div className="task-actions">
                      <button onClick={() => editTask(task)}>Edit</button>
                      <button onClick={() => removeTask(task.id)}>Delete</button>
                    </div>
                  </article>
                );
              })}
            </div>
            {completed > 0 && (
              <button className="clear-button" onClick={() => {
                setTasks(tasks.filter(task => !task.completed));
                notify("Completed tasks cleared.");
              }}>Clear completed tasks</button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  const route = useHashRoute();
  const [theme, setTheme] = useState(() => localStorage.getItem("site.theme") || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("site.theme", theme);
  }, [theme]);

  return route === "#taskflow"
    ? <TaskFlow theme={theme} setTheme={setTheme} />
    : <Portfolio theme={theme} setTheme={setTheme} />;
}
