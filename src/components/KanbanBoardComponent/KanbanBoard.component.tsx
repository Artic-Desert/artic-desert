import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Column } from './ColumnComponent/Column.component';
import { ApiClientService } from '../../services/ApiClientService';
import { useKanban } from '../../hooks/use-kanban';

import './KanbanBoard.css';
import { useDispatch } from 'react-redux';
import {
  setKanban,
  updateOneColumn,
  updateTwoColumns,
} from '../../redux/kanban/actions';

const KANBAN_BOARD_ID = '{sebastianfdz:by:nanji:by:main}'; // will be changed to be dynamic
export const KanbanBoard: React.FC = () => {
  const { kanban } = useKanban();
  const dispatch = useDispatch();
  const [currentBranch, setCurrentBranch] = useState(
    '{sebastianfdz:by:nanji:by:main}',
  );

  useEffect(() => {
    ApiClientService.getKanbanBoard(KANBAN_BOARD_ID).then(data => {
      console.log(' 8===========D~~~~~ Initial get of kanban board: ', data),
        dispatch(setKanban(data.board));
    });
  }, []);

  useEffect(() => {
    ApiClientService.updateKanbanBoard(KANBAN_BOARD_ID, kanban).then(data =>
      console.log('8===========D~~~~~ Making an update to kanbanboard: ', data),
    );
  }, [kanban]);

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
    const start = kanban[source.droppableId];
    const end = kanban[destination.droppableId];

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
      dispatch(updateOneColumn(newCol));
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
      dispatch(updateTwoColumns(newStartCol, newEndCol));
      return null;
    }
  };

  return (
    kanban && (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns-cont">
          {Object.keys(kanban)
            .sort()
            .reverse()
            .map(col => {
              return <Column col={kanban[col]} key={kanban[col].id} />;
            })}
        </div>
      </DragDropContext>
    )
  );
};
