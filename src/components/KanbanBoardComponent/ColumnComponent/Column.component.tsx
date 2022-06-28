import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ListItem } from '../ListItemComponent/ListItem.component';
import './Column.css';

interface ColumnProps {
  col: {
    id: string;
    list: string[];
  };
}

export const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  return (
    <Droppable droppableId={id}>
      {provided => (
        <div className="column">
          <h2>{id}</h2>
          <div
            className="list"
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {list.map((text, index) => (
              <ListItem key={text} text={text} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};
