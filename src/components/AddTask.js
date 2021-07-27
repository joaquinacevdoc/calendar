import React, {useState} from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../firebase';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';
import { useTasks} from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';


export const AddTask = ({
  shouldShowAddTask = true,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [date, setDate] = useState('Date');
  const [project, setProject] = useState('');
  const [projectName, setProjectName] = useState('');
  const [showAddTaskMain, setShowAddTaskMain] = useState('shouldShowAddTask');
  const [showMain, setShowMain] = useState(false);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let title = ''

  if (collatedTasksExist(selectedProject) && selectedProject) {
    title = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  if (
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    title = getTitle(projects, selectedProject).name;
  }

  const addTask = () => {
    let projectId = project || selectedProject;
    let collatedDate = '';

    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
      projectId = 'INBOX';
      title = 'Inbox';
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment()
        .add(7, 'days')
        .format('DD/MM/YYYY');
      projectId = 'INBOX';
      title = 'Inbox';
    }

    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          projectId,
          task,
          projectTitle: projectName || title,
          date: collatedDate || taskDate,
          userId: 'jllFXwyAL3tzHM'
        })
        .then(() => {
          setTask('');
          setProject('');
          setProjectName('');
          setDate('Date');
          setTaskDate('');
          setShowProjectOverlay(false);
          setShowTaskDate(false);
          setShowButton(true);
        })
      );
  };

  return(
    <div
      className='add-task'
      data-testid="add-task-comp"
    >
      {showAddTaskMain  && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => {
            setShowMain(!showMain);
            setShowAddTaskMain(!showAddTaskMain);
          }}
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add task</span>
        </div>
      )}

      {showMain && (
        <>
          <div
            className="add-task__main"
            data-testid="add-task-main"
          >
            <div className= "add-task__main__container">
              <input
                className="add-task__content"
                data-testid="add-task-content"
                type="text"
                value={task}
                autoComplete="off"
                placeholder="Enter your task here"
                onChange={e => setTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addTask();
                  }
                }}
                autoFocus
                required
              />
              <div className="spans">
                <button
                  className="add-task__date"
                  data-testid="show-task-date-overlay"
                  onClick={() => {
                    setShowTaskDate(!showTaskDate);
                    setShowProjectOverlay(false);
                    setShowButton(!showButton);
                  }}
                >
                  <FaRegCalendarAlt />
                  {date}
                </button>
                <TaskDate
                  setTaskDate={setTaskDate}
                  showTaskDate={showTaskDate}
                  setShowTaskDate={setShowTaskDate}
                  setDate={setDate}
                  showButton={showButton}
                  setShowButton={setShowButton}
                />
                {showButton &&
                  <button
                    className="add-task__project"
                    id="add-task__project"
                    data-testid="show-project-overlay"
                    onClick={() => {
                      setShowProjectOverlay(!showProjectOverlay);
                      setShowTaskDate(false);
                    }}
                  >
                    <FaRegListAlt /> <span>{projectName || title}</span>
                  </button>
                }
              </div>
            </div>
            <div className="add-task__main__buttons">
              <button
                type="button"
                className="add-task__submit"
                data-testid="add-task"
                onClick={() => {
                  addTask();
                }}
              >
                Add Task
              </button>
              <button
                className="add-task__cancel"
                data-testid="add-task-main-cancel"
                onClick={() => {
                  setShowMain(false);
                  setProject('');
                  setProjectName('');
                  setDate('Date');
                  setTaskDate('');
                  setShowProjectOverlay(false);
                  setShowTaskDate(false);
                  setShowAddTaskMain(true);
                  setShowButton(true);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
          <ProjectOverlay
            setProject={setProject}
            setProjectName={setProjectName}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />

        </>
      )}
    </div>
  );
};
