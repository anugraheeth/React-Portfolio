import { useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun, ArrowRight, Github, Linkedin, Mail, ExternalLink, ChevronDown, PlayCircle, PointerIcon, Link } from 'lucide-react';
import logo from '../public/Logo.svg';
import me from './assets/me.png';
import blip from './assets/Blip.png';
import schedulo from './assets/Schedulo.png';
import terminal from './assets/terminal.png';
import preview from './assets/Preview.png';

// Base portfolio data scraped from anugraheethmohanan.netlify.app
const portfolioData = {
  name: "Anugraheeth Mohanan",
  title: "Full Stack Developer",
  description: "I build exceptional and accessible digital experiences for the web.",
  about: "I'm a passionate software developer with expertise in building web applications. I enjoy tackling complex problems and creating intuitive user experiences.",
  skills: [
    "JavaScript", "React", "Node.js", "Express", "MongoDB", 
    "HTML/CSS", "Python", "SQL", "Git", "Docker"
  ],
  projects: [
    {
      image:blip,
      title: "BLIP",
      description: "A Real-time Chat application using React Nodejs and SocketIO .",
      tech: ["React", "Node.js", "MongoDB", "Socket.io" , "Zustand"],
      link: "https://blip-bx4o.onrender.com/"
    },
    {
      image:schedulo,
      title: "Schedulo",
      description: "A Role-Based Access Control System for Managing and Scheduling Classes for Teachers",
      tech: ["React", "Express", "MongoDB", "Axios", "Redux"],
      link: "https://rbac-frontend-bu6e.onrender.com"
    },
    {
      image:terminal,
      title: "Portfolio Website",
      description: "A terminal-style developer portfolio built with React inspired by the look and feel of a classic Linux terminal",
      tech: ["React"],
      link: "https://anugraheeth.github.io/TerminalPortfolio/"
    }
  ],
  experience: [
    {
      company: "IIM Indore", 
      role: "Freelanced as a Gaphic Designer",
      period: "Feb 2025",
      description: "Freelanced as a Graphic Designer for IIM Indore in February 2025. Designed modern, professional resume templates and a high-impact placement brochure tailored to corporate and academic stakeholders. Ensured brand consistency, visual appeal, and readability across all formats—optimized for both print and digital use."
    },
    {
      company: "Hasthadhi - Kidangoor Grama Panchayat",
      role: "Full Stack Developer",
      period: "2024 - Present",
      description: "Worked as a Full Stack Developer on the Kidangoor Grama Panchayat Government Digitization Project, aimed at modernizing local governance services. I led the development of key modules including citizen service portals, complaint management, and digital record systems using React for the frontend, Node.js for the backend, and SQL for data management. This initiative significantly improved the efficiency, accessibility, and transparency of public service delivery."
    },
    {
      company: "Main Project - Visionary Guidance",
      role: " Team Lead, Full Stack Developer",
      period: "2024 - 2025",
      description: "Led the development of 'Visionary Guidance'—an AI-powered smart guidance system for the visually impaired—as part of my B.Tech final year project. Took on full-stack, hardware integration, and team leadership roles. The system uses smart glasses with ESP32-CAM and a Raspberry Pi 5 for real-time object detection via YOLOv8 and OpenCV, delivering audio feedback through Bluetooth. A Flutter mobile app provides voice-assisted navigation. This end-to-end solution enhances mobility, safety, and independence for blind users."
    },
    {
      company: "Mini Project - Grade Master",
      role: "Team Lead, Frontend Developer",
      period: "2024",
      description: "Led a team to develop a responsive web application for student report management and verification as part of our B.Tech S6 mini project. Built with PHP and MySQL for the backend, and HTML, CSS, JS for the frontend."
    }
  ],
  contact: {
    email: "anugraheethmohan@gmail.com",
    github: "https://github.com/anugraheeth",
    linkedin: "https://linkedin.com/in/anugraheethmohanan",
  }
};

// Utility components
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`py-20 px-4 md:px-8 ${className}`}>
    {children}
  </section>
);

