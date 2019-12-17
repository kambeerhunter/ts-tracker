import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { setMapCenter, CoordinateType } from '../../actions/map';
import { DotType } from '../../actions/form';
import { YMaps, Map, Polyline } from 'react-yandex-maps';
import PlacemarkItem from './PlacemarkItem';


const MapBlock: React.FC = () => {
  const dispatch = useDispatch();
  const selectDots = (state: RootState): Array<DotType> => state.form.dots;
  const dots: DotType[] = useSelector(selectDots);
  const selectMapCenter = (state: RootState): CoordinateType => state.map.center;
  const center = useSelector(selectMapCenter);
  const polylinePath = dots.map(item => item.coordinates);

  const mapOnChange = useCallback((event: any) => {
    dispatch(setMapCenter(event.originalEvent.newCenter))
  }, [dispatch]);

  const defaultProps = {
    center,
    zoom: 6
  };

  const polylineOptions = {
    strokeColor: '#00FF00',
    strokeWidth: 5,
  };

  return (
    <div>
      <YMaps>
        <Map
          defaultState={defaultProps}
          width={'100%'}
          height={'90vh'}
          onBoundsChange={mapOnChange}
        >
          {dots.map(dot => (
            <PlacemarkItem
              key={dot.id}
              dot={dot}
            />
          ))}
          <Polyline
            geometry={polylinePath}
            options={polylineOptions}
          />
        </Map>
      </YMaps>
    </div>
  )
};

export default MapBlock;