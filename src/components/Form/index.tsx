import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { addDot } from '../../actions/form';
import { CoordinateType } from '../../actions/map';

const Form: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const selectMapCenter = (state: RootState): CoordinateType => state.map.center;
  const center = useSelector(selectMapCenter);
  const dispatch = useDispatch();

  const submitHandler = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const title = inputRef.current!.value;
    if (!title) {
      setError('Требуется указать наименование точки');
      return
    }
    dispatch(addDot({
      id: new Date().getTime(),
      title,
      coordinates: center
    }));
    setError(null);
    inputRef.current!.value = '';
  }, [dispatch, center]);

  return (
    <>
      <form
        onSubmit={submitHandler}
      >
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Новая точка маршрута"
            ref={inputRef}
          />
        </div>
      </form>
      {error && (
        <h4 className='text-danger'>
          {error}
        </h4>
      )}
    </>
  );
}

export default Form;
