import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { deleteTask, updateTask } from '../../../redux/kanban/actions';
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
  column: string;
}

export const ListItem: React.FC<ItemProps> = ({ task, index, column }) => {
  const dispatch = useDispatch();
  const handleEdit = () => {
    const taskBody = {
      creator: 'edited',
      title: 'edited',
      body: 'edited',
    };
    dispatch(updateTask(taskBody, column, index));
  };
  console.log('TASK', task);
  return (
    <Draggable draggableId={task.timestamp} index={index}>
      {provided => (
        <div
          className="item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <button
            className="item-delete"
            onClick={() => dispatch(deleteTask(column, index))}>
            <RiDeleteBin6Line />
          </button>
          <button className="item-edit" onClick={handleEdit}>
            <FiEdit />
          </button>
          <h3 className="item-title">{task.title}</h3>
          <div className="item-body">{task.body}</div>
          <div className="creator-time">
            <p className="item-creator">
              {task.creator.split('').slice(0, 1).join(' ').toUpperCase()}
            </p>
            {/* <p className="item-timestamp">{task.timestamp.toLocaleString()}</p> */}
          </div>
        </div>
      )}
    </Draggable>
  );
};
