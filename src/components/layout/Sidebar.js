import React, { useState } from 'react';
import { FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar, FaPlus } from 'react-icons/fa'
import { useSelectedProjectValue } from '../../context';
import { Projects } from '../Projects';
import { AddProject } from '../AddProject';
import { useTasks} from '../../hooks';

export const Sidebar = ({showSide, setShowSide}) => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);

  const {tasks} = useTasks("INBOX");
  let inboxTasks = 0;
  for (let i = 0; i < tasks.length; i++) {
    inboxTasks = inboxTasks + 1
  };

  return (
    <div className="sidebar" id="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          data-testid="inbox"
          className={active === 'inbox' ? 'active' : undefined}
          onClick={() => {
            setActive('inbox');
            setSelectedProject('INBOX');
            var width = $(window).width();
            if (width < 800) {
              document.getElementById("sidebar").style.left = "-290px";
              document.getElementById("tasks").style.padding = "80px 40px 80px calc(10%)";
              document.getElementById("fullscreen-container_tasks").style.visibility="hidden";
              document.getElementById("fullscreen-container_tasks").style.opacity="0";
              setShowSide(false);
            }
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive('inbox');
              setSelectedProject('INBOX');
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
        >
          <span className="first">
            <FaInbox />
          </span>
          <span>Inbox</span>
          <span>{inboxTasks}</span>
        </li>
        <li
          data-testid="today"
          className={active === 'today' ? 'active' : undefined}
          onClick={() => {
            setActive('today');
            setSelectedProject('TODAY');
            var width = $(window).width();
            if (width < 800) {
              document.getElementById("sidebar").style.left = "-290px";
              document.getElementById("tasks").style.padding = "80px 40px 80px calc(10%)";
              document.getElementById("fullscreen-container_tasks").style.visibility="hidden";
              document.getElementById("fullscreen-container_tasks").style.opacity="0";
              setShowSide(false);
            }
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive('today');
              setSelectedProject('TODAY');
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
        >
          <span className="second">
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li
          data-testid="next_7"
          className={active === 'next_7' ? 'active' : undefined}
          onClick={() => {
            setActive('next_7');
            setSelectedProject('NEXT_7');
            var width = $(window).width();
            if (width < 800) {
              document.getElementById("sidebar").style.left = "-290px";
              document.getElementById("tasks").style.padding = "80px 40px 80px calc(10%)";
              document.getElementById("fullscreen-container_tasks").style.visibility="hidden";
              document.getElementById("fullscreen-container_tasks").style.opacity="0";
              setShowSide(false);
            }
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive('next_7');
              setSelectedProject('NEXT_7');
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
        >
          <span className="third">
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 Days</span>
        </li>
      </ul>

      <div className="sidebar__middle">
        <div
          className="sidebar__middle__title"
          id="toggler"
          onClick={() => {
            setShowProjects(!showProjects);
          }}
        >
          <span>
            <FaChevronDown
              className={!showProjects ? 'hidden-projects' : undefined}
            />
          </span>
          <h2>Projects</h2>
        </div>
        <AddProject />
      </div>

      <ul
        className="sidebar__projects"
        id="toggle"
      >
        <Projects
          showSide={showSide}
          setShowSide={setShowSide}
          active={active}
          setActive={setActive}
        />
      </ul>

    </div>
  );
};
