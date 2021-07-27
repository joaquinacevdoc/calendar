import React, {useState} from 'react';
import { useSelectedProjectValue, useProjectsValue} from '../context';
import { IndividualProject } from './IndividualProject';

export const Projects = ({ showSide, setShowSide, active, setActive }) => {
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    projects &&
    projects.map(project => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        data-testid="project-action"
        className={
          active === project.projectId
          ? 'active sidebar__project'
          : 'sidebar__project'
        }
      >
        <div
          className="project-button"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive(project.projectId);
              setSelectedProject(project.projectId);
              var width = $(window).width();
              if (width < 800) {
                document.getElementById("sidebar").style.left = "-290px";
                document.getElementById("tasks").style.padding = "80px 40px 80px calc(10%)";
                document.getElementById("fullscreen-container_tasks").style.visibility="hidden";
                document.getElementById("fullscreen-container_tasks").style.opacity="0";
                setShowSide(false);
              }
            }
          }}
          onClick = {() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
            var width = $(window).width();
            if (width < 800) {
              document.getElementById("sidebar").style.left = "-290px";
              document.getElementById("tasks").style.padding = "80px 40px 80px calc(10%)";
              document.getElementById("fullscreen-container_tasks").style.visibility="hidden";
              document.getElementById("fullscreen-container_tasks").style.opacity="0";
              setShowSide(false);
            }
          }}
        >
          <IndividualProject project={project}/>
        </div>
      </li>
    ))
  );
};
