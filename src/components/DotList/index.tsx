import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { RootState } from '../../reducers';
import { DotType, reorderDots } from '../../actions/form';
import DotItem from '../DotItem';

const DotList: React.FC = () => {
  const selectDots = (state: RootState): Array<DotType> => state.form.dots;
  const items = useSelector(selectDots);
  const dispatch = useDispatch();

  const onDragEnd = useCallback((result) => {
    if (!result.destination) {
      return;
    }
    dispatch(reorderDots({
        source: result.source.index,
        destination: result.destination.index
    }));
  }, [dispatch]);

  return (
    <>
      {items && items.length > 0 && (
        <DragDropContext
          onDragEnd={onDragEnd}
        >
        <Droppable droppableId={'droppable'}>
            {(provided) => (
            <div
                {...provided.droppableProps}
                ref={provided.innerRef}
            >
                {items.map((item:DotType, index:number) => (
                <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                    {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <DotItem
                            key={`${item.id}-${item.title}`}
                            item={item}
                        />
                    </div>
                    )}
                </Draggable>
                ))}
                {provided.placeholder}
            </div>
            )}
        </Droppable>
        </DragDropContext>
      )}
      {(!items || !items.length) && (
        <p className="text-danger">
          Список точек пуст
        </p>
      )}
    </>
  );
}

export default DotList;
