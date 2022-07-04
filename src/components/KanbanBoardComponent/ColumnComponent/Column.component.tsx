import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { ListItem } from '../ListItemComponent/ListItem.component';
import { addTask } from '../../../redux/kanban/actions';
import { useUser } from '../../../hooks/use-user';
import { ColumnProps } from '../../../types/Types';
// import { useRepo } from '../../../hooks/use-repo.js';
import './Column.css';

export const Column: React.FC<ColumnProps> = ({ col }) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  // const { repo } = useRepo();

  const newTask = {
    new: true,
    creator: user.login,
    title: 'New task',
    body: 'Description',
    timestamp: Date.now(),
    avatar_url: user.avatar_url,
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
            {col.tasks &&
              col.tasks.map((task, index) => {
                return (
                  <ListItem
                    key={task.timestamp}
                    task={task}
                    index={index}
                    column={col.id}
                  />
                );
              })}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};
