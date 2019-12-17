import { CoordinateType, MapActionTypes } from '../../actions/map';

interface MapStateType {
    center: CoordinateType
}

const initialState: MapStateType = {
    center: [60, 30.2]
}

const mapReducer = (state = initialState, action: MapActionTypes) => {
    switch (action.type) {
        case 'SET_MAP_SENTER':
            return {
                ...state,
                center: action.payload
            }
        default:
            return state
    }
}

export default mapReducer;
