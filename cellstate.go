package stryfe

import "rand"

const (
	PLAINS = iota
	RIVERS
	SEAS
	MOUNTAINS
	DESERT
	FORREST
)


type CellState struct {
	Terrain int32
}

func NewCellState() * CellState {
	return &CellState{rand.Int31n(6)}
}

func (this *CellState) Passible(player *Player) bool {
	switch this.Terrain {
	case SEAS,MOUNTAINS,RIVERS:
		return false
	default:
		return true
	}
	return true
}

