export const SET_MAP_CENTER = 'SET_MAP_SENTER'

export type CoordinateType = number[]

interface SetMapCenterType {
  type: typeof SET_MAP_CENTER
  payload: CoordinateType
}

export type MapActionTypes = SetMapCenterType

export const setMapCenter = (coordinates: CoordinateType): SetMapCenterType => ({
    type: SET_MAP_CENTER,
    payload: coordinates
})
