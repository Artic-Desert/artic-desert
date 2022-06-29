import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './ListItem.css';

type Task = {
  creator: string;
  title: string;
  body: string;
  timestamp: string;
};

interface ItemProps {
  task: Task;
  index: number;
}

export const ListItem: React.FC<ItemProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.timestamp} index={index}>
      {provided => (
        <div
          className="item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <button>X</button>
          <h3>{task.title}</h3>
          <div>{task.body}</div>
          <p>{task.creator}</p>
        </div>
      )}
    </Draggable>
  );
};
