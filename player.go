package strugglin


type Player struct {
  Name  string 
  // Color string 
  ObtaniumCount int64
  Location *Cell
}

func NewPlayer(name string, location *Cell) * Player{
  return &Player{name,0,location}
}

func (this * Player) Serialize() interface{} {
    player := make(map[string] interface{})
    player["x"] = this.Location.X
    player["y"] = this.Location.Y
    player["name"] = this.Name
    return player
}