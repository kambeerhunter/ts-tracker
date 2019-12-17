import { CoordinateType } from './map';

export const ADD_DOT = 'ADD_DOT'
export const REMOVE_DOT = 'REMOVE_DOT'
export const REORDER_DOTS = 'REORDER_DOTS'
export const UPDATE_DOT = 'UPDATE_DOT'

export interface DotType {
  id: number
  title: string
  coordinates: CoordinateType
}

interface IReorderIndexes {
    source: number
    destination: number
}

interface IAddDotAction {
  type: typeof ADD_DOT
  payload: DotType
}

interface IUpdateDotAction {
  type: typeof UPDATE_DOT
  payload: DotType
}

interface IRemoveDotAction {
  type: typeof REMOVE_DOT
  payload: number
}

interface ReorderDotsAction {
  type: typeof REORDER_DOTS
  payload: IReorderIndexes
}

export type DotActionTypes = IAddDotAction | IRemoveDotAction | ReorderDotsAction | IUpdateDotAction

export const addDot = (item: DotType) => ({
  type: ADD_DOT,
  payload: item
})

export const reorderDots = ({ source, destination }: IReorderIndexes) => ({
  type: REORDER_DOTS,
  payload: {
    source,
    destination
  }
})

export const updateDot = (item: DotType) => ({
  type: UPDATE_DOT,
  payload: item
})
