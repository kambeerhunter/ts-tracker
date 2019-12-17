import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateDot } from '../../actions/form';
import { DotType } from '../../actions/form';
import { Placemark } from 'react-yandex-maps';

interface IProps {
  dot: DotType
}

const PlacemarkItem: React.FC<IProps> = ({ dot }) => {
  const dispatch = useDispatch();

  const dragEndHandler = useCallback((e: any) => {
    dispatch(updateDot({
      id: dot.id,
      title: dot.title,
      coordinates: e.get('target').geometry.getCoordinates()
    }))
  }, [dispatch, dot])

  const placemarkOptions = {
    draggable: true
  };
  const modules = ['geoObject.addon.balloon', 'geoObject.addon.hint']
  const baloon = {
    balloonContent: dot.title,
  }

  return (
    <Placemark
      key={dot.id}
      geometry={dot.coordinates}
      modules={modules}
      properties={baloon}
      options={placemarkOptions}
      onDragEnd={dragEndHandler}
    />
  )
};

export default PlacemarkItem;
