package strugglin

import "rand"
import "drw/json"
import "bytes"
import "os"


type World struct {
  origin*Cell
  Players map[string] *Player
}

func NewWorld() * World {
  return &World{NewCell(0,0),make(map[string]*Player)}
}

func (this * World) ToJson() string {
  object := make(map[string] interface{})
  object["players"] = make([]interface{}, len(this.Players))
  i := 0
  for _,player := range this.Players {
    json.Dumps(player.Serialize(), os.Stdout)
    object["players"].([]interface{})[i] = player.Serialize()
    i++
  }
  buffer :=  bytes.NewBufferString("")
  json.Dumps(object,buffer)
  return buffer.String()
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