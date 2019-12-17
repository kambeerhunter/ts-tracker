import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DotType, REMOVE_DOT } from '../../actions/form';

interface DotItemProps {
  item: DotType,
}

const DotItem: React.FC<DotItemProps> = ({ item }) => {
  const {id, title} = item;
  const dispatch = useDispatch();

  const removeHandler = useCallback(() => {
    dispatch({ type: REMOVE_DOT, payload: id });
  }, [dispatch, id])

  const buttonStyles = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  return (
    <div
      className="border rounded mb-2 p-2 dot-item"
      style={buttonStyles}
    >
      <span>
        {title}
      </span>
      <button
        className="btn btn-danger"
        onClick={removeHandler}
      >
        <b>&times;</b>
      </button>
    </div>
  );
}

export default DotItem;
