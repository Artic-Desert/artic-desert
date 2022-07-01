import React, { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { FiEdit, FiCheckSquare, FiTrash2 } from 'react-icons/fi';
import { deleteTask, updateTask } from '../../../redux/kanban/actions';
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
  const dispatch = useDispatch();
  const titleref = useRef<HTMLHeadingElement>(null);

  const [editing, setEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskBody, setTaskBody] = useState(task.body);

  const isEditable = user.login === task.creator || task.creator === 'default';

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    isEditable && setEditing(true);
  };

  useEffect(() => {
    if (task.new) {
      setEditing(true);
      task.new = false;
    }
  }, []);

  useEffect(() => {
    titleref.current && titleref.current.focus();
    const inputTitle = document.getElementById(
      String(task.timestamp) + 'title',
    );
    const inputBody = document.getElementById(String(task.timestamp) + 'body');
    inputTitle?.addEventListener('keypress', e => {
      e.key === 'Enter' &&
        document.getElementById(String(task.timestamp) + 'button')?.click();
    });
    inputBody?.addEventListener('keypress', e => {
      e.key === 'Enter' &&
        document.getElementById(String(task.timestamp) + 'button')?.click();
    });
  }, [editing]);

  const handleSubmitEdit = () => {
    const editedTask = {
      ...task,
      title: taskTitle,
      body: taskBody,
      timestamp: new Date(Date.now()).toLocaleString(),
    };
    dispatch(updateTask(editedTask, column, index));
    setEditing(false);
  };

  const handleTitleChange = (event: React.FormEvent<HTMLHeadingElement>) => {
    const input = event.target as HTMLElement;
    setTaskTitle(input.innerText);
  };

  const handleBodyChange = (event: React.FormEvent<HTMLDivElement>) => {
    const input = event.target as HTMLElement;
    setTaskBody(input.innerText);
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
          {isEditable && (
            <button
              name="delete"
              className={
                isEditable ? 'item-delete' : 'item-delete item-not-allowed'
              }
              onClick={() => isEditable && dispatch(deleteTask(column, index))}>
              <FiTrash2 />
            </button>
          )}
          {!editing && isEditable && (
            <button
              name="edit"
              className={
                isEditable ? 'item-edit' : 'item-edit item-not-allowed'
              }
              onClick={e => handleEdit(e)}>
              <FiEdit />
            </button>
          )}
          <div>
            {editing && isEditable && (
              <button
                name="submit"
                type="submit"
                id={task.timestamp + 'button'}
                className="item-edit"
                onClick={handleSubmitEdit}>
                <FiCheckSquare />
              </button>
            )}
            <h3
              id={String(task.timestamp) + 'title'}
              ref={titleref}
              contentEditable={editing}
              onInput={e => handleTitleChange(e)}
              className="item-title">
              {task.title}
            </h3>

            <div
              id={String(task.timestamp) + 'body'}
              contentEditable={editing}
              onInput={e => handleBodyChange(e)}
              className="item-body">
              {task.body}
            </div>
          </div>
          <div className="creator-time">
            <img
              src={task.avatar_url}
              alt=""
              style={{ width: '25px', height: '25px', borderRadius: '50px' }}
            />
            <p className="item-timestamp">{date}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};
