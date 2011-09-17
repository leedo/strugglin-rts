package strugglin

import "math"
import "fmt"



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


func Abs(n int32) int32{
  if n < 0 { 
     return -n 
  } 
  return n
}

func (*Cell) Offset(this, other int32) int32 {
  if this == other {
    return 0
  } else if this > other {
    return -1
  } 
  return 1
  
}
func (this *Cell) AddNeighbor(other *Cell) {
    x := this.Offset(this.X, other.X)
    y := this.Offset(this.Y, other.Y)
    _,found := this.neighbors[x]
    if !found {
      this.neighbors[x] = make(map[int32] *Cell)
    } 
    this.neighbors[x][y] = other
}

func (this *Cell) notifyNeighors(cell * Cell) {
  for _,xplane := range this.neighbors {
    for _,neighbor := range xplane {
      if neighbor.Distance(cell)  < 2.0 {
        neighbor.AddNeighbor(cell)
      }
    }
  }
}

func (this *Cell) Distance(other * Cell) float64 {
 return math.Sqrt(math.Pow(float64(this.X - other.X),2) + math.Pow(float64(this.Y - other.Y),2))
}


func (this *Cell) Neighbor(x,y int32) *Cell {
  _,found := this.neighbors[x]
  if !found {
    this.neighbors[x] = make(map[int32] *Cell)
  }
  _,found = this.neighbors[x][y]
  if !found {
   cell := NewCell(this.X + x, this.Y + y)
   this.notifyNeighors(cell)
  }
  return this.neighbors[x][y]
}

