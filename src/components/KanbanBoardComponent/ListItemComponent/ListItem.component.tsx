import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { deleteTask, updateTask } from '../../../redux/kanban/actions';
import { GithubApiService } from '../../../services/GithubApiService';
import { useUser } from '../../../hooks/use-user';
import { Task } from '../../../types/Types';
import './ListItem.css';

interface ItemProps {
  task: Task;
  index: number;
  column: string;
}

export const ListItem: React.FC<ItemProps> = ({ task, index, column }) => {
  const { user } = useUser();

  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();
  const handleEdit = () => {
    setEditing(task.creator === user.login);
    const taskBody = editing
      ? {
          creator: user.username,
          title: 'edited',
          body: 'edited',
          timestamp: Date.now(),
        }
      : task;
    dispatch(updateTask(taskBody, column, index));
  };
  const date = new Date(Number(task.timestamp)).toDateString();
  return (
    <Draggable draggableId={String(task.timestamp)} index={index}>
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
          <h3 contentEditable={editing} className="item-title">
            {task.title}
          </h3>
          <div className="item-body">{task.body}</div>
          <div className="creator-time">
            <img
              src={task.avatar_url}
              alt=""
              style={{ width: '25px', height: '25px', borderRadius: '50px' }}
            />
            {/* <p>{task.creator.split('').slice(0, 1).join(' ').toUpperCase()}</p> */}

            <p className="item-timestamp">{date}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};
