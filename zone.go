package stryfe

type Zone struct {
	name string
	grid [][]*Cell
}

func NewZone(name string, x, y int) * Zone{
	zone := &Zone{name, make([][]*Cell, x)}
	for i := 0; i < x; i++ {
		zone.grid[i] = make([]*Cell, y)
		for j := 0; j < y; j++ {
			zone.grid[i][j] = NewCell(i, j, zone)
		}
	}
	return zone
}

func (this *Zone) Path(from, to *Cell) <- chan *Cell{
	c := make(chan *Cell)
	queue := 
	go func (){
		
	}()
	return c
}

func (this *Zone) ValidLocation(x, y int) bool {
	if x >= 0 && y>= 0 {
		return len(this.grid) > x && len(this.grid[x]) > y	
	} 
	return false
}