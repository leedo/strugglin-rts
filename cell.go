package stryfe

import "math"

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

func (this *Cell) Neighrbors() <- chan *Cell {
	c := make(chan *Cell,8)
	go func() {
		for i := -1 ;i < 2;i++ {
			for j := -1;j<2;j++ {
				if j == 0 && i == 0 {
					continue
				}
				if this.zone.ValidLocation(this.x+i, this.y+j) {
					c <- this.zone.grid[this.x+i][this.y+j]
				}
			}
		}
		close(c)
	}()
	return c
}


