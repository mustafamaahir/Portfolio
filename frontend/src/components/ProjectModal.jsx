import { useEffect } from 'react';
import { X, Github, Code } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center transition"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Project Header Image */}
        <div className="relative h-64 bg-gradient-to-br from-purple-900/50 to-cyan-900/50 overflow-hidden">
         {/* Show real image */}
        <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Title overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 text-center px-6">
            <div>
      <h2 className="text-4xl font-bold mb-2">{project.title}</h2>
      <p className="text-gray-300">{project.shortDesc}</p>
            </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>

          <div className="p-8">
            <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-sm mb-6">
              {project.highlights}
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">About This Project</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {project.fullDesc}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-950 border border-gray-800 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 rounded-lg font-medium text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-800">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  <Github size={20} />
                  View on GitHub
                </a>
              )}
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition"
              >
                Close
              </button>
            </div>

            <div className="mt-8 p-6 bg-gray-950 border border-gray-800 rounded-lg">
              <p className="text-gray-400 text-sm">
                <span className="text-purple-400 font-semibold">Note:</span> This is a showcase project. 
                For live demo access or more information, please get in touch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;