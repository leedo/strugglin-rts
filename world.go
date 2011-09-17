package strugglin

import "rand"
import "json"

type World struct {
  origin*Cell
  Players map[string] *Player
}

func NewWorld() * World {
  return &World{NewCell(0,0),make(map[string]*Player)}
}

func (this * World) PlayerState(name string) string {
  _,found := this.Players[name]
  if !found {
    this.AddPlayer(name) 
  }
  marshaled, err := json.Marshal(this.Players[name])
  if err!=nil {
    panic(err)
  }
  return string(marshaled)
}


func (this * World) SpawnLocation() * Cell {
  cell := this.origin
  for;cell.Occupied(); {
    cell = cell.Neighbor(rand.Int31n(2)-1,rand.Int31n(2)-1)
  }
  return cell
}

func (this *World) AddPlayer(name string) {
  this.Players[name] = NewPlayer(name,this.SpawnLocation())
}