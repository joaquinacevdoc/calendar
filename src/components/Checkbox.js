import React from 'react';
import {firebase} from '../firebase';
import { FaCheck } from 'react-icons/fa'

export const Checkbox = ({id}) => {
  const archiveTask = () => {
    firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .update({
        archived: true,
      });
  };

  const deleteTask = docId => {
    firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .delete()
  };

  return (
    <button
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => setTimeout(deleteTask, 150)}
    >
      <div className="checkbox">
        <FaCheck />
      </div>
    </button>
  );

};
