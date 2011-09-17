package strugglin


type CellState struct {
  occupied bool
}

type Cell struct {
  X int32
  Y int32
  neighbors map[int32] map[int32]*Cell
  state *CellState
}

func NewCell(x, y int32) * Cell {
  this := &Cell{x,y,make(map[int32]map[int32]*Cell),&CellState{false}}
  this.neighbors[0] = make(map[int32] *Cell)
  this.neighbors[0][0] = this
  return this
}

func (this *Cell) Occupied() bool {
  return this.state.occupied
}

func (this *Cell) Neighbor(x,y int32) *Cell {
  _,found := this.neighbors[x]
  if !found {
    this.neighbors[x] = make(map[int32] *Cell)
  }
  _,found = this.neighbors[x][y]
  if !found {
   this.neighbors[x][y] = NewCell(this.X + x, this.Y + y)
  }
  return this.neighbors[x][y]
}

