import React, {useState} from 'react';
import { FaRegListAlt, FaRegCalendarAlt, FaTimes } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../firebase';
import { useSelectedProjectValue } from '../context';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';
import { useTasks} from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';

export const QuickAddTask = ({
  shouldShowAddTask = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [date, setDate] = useState('Date');
  const [project, setProject] = useState('');
  const [projectName, setProjectName] = useState('');
  const [showAddTaskMain, setShowAddTaskMain] = useState('shouldShowAddTask');
  const [showMain, setShowMain] = useState('shouldShowMain');
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const addTask = () => {
    const projectId = project || "INBOX";
    let collatedDate = '';

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
          projectTitle: projectName || "Inbox",
          date: collatedDate || taskDate,
          userId: 'jllFXwyAL3tzHM'
        })
        .then(() => {
          setTask('');
          setProject('');
          setProjectName('');
          setDate('Date');
          setTaskDate('');
          setShowQuickAddTask(false);
          setShowProjectOverlay(false);
          setShowTaskDate(false);
          setShowButton(true);
        })
      );
  };

  return(
    <>
    {showQuickAddTask && (
      <div
        className='add-task__overlay'
        data-testid="add-task-overlay"
      >
        <div
          className="quick-add-task"
          data-testid="quick-add-task"
        >
          <div className="header" onClick={() => {
            setShowProjectOverlay(false);
            setShowTaskDate(false);
            setShowButton(true);
          }}>
            <h2>Quick Add Task</h2>
            <button
              className="quick-add-task__cancel"
              data-testid="quick-add-task-cancel"
              onClick={() => {
                setShowMain(false);
                setProject('');
                setProjectName('');
                setDate('Date');
                setTaskDate('');
                setShowProjectOverlay(false);
                setShowTaskDate(false);
                setShowQuickAddTask(false);
                setShowButton(true);
              }}
            >
              <FaTimes />
            </button>
          </div>
          <div className= "quick-add-task__container">
            <input
              className="quick-add-task__content"
              data-testid="add-task-content"
              type="text"
              value={task}
              autoComplete="off"
              placeholder="Enter your task here"
              onChange={e => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTask();
                  setShowProjectOverlay(false);
                  setShowTaskDate(false);
                  setShowQuickAddTask(false);
                }
              }}
              autoFocus
              required
            />
            <div className="spans">
              <button
                className="quick-add-task__date"
                data-testid="show-task-date-overlay"
                onClick={() => {
                  setShowTaskDate(!showTaskDate);
                  setShowProjectOverlay(false);
                  setShowButton(!showButton);
                }}
              >
                <FaRegCalendarAlt /> {date}
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
                  className="quick-add-task__project"
                  id="quick-add-task__project"
                  data-testid="show-project-overlay"
                  onClick={() => {
                    setShowProjectOverlay(!showProjectOverlay);
                    setShowTaskDate(false);
                  }}
                >
                  <FaRegListAlt /> <span>{projectName}</span>
                </button>
              }
            </div>
          </div>
          <div className="quick-add-task__buttons">
            <button
              type="button"
              className="quick-add-task__submit"
              data-testid="quick-add-task"
              onClick={() => {
                addTask();
              }}
            >
              Add Task
            </button>
          </div>
          <ProjectOverlay
            setProject={setProject}
            setProjectName={setProjectName}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
        </div>
      </div>
    )}
    </>
  );
};
