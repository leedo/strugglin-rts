package strugglin


type Cell struct {
  X int64
  Y int64
  state interface {}
}

func NewCell(x, y int64, state interface{}) * Cell {
  return &Cell{x,y,state}
}