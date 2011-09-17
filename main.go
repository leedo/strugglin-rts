package main

import "strugglin"
import "fmt"


func main() {
  world := strugglin.NewWorld(int64(128))
  world.AddPlayer("leedo")
  println(fmt.Sprintf("Leedo is in location [%v]:[%v]", world.Players["leedo"].Location.X,world.Players["leedo"].Location.Y))
  world.AddPlayer("lexus")
  println(fmt.Sprintf("Lexus is in location [%v]:[%v]", world.Players["lexus"].Location.X,world.Players["lexus"].Location.Y))
  strugglin.StartServer(8000, world)
  
}
