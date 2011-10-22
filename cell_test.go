package stryfe

import "testing"
import "fmt"

func compare(t *testing.T, expected, actual interface{}) {
	if expected != actual {
		t.Errorf("value differs. Expected [%v], actual [%v]", expected, actual)
	}
}

func TestDistnace(t *testing.T) {
	zone := NewZone("zone", 20, 20)
	one := NewCell(0, 0, zone)
	other := NewCell(0, 1, zone)
	compare(t, one.Distance(other), 1.0)
	one = NewCell(-1, -1, zone)
	other = NewCell(0, 1, zone)
	compare(t, one.Distance(other), 2.23606797749979)
	one = NewCell(1, 1, zone)
	other = NewCell(0, 0, zone)
	compare(t, one.Distance(other), 1.4142135623730951)
}

func TestNeighbors(t *testing.T) {
	zone := NewZone("zone", 20, 20)
	one := NewCell(0, 0, zone)
	i := 0
	for neighbor := range one.Neighrbors() {
		fmt.Printf("Cell[%v,%v,%v]\n", neighbor.x,neighbor.y,neighbor.state.Terrain)
		i++
	}
	compare(t, 3, i)
}
