import React from 'react';
import { useProjectsValue } from '../context';
import { FaInbox } from 'react-icons/fa';

export const ProjectOverlay = ({setProject, setProjectName, showProjectOverlay, setShowProjectOverlay}) => {
  const { projects } = useProjectsValue();

  return (
    projects && showProjectOverlay && (
      <div className="project-overlay" id="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          <li
            key='INBOX'
            data-testid="project-overlay-action"
            onClick={() => {
              setProject('INBOX');
              setProjectName('Inbox');
              setShowProjectOverlay(false);
            }}
          >
            <FaInbox /> Inbox
          </li>
          {projects.map(project => (
            <li
              key={project.projectId}
              data-testid="project-overlay-action"
              onClick={() => {
                setProject(project.projectId);
                setProjectName(project.name);
                setShowProjectOverlay(false);
              }}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    )
  )
}
