import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Column } from './ColumnComponent/Column.component';
import { ApiClientService } from '../../services/ApiClientService';
import { useKanban } from '../../hooks/use-kanban';

import './KanbanBoard.css';
import { useDispatch } from 'react-redux';
import { setKanban } from '../../redux/kanban/actions';

const KANBAN_BOARD_ID = '{sebastianfdz:by:nanji:by:main}'; // will be changed to be dynamic
export const KanbanBoard: React.FC = () => {
  const { kanban } = useKanban();
  const dispatch = useDispatch();

  const [columns, setColumns] = useState(kanban);

  useEffect(() => {
    ApiClientService.getKanbanBoard(KANBAN_BOARD_ID).then(data => {
      console.log('Initial get of kanban board: ', data),
        setColumns(data.board);
    });
  }, []);

  useEffect(() => {
    ApiClientService.updateKanbanBoard(KANBAN_BOARD_ID, columns).then(data =>
      console.log('Making an update to kanbanboard: ', data),
    );
  }, [columns]);

  const onDragEnd = ({ source, destination }: DropResult) => {
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
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
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
      setColumns((state: any) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.tasks.filter(
        (_: any, idx: number) => idx !== source.index,
      );

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
      setColumns((state: any) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  return (
    columns && (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns-cont">
          {Object.keys(columns).map(col => {
            console.log('columns: ', columns);
            console.log('col: ', col);
            console.log('columns[col]: ', columns[col]);
            return <Column col={columns[col]} key={columns[col].id} />;
          })}
        </div>
      </DragDropContext>
    )
  );
};
