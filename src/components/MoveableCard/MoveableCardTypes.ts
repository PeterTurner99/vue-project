export type MoveableCardType = {
  resizeable: boolean
  measurement: 'pixels' | 'percent'
  header: string
  content: string
  left: number
  top: number
  width: number
  height: number
  id: number
}
