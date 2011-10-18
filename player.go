package stryfe

import "time"

type Player struct {
	name     string
	obtanium int
	location *Cell
}

func NewPlayer(name string, location *Cell) *Player {
	return &Player{name, 500, location}
}

func (this *Player) Move(to *Cell) {
	path := this.location.zone.Path(this.location, to)
	go func (){
		for _,step := range path {
			this.location = step
			time.Sleep(100000000)
		}
	}()
}

func (this *Player) State() string {
	return ""
}