import React, {useState} from 'react';
import { FaMoon, FaSun, FaBars, FaHome } from 'react-icons/fa';
import { QuickAddTask } from '../QuickAddTask';

export const Header = ({ darkMode, setDarkMode, showSide, setShowSide }) => {
  const [shouldShowMain, setShouldShowMain] =useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return (
    <header className="header" data-testid="header">
    <nav>
      <div className="left-side">
        <ul>
          <li className="showSideBar">
            {showSide && (
              <button
                type="button"
                onClick= {() => {
                  document.getElementById("sidebar").style.left = "-290px";
                  document.getElementById("tasks").style.padding = "80px 40px 80px calc(10%)";
                  document.getElementById("fullscreen-container_tasks").style.visibility="hidden";
                  document.getElementById("fullscreen-container_tasks").style.opacity="0";
                  setShowSide(false);
                }}
              >
                <FaBars />
              </button>
            )}
            {!showSide && (
              <button
                type="button"
                onClick= {() => {
                  var width = $(window).width();

                  if (width > 800) {
                    document.getElementById("sidebar").style.left = "0px";
                    document.getElementById("sidebar").style.boxShadow="none"
                    document.getElementById("tasks").style.padding = "80px 40px 80px calc(26%)";
                    setShowSide(true);
                  }
                  else {
                    document.getElementById("sidebar").style.left = "0px";
                    document.getElementById("sidebar").style.boxShadow="rgba(0, 0, 0, 0.18) 3px 3px 10px"
                    document.getElementById("fullscreen-container_tasks").style.visibility="visible";
                    document.getElementById("fullscreen-container_tasks").style.opacity="0.3";
                    setShowSide(true);
                  }
                }}
              >
                <FaBars />
              </button>
            )}
          </li>
          <li className="logo">
            <FaHome />
          </li>
        </ul>
      </div>
      <div className="settings">
        <ul>
          <li data-testid="quick-add-task-action" className="settings__add">
            <button
              type="button"
              onClick={() => {
                setShowQuickAddTask(true);
                setShouldShowMain(true);
              }}
            >
              +
            </button>
          </li>
          <li
            data-testid="dark-mode-action"
            className="settings__darkmode"
          >
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
            >
              {!darkMode && (
                <FaMoon />
              )}
              {darkMode && (
                <FaSun />
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <QuickAddTask
      showAddTaskMain={false}
      shouldShowMain={shouldShowMain}
      showQuickAddTask={showQuickAddTask}
      setShowQuickAddTask={setShowQuickAddTask}
    />
  </header>
);
};
