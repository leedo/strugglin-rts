package strugglin


type Cell struct {
  x int64
  y int64
  state interface {}
}

type World struct {
  grid [][]*Cell 
}
