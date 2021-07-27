import React, {useState} from 'react';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context';

export const App = ({darkModeDefault = false}) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);
  const [showSide, setShowSide] = useState(true);

  // Decide wheter siderbar is shown or not

  function side() {
    var width = $(window).width();

    if (width < 900) {
      document.getElementById("sidebar").style.left = "-290px";
      document.getElementById("tasks").style.padding = "80px 40px 80px calc(10%)";
      setShowSide(false);
    }
  }

  window.onload = side;

  jQuery(window).resize(function(f){
    var width = $(window).width();

    if (width < 900) {
      document.getElementById("sidebar").style.left = "-290px";
      document.getElementById("tasks").style.padding = "80px 40px 80px calc(10%)";
      document.getElementById("fullscreen-container_tasks").style.visibility="hidden";
      document.getElementById("fullscreen-container_tasks").style.opacity="0";
      setShowSide(false)
    }
    else if(width >= 900) {
      document.getElementById("sidebar").style.boxShadow = "none";
      document.getElementById("sidebar").style.left = "0px";
      document.getElementById("tasks").style.padding = "80px 40px 80px calc(26%)";
      document.getElementById("fullscreen-container_tasks").style.visibility="hidden";
      document.getElementById("fullscreen-container_tasks").style.opacity="0";
      setShowSide(true);
    }
  });

  return (
  <SelectedProjectProvider>
    <ProjectsProvider>
      <main
        data-testid="application"
        className={darkMode ? 'darkmode' : undefined}
      >
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          showSide={showSide}
          setShowSide={setShowSide}
        />
        <Content
          showSide={showSide}
          setShowSide={setShowSide}
        />
      </main>
    </ProjectsProvider>
  </SelectedProjectProvider>);
};
