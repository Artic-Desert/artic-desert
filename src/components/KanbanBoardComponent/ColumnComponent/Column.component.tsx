import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ListItem } from '../ListItemComponent/ListItem.component';
import './Column.css';

type Task = {
  creator: string;
  title: string;
  body: string;
  timestamp: string;
};

interface ColumnProps {
  col: {
    id: string;
    tasks: Task[];
  };
}

export const Column: React.FC<ColumnProps> = ({ col }) => {
  console.log('col:', col.tasks);
  return (
    <Droppable droppableId={col.id}>
      {provided => (
        <div className="column">
          <h2>{col.id}</h2>
          <div
            className="list"
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {col.tasks.map((task, index) => {
              console.log(task, index);
              return (
                <ListItem key={task.timestamp} task={task} index={index} />
                // <></>
              );
            })}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};
