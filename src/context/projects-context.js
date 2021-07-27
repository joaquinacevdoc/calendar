// Provides a way to pass data through the component tree without having to
// use props

import React, {createContext, useContext} from 'react';
import { useProjects } from '../hooks';

export const ProjectsContext = createContext ();
export const ProjectsProvider = ({children}) => {
  const { projects, setProjects } = useProjects();

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsValue = () => useContext(ProjectsContext);
