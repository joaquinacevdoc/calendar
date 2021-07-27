import React, { useState } from 'react';
import { firebase } from '../firebase';
import { generatePushId } from '../helpers';
import { useProjectsValue } from '../context';
import { FaPlus } from 'react-icons/fa';
import { useColors } from '../hooks';

export const AddProject = ({ shouldShow = false }) => {
  const [projectName, setProjectName] = useState('');

  var dotColor = "808080";


  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue();
  const { colors } = useColors();

  const addProject = () =>
    projectName &&
    firebase
      .firestore()
      .collection('projects')
      .add({
        projectId,
        name: projectName,
        userId: 'jllFXwyAL3tzHM',
        colorCode: dotColor
      })
      .then(() => {
        setProjects([...projects]);
        setProjectName('');
      });

    function showAddProject() {
      document.getElementById("add-project").style.display = "flex";
      document.getElementById("add-project").style.opacity = "1";
      document.getElementById("fullscreen-container").style.display = "block";
    }

    function hideAddProject() {
      document.getElementById("add-project").style.display = "none";
      document.getElementById("add-project").style.opacity = "0";
      document.getElementById("fullscreen-container").style.display = "none";
    }

  return (
    <>
      <div
        className="sidebar__middle__addProject"
        onClick={() => showAddProject()}
      >
        <FaPlus />
      </div>
      <div id="fullscreen-container">
        <div id='add-project' data-testid="add-project">
            <div id="add-project__header">Add Project</div>
            <div id="add-project__input">
              <div id="add-project__input__container">
                <p>Name</p>
                <input
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  id="add-project__input__container__name"
                  data-testid="project-name"
                  type="text"
                  placeholder="Name your project"
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      dotColor = document.getElementById("add-project__input__container__color").value;
                      addProject();
                      hideAddProject();
                    }
                  }}
                  autoFocus
                  required
                />
                <p>Color</p>
                <select
                  id="add-project__input__container__color"
                  data-testid="project-color"
                  type="text"
                >
                {colors.map(color =>
                  <option value={color.colorCode}>
                    {color.name}
                  </option>
                )}
                </select>
              </div>
              <div id="add-project__input__buttons">
                <button
                  id="add-project__input__buttons__submit"
                  type="button"
                  onClick={() => {
                    dotColor = document.getElementById("add-project__input__container__color").value;
                    addProject();
                    hideAddProject();
                  }}
                  data-testid="add-project-submit"
                >
                  Add Project
                </button>
                <span
                  data-testid="hide-project-overlay"
                  id="add-project__input__buttons__cancel"
                  onClick={() => hideAddProject()}
                  onKeyDown={() => hideAddProject()}
                  role="button"
                  tabIndex={0}
                >
                  Cancel
                </span>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};