const AnimatedBackground = ({ theme }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-500`}></div>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-3xl opacity-20 animate-float ${
            theme === 'dark' 
              ? 'bg-blue-500 mix-blend-screen' 
              : 'bg-blue-300 mix-blend-multiply'
          }`}
          style={{
            width: `${Math.random() * 30 + 10}vw`,
            height: `${Math.random() * 30 + 10}vw`,
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${Math.random() * 30 + 30}s`
          }}
        ></div>
      ))}
    </div>
  );
};

const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

// Main App Component
export default function Portfolio() {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className={`min-h-screen font-sans ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} transition-colors duration-500`}>
      <AnimatedBackground theme={theme} />
      
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-gray-900/70 backdrop-blur-md' : 'bg-white/70 backdrop-blur-md'} transition-colors duration-500`}>
        <div className="container mx-auto px-8 py-4 flex justify-between items-center">
            <img src={logo} alt="Logo" className="h-8" href='#'/>
            
          
          
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-6">
                {['about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => scrollToSection(item)}
                      className="capitalize hover:text-blue-500 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} transition-colors`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleTheme}
              className={`p-2 mr-2 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} transition-colors`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={toggleMenu}
              className="p-2"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`min-h-screen md:hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} transition-all duration-300`}>
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-4">
                {['about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => scrollToSection(item)}
                      className="capitalize text-lg block w-full text-left py-2 hover:text-blue-500 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <Section id="hero" className="min-h-screen flex items-center pt-32">
        <div className="container mx-auto">
          <ScrollReveal>
            <p className="text-blue-500 font-medium mb-4">Hi, I'm</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              {portfolioData.name}
            </h1>
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {portfolioData.title}
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mb-8">
              {portfolioData.description}
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className={`px-6 py-3 rounded-lg flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors`}
              >
                <span>View Projects</span>
                <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`px-6 py-3 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 hover:border-gray-500' 
                    : 'border-gray-300 hover:border-gray-400'
                } transition-colors`}
              >
                Contact Me
              </button>
            </div>
          </ScrollReveal>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={24} className="text-blue-500" />
          </div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about">
        <div className="container mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-500">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-stretch">
              <div className="space-y-4 text-justify flex flex-col justify-between">
                <p className="text-lg leading-relaxed">
                  {portfolioData.about}
                </p>
                <p className="text-lg leading-relaxed">
                  With a focus on clean code and user-centered design, I strive to build applications that are not only functional but also intuitive and enjoyable to use.
                </p>
                <p className="text-lg leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good book.
                </p>
                <p className="text-lg leading-relaxed">
                  Passionate about creating elegant solutions to complex problems.
                </p>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src={me}
                  alt="My 3d avatar"
                  className="w-full max-w-sm h-full object-contain  drop-shadow-lg"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>


      {/* Skills Section */}
      <Section id="skills" className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
        <div className="container mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-500">Skills & Technologies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {portfolioData.skills.map((skill, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-white hover:bg-gray-50 shadow-md'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="font-medium">{skill}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects">
        <div className="container mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12   ">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.projects.map((project, index) => (
                <div 
                  key={index}
                  className={`rounded-lg overflow-hidden group transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-50 shadow-lg'
                  }`}
                >
                  <div className={`h-42 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  } flex items-center justify-center`}>
                    <div className="text-4xl text-blue-500">
                      <img src={project.image} alt={project.title} />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <Link size={24} />
                      </a>
                    </div>
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className={`text-xs px-2 py-1 rounded ${
                            theme === 'dark' 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Section>
      {/* Resume   */}
    <Section id="resume" className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'} py-20 px-6 text-white`}>
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    {/* Resume Image */}
    <ScrollReveal>
      <div className="relative flex justify-center">
        <div className="absolute h-64 -top-4 -left-4 bg-blue-400 rounded-xl blur-xl opacity-30 z-0"></div>
        <img
          src={preview}
          alt="Resume preview"
          className="rounded-xl relative z-10 object-contain max-h-96 w-full"
        />
      </div>
    </ScrollReveal>

    {/* Content */}
    <ScrollReveal>
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-blue-500">
          View My Resume 📄
        </h2>
        <p className="text-lg leading-relaxed text-gray-300">
          Explore my skills, projects, education, and work experiences all in one place. Designed with clarity and professionalism to reflect my journey as a full-stack developer.
        </p>
        <ul className="space-y-2 text-base text-gray-400">
          <li>🛠 Tech Stack Highlights</li>
          <li>📚 Academic Projects & Internships</li>
          <li>💡 Freelance & Open Source Contributions</li>
        </ul>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <a
            href="/Anugraheeth_Resume.pdf"
            download
            className={`px-6 py-3 rounded-lg flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors`}
          >
            Download Resume
          </a>
        </div>
      </div>
    </ScrollReveal>
  </div>
</Section>

      {/* Experience Section */}
      <Section id="experience" >
        <div className="container mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-500">Work Experience</h2>
            <div className="space-y-8">
              {portfolioData.experience.map((job, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-700' 
                      : 'bg-white shadow-md'
                  } transition-all duration-300 hover:transform hover:scale-[1.01]`}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h3 className="text-xl font-bold">{job.role}</h3>
                    <div className="flex items-center text-blue-400 font-bold">
                      <span className="mr-2">{job.company}</span>
                      <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {job.period}
                      </span>
                    </div>
                  </div>
                  <p>{job.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-500">Get In Touch</h2>
            <p className="text-lg mb-8">
              I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open!
            </p>
            <div className="flex flex-col md:flex-row gap-8">
              <a 
                href={`mailto:${portfolioData.contact.email}`}
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-50 shadow-md'
                }`}
              >
                <Mail size={24} className="mr-4 text-blue-500" />
                <span>{portfolioData.contact.email}</span>
              </a>
              <a 
                href={portfolioData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-50 shadow-md'
                }`}
              >
                <Github size={24} className="mr-4 text-blue-500" />
                <span>GitHub</span>
              </a>
              <a 
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-50 shadow-md'
                }`}
              >
                <Linkedin size={24} className="mr-4 text-blue-500" />
                <span>LinkedIn</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Footer */}
      <footer className={`py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4 text-center">
          <p>
            Designed & Built by {portfolioData.name} © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}