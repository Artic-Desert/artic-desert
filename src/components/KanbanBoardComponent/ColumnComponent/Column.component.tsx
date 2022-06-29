import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { ListItem } from '../ListItemComponent/ListItem.component';
import { addTask } from '../../../redux/kanban/actions';
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
  const dispatch = useDispatch();
  const newTask = {
    creator: 'newTask',
    title: 'This is an example new task',
    body: 'You can delete this task and create you own!',
    timestamp: String(Math.floor(Math.random() * 100000000000)),
  };

  return (
    <Droppable droppableId={col.id}>
      {provided => (
        <div className="column">
          <div className="column-top-line">
            <h2 className="column-name">{col.id}</h2>
            <button
              className="column-add-button"
              onClick={() => dispatch(addTask(newTask, col))}>
              +
            </button>
          </div>
          <div
            className="list"
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {col.tasks.map((task, index) => {
              console.log(task, index);
              return (
                <ListItem
                  key={task.timestamp}
                  task={task}
                  index={index}
                  column={col.id}
                />
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
