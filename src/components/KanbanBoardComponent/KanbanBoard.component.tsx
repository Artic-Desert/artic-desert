import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Column } from './ColumnComponent/Column.component';
import { ApiClientService } from '../../services/ApiClientService';
import './KanbanBoard.css';

const KANBAN_BOARD_ID = '{sebastianfdz:by:nanji:by:main}'; // will be changed to be dynamic
export const KanbanBoard: React.FC = () => {
  const initialColumns: { [index: string]: any } = {
    todo: {
      id: 'todo',
      tasks: [
        {
          creator: 'arod80',
          title: 'This is an example task',
          body: 'You can delete this task and create you own!',
          timestamp: '1656430001000',
        },
      ],
    },
    doing: {
      id: 'doing',
      tasks: [
        {
          creator: 'arod80',
          title: 'This is an example task',
          body: 'You can delete this task and create you own!',
          timestamp: '1656430001002',
        },
      ],
    },
    done: {
      id: 'done',
      tasks: [
        {
          creator: 'arod80',
          title: 'This is an example task',
          body: 'You can delete this task and create you own!',
          timestamp: '1656430001001',
        },
      ],
    },
  };

  const [columns, setColumns] = useState(initialColumns);

  // useEffect(() => {
  //   console.log('columns state: ', columns);

  //   fetch(
  //     `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/kanban/${KANBAN_BOARD_ID}`,
  //   )
  //     .then(res => res.json())
  //     .then(data => setColumns(data));
  // }, []);

  // useEffect(() => {
  //   ApiClientService.updateKanbanBoard(KANBAN_BOARD_ID, columns)
  //     .then(res => res.json())
  //     .then(data => console.log(data));
  // }, [columns]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log('source: ', source, ' destination: ', destination);
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return null;
    }

    // Set start and end variables
    console.log('columns: ', columns);
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      console.log('start: ', start, ' end: ', end);

      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.tasks.filter(
        (_: any, idx: number) => idx !== source.index,
      );

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.tasks[source.index]);
      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        tasks: newList,
      };

      // Update the state
      setColumns(state => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      console.log('start tasks: ', start.tasks);
      const newStartList = start.tasks.filter(
        (_: any, idx: number) => idx !== source.index,
      );
      console.log('new start tasks: ', newStartList);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        tasks: newStartList,
      };

      // Make a new end list array
      const newEndList = end.tasks;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.tasks[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        tasks: newEndList,
      };

      // Update the state
      setColumns(state => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="columns-cont">
        {Object.keys(columns).map(col => {
          console.log('COLS', columns[col]);
          console.log(col);
          return (
            <Column col={columns[col]} key={columns[col].id} />
            // <div style={{ color: 'white' }}>{columns.col.id}</div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
