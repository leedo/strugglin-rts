package stryfe

import "os"
import "fmt"

type World struct {
	zones   map[string]*Zone
	players map[string]*Player
}

func NewWorld() *World {
	world := &World{make(map[string]*Zone), make(map[string]*Player)}
	world.zones["highlands"] = NewZone("Highlands", 250, 250)
	return world
}

func (this *World) SpawnLocation() *Cell {
	return this.zones["highlands"].grid[175][175]
}

func (this *World) SpawnPlayer(name string) (*Player, os.Error) {
	if _, found := this.players[name]; found {
		return nil, fmt.Errorf("Someone has chosen [%s] already!", name)
	}
	return NewPlayer(name, this.SpawnLocation()), nil
}

func (this *World) Player(name string) (*Player, os.Error) {
	if player, found := this.players[name]; found {
		return player,nil
	}
	return nil, fmt.Errorf("Player [%s] does not exist", name)
}
