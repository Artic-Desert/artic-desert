import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './ListItem.css';

interface ItemProps {
  text: string;
  index: number;
}

export const ListItem: React.FC<ItemProps> = ({ text, index }) => {
  return (
    <Draggable draggableId={text} index={index}>
      {provided => (
        <div
          className="item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          {text}
        </div>
      )}
    </Draggable>
  );
};
