import React, { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Column } from './ColumnComponent/Column.component';
import { ApiClientService } from '../../services/ApiClientService';
import { useKanban } from '../../hooks/use-kanban';
import { useBranch } from '../../hooks/use-branch';
import { useRepo } from '../../hooks/use-repo';

import './KanbanBoard.css';
import { useDispatch } from 'react-redux';
import {
  setKanban,
  updateOneColumn,
  updateTwoColumns,
} from '../../redux/kanban/actions';

export const KanbanBoard: React.FC = () => {
  const { branch } = useBranch();
  const { repo } = useRepo();

  console.log('<KanbanBoard> current branch: ', branch);
  console.log('<KanbanBoard> current repo: ', repo);

  const { kanban } = useKanban();
  const dispatch = useDispatch();

  const kanban_board_id =
    repo &&
    branch &&
    `{${repo.owner.login}:slash:${repo.name}:slash:${branch}}`;

  useEffect(() => {
    kanban_board_id &&
      ApiClientService.getKanbanBoard(kanban_board_id).then(data => {
        dispatch(setKanban(data.board));
      });
    console.log('Kanban Board: getting board');
  }, [branch]);

  useEffect(() => {
    kanban_board_id &&
      ApiClientService.updateKanbanBoard(kanban_board_id, kanban);
    console.log('Kanban Board: updating board');
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
        //eslint-disable-next-line
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
        // eslint-disable-next-line
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

  console.log('LA BRANCA', branch);

  return (
    <>
      {kanban && (
        <DragDropContext onDragEnd={onDragEnd}>
          <h1 className="kanban-repo-name">
            {branch.charAt(0).toUpperCase() + branch.slice(1, branch.length)}{' '}
            {branch === 'workspace' ? '' : 'branch'} collaboration board
          </h1>
          <div className="columns-cont">
            {Object.keys(kanban)
              .sort()
              .reverse()
              .map(col => {
                return <Column col={kanban[col]} key={kanban[col].id} />;
              })}
          </div>
        </DragDropContext>
      )}
    </>
  );
};
