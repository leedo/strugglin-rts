package main

import "stryfe"

func main() {
  world := stryfe.NewWorld()
  stryfe.StartServer(":12345", world)
}
