import React from 'react';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';


export const Content = ({showSide, setShowSide}) => (
  <div className ="main_content">
    <Sidebar
      showSide={showSide}
      setShowSide={setShowSide}
    />
    <Tasks />
  </div>
)
