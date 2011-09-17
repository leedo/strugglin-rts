package main

import "strugglin"
import "fmt"


func main() {
  world := strugglin.NewWorld()
  world.AddPlayer("leedo")
  println(fmt.Sprintf("Leedo is in location [%v]:[%v]", world.Players["leedo"].Location.X,world.Players["leedo"].Location.Y))
  world.AddPlayer("lexus")
  println(fmt.Sprintf("Lexus is in location [%v]:[%v]", world.Players["lexus"].Location.X,world.Players["lexus"].Location.Y))
  world.AddPlayer("oops")
  println(fmt.Sprintf("oops is in location [%v]:[%v]", world.Players["oops"].Location.X,world.Players["oops"].Location.Y))
  world.AddPlayer("shiee")
  println(fmt.Sprintf("shiee is in location [%v]:[%v]", world.Players["shiee"].Location.X,world.Players["shiee"].Location.Y))
  world.AddPlayer("hashie")
  println(fmt.Sprintf("hashie is in location [%v]:[%v]", world.Players["hashie"].Location.X,world.Players["hashie"].Location.Y))
  world.AddPlayer("allo")
  println(fmt.Sprintf("allo is in location [%v]:[%v]", world.Players["allo"].Location.X,world.Players["allo"].Location.Y))
  world.AddPlayer("bye")
  println(fmt.Sprintf("bye is in location [%v]:[%v]", world.Players["bye"].Location.X,world.Players["bye"].Location.Y))
  strugglin.StartServer(":12345", world)
}
