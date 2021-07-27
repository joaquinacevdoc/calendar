import React, {useState} from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import {firebase} from '../firebase';

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects} = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = docId => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject('INBOX');
      });
  };

  const archiveProject = () => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .update({
        archived: true,
      });
  };

  return (
    <div className="project-container">
      <span className="sidebar__project-dot" id={project.colorCode}>•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
      >
          <FaTrashAlt />
          {showConfirm && (
            <div className="project-delete-modal">
              <div className="project-delete-modal__inner">
                <p>Are you sure you want to delete this project?</p>
                <div className="project-delete-modal__inner__buttons">
                  <button
                    type="button"
                    onClick={() => deleteProject(project.docId)}
                  >
                    Delete
                  </button>
                  <span onClick={() => setShowConfirm(!showConfirm)}>Cancel</span>
                </div>
              </div>
            </div>
          )}
      </span>
    </div>
  );
};
