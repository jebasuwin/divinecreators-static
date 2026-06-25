import { Link } from "react-router-dom";

const serviceTags = {
  "social-media-management": ["Content Planning", "Content Creation", "Post Scheduling"],
  "linkedin-personal-branding": ["LinkedIn Profile Optimization", "Content Strategy", "Thought Leadership Content"],
  "video-editing-short-form-content": ["Reels Editing", "Shorts Editing", "Motion Graphics"],
  "youtube-growth-support": ["Content Planning", "Thumbnail Design", "Channel Optimization"],
};

const ProjectCard = ({ project, image, index, reverse = false }) => {
  const tags = serviceTags[project.id] || ["Content Strategy"];

  return (
    <article className={`project-card reveal reveal-up ${reverse ? "project-card--reverse" : ""}`}>
      <Link to={project.link} className="project-card__link">
        <div className="project-card__media image-tilt">
          <img src={image} alt={project.title} loading="lazy" decoding="async" />
          <div className="project-card__overlay" />
          <span className="project-card__view-label">VIEW</span>
        </div>
        <div className="project-card__body">
          <span className="project-card__category">
            Solution {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__desc">{project.description}</p>
          <ul className="project-card__tags" aria-label="Services">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <span className="project-card__action">
            View solution <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
};

export default ProjectCard;
