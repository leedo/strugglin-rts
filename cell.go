package stryfe

import "math"


type CellState struct {

}

func NewCellState() * CellState{
	return new(CellState)
}

type Cell struct {
	x     int
	y     int
	state *CellState
	zone  *Zone
}

func NewCell(x, y int, zone *Zone) *Cell {
	return &Cell{x, y, NewCellState(), zone}
}


func (this *Cell) Distance(other * Cell) float64 {
 return math.Sqrt(math.Pow(float64(this.x - other.x),2) + math.Pow(float64(this.y - other.y),2))
}



