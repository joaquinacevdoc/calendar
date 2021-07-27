// For checking lifecycle changes like: new project added
// We want to make sure our virtualDom, react components, etc. are updated
import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';

// Custom hooks
export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  // Firebase retrieves tasks from user
  useEffect(() => {
    let unsubscribe = firebase
    .firestore()
    .collection('tasks')
    .where('userId', '==', 'jllFXwyAL3tzHM');

    unsubscribe =
      // If project doesn't exist in collated tasks then (?) go find it with its ID
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        // If selected project is from today, find it with the date of today
        : selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where(
            'date',
            '==',
            moment().format('DD/MM/YYYY')
          ))
        : selectedProject === 'INBOX' || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('projectId', '==', 'INBOX'))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
        const newTasks = snapshot.docs.map(task => ({
          id: task.id,
          ...task.data(),
        }));

        setTasks(
          selectedProject === 'NEXT_7'
            ? newTasks.filter(
              task =>
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') >= 0 &&
                task.archived !== true
            )
            : newTasks.filter(task => task.archived !== true)
        );

        setArchivedTasks(newTasks.filter(task => task.archived !== false));
    });

    return () => unsubscribe();

  }, [selectedProject]);
  // This means that when "selectedProject" changes everything is run again.
  // So this is only run when there's a new selected project

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', 'jllFXwyAL3tzHM')
      .orderBy('projectId')
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          ...project.data(),
          docId: project.id,
        }));

        //double check that the projects have actually changed
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};

export const useColors = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('colors')
      .orderBy('colorId')
      .get()
      .then(snapshot => {
        const allColors = snapshot.docs.map(color => ({
          ...color.data(),
          docId: color.id,
        }));

        if (JSON.stringify(allColors) !== JSON.stringify(colors)) {
          setColors(allColors);
        }
      });
  }, [colors]);

  return { colors, setColors };
};
