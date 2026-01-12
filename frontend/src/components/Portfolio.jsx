import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Download, ExternalLink, Briefcase, Code, Award, ChevronRight } from 'lucide-react';
import ChatAssistant from './ChatAssistant';
import ProjectModal from './ProjectModal';
import { fetchPortfolioData } from '../services/api';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPortfolioData();
        setPortfolioData(data);
      } catch (error) {
        console.error('Error loading portfolio:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [portfolioData]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl mb-4">Failed to load portfolio data</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { bio, experience, projects, skills, testimonials } = portfolioData;

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {bio.name}
            </div>
            <div className="hidden md:flex items-center gap-8">
              {['hero', 'experience', 'projects', 'skills', 'testimonials', 'contact'].map((section) => (
                <button key={section} onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${activeSection === section ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
                  {section}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a href={bio.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Github size={20} />
              </a>
              <a href={bio.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${bio.email}`} className="text-gray-400 hover:text-white transition">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-cyan-900/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
        }}></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm mb-6 animate-fade-in">
              {bio.availability}
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                {bio.name}
              </span>
            </h1>
            <h2 className="text-3xl md:text-4xl text-gray-300 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {bio.title}
            </h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {bio.summary}
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <button onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2">
                View Projects
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="/resume.pdf" download className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition flex items-center gap-2">
                <Download size={20} />
                Download Resume
              </a>
              <button onClick={() => scrollToSection('contact')} className="px-8 py-4 border-2 border-purple-500 hover:bg-purple-500/10 rounded-lg font-semibold transition">
                Get in Touch
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-transparent rounded-full"></div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm mb-4">
              <Briefcase size={16} />
              <span>Career Journey</span>
            </div>
            <h2 className="text-5xl font-bold mb-4">Work Experience</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Building innovative solutions and leading teams to success
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500"></div>
            {experience.map((exp, index) => (
              <div key={exp.id} className={`relative mb-16 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'}`}>
                <div className={`flex items-center gap-4 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center border-4 border-gray-950">
                    <Briefcase size={24} />
                  </div>
                  <div className="flex-1 bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all hover:transform hover:scale-[1.02]">
                    <div className="text-purple-400 text-sm font-semibold mb-2">{exp.period}</div>
                    <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                    <div className="text-cyan-400 font-semibold mb-4">{exp.company}</div>
                    <p className="text-gray-400 mb-4">{exp.description}</p>
                    <div className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <ChevronRight size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm border border-purple-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-32 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-sm mb-4">
              <Code size={16} />
              <span>Featured Work</span>
            </div>
            <h2 className="text-5xl font-bold mb-4">Projects</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Transforming data into a meaningful production-ready applications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {projects.map((project) => (
    <div key={project.id}
      className="group bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all hover:transform hover:scale-[1.03] cursor-pointer"
      onClick={() => setSelectedProject(project)}>
      <div className="relative h-48 bg-gradient-to-br from-purple-900/50 to-cyan-900/50 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-6xl opacity-20"><svg>...</svg></div>';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600 rounded-full text-xs font-semibold">
          {project.tech[0]}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.shortDesc}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
        <button className="w-full py-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 hover:from-purple-600/30 hover:to-cyan-600/30 border border-purple-500/30 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2">
          Know More
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-300 text-sm mb-4">
              <Award size={16} />
              <span>Technical Expertise</span>
            </div>
            <h2 className="text-5xl font-bold mb-4">Tech Stack</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive skill set for building modern applications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8 hover:border-pink-500/50 transition">
                <h3 className="text-xl font-bold mb-6 capitalize bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {category.replace('_', ' & ')}
                </h3>
                <div className="space-y-3">
                  {skillList.map((skill) => (
                    <div key={skill} className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-32 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4">Testimonials</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              What colleagues and clients say about working with me
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition">
                <div className="text-purple-400 text-5xl mb-4">"</div>
                <p className="text-gray-300 mb-6 italic">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl text-gray-400 mb-12">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <a href={`mailto:${bio.email}`}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-all transform hover:scale-105">
              <Mail size={20} />
              Send Email
            </a>
            <a href={bio.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition">
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a href={bio.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition">
              <Github size={20} />
              GitHub
            </a>
          </div>
          <div className="text-gray-500 text-sm">
            <p>{bio.location}</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          <p>© 2026 {bio.name}. Built with React, FastAPI, and Groq AI.</p>
        </div>
      </footer>

      <ChatAssistant />
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Portfolio;