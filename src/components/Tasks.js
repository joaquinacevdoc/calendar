import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaRegCalendarAlt, FaRegListAlt } from 'react-icons/fa'
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { useTasks} from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = '';

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  if (
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  useEffect (() => {
    document.title = `${projectName}: ToDoList`;
  })

  return (
    <>
      <div id="fullscreen-container_tasks"></div>
      <div className='tasks' id="tasks" data-testid="tasks">
        <div className="task_header">
          <h2 data-testid="project-name">{projectName}</h2>
        </div>
        <div className="tasks__list">
          <ul>
            {tasks.map(task => (
              <li className="task-list" key={`${task.id}`}>
                <div className = "checkbox-task">
                  <Checkbox id={task.id} />
                  <span>{task.task}</span>
                </div>
                <div className="date-and-project">
                  {task.date &&
                    moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') >= 0 && (
                    <span className="task__list__date">
                      <FaRegCalendarAlt />
                      {moment(task.date, "DD/MM/YYYY").format('ddd. MMM DD')}
                    </span>
                  )}
                  {task.date &&
                    moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') < 0 && (
                    <span className="task__list__date__late">
                      <FaRegCalendarAlt />
                      {moment(task.date, "DD/MM/YYYY").format('ddd. MMM DD')}
                    </span>
                  )}
                  {task.projectId != selectedProject && (
                    <span className="task__list__project">
                      <FaRegListAlt />{task.projectTitle}
                    </span>
                  )}
                </div>
              </li>
              ))}
          </ul>

          <AddTask />

        </div>
      </div>
    </>
  );
};
