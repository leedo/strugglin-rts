package strugglin

import "rand"
import "fmt"
import "drw/json"
import "bytes"


type World struct {
  grid [][]*Cell
  Players map[string] *Player
  size int64;
}

func NewWorld(size int64) * World {
  world := &World{make([][]*Cell, size),make(map[string] *Player), size}
  for i := int64(0);i<size;i++ {
    world.grid[i] = make([]*Cell,size)
    for j := int64(0);j<size;j++ {
      world.grid[i][j] = NewCell(i,j,nil)
    }
  }
  return world
}

func (this * World) ToJson() string {
  object := make(map[string] interface{})
  object["size"] = this.size
  object["players"] = make([]interface{}, len(this.Players))
  i := 0
  for _,player := range this.Players {
    object["players"].([]interface{})[i] = player.Serialize()
    i++
  }
  buffer :=  bytes.NewBufferString("")
  json.Dumps(object,buffer)
  return buffer.String()
}


func (this * World) SpawnLocation() * Cell {
  x := rand.Int63n(this.size)
  y := rand.Int63n(this.size)
  for i := x;i<this.size;i++{
    for j := y;j<this.size;j++ {
      free := true
      for _,player := range this.Players {
        if (player.Location.X == i && player.Location.Y == j) {
          free = false;
          break
        }
      }
      if free {
        return this.grid[i][j]
      }
    }
  }
  panic(fmt.Errorf("Could not find a location for the player!\n"))
}

func (this *World) AddPlayer(name string) {
  this.Players[name] = NewPlayer(name,this.SpawnLocation())
}