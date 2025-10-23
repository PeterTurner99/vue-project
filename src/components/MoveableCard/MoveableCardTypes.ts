export type MoveableCardType = {
  resizeable: boolean
  measurement: 'pixels' | 'percent'
  header: string | HTMLElement
  content: string | HTMLElement
  left: number
  top: number
  width: number
  height: number
  id: number
}
