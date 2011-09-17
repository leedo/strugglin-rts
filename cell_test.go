package strugglin

import "testing"

func compare(t *testing.T, expected, actual interface{}) {
	if expected != actual {
		t.Errorf("value differs. Expected [%v], actual [%v]", expected, actual)
	}
}


func TestDistnace(t *testing.T) {
  one := NewCell(0,0)
  other := NewCell(0,1)
  compare(t, one.Distance(other), 1.0)
  one = NewCell(-1,-1)
  other = NewCell(0,1)
  compare(t, one.Distance(other), 2.23606797749979)
  one = NewCell(1,1)
  other = NewCell(0,0)
  compare(t, one.Distance(other), 1.4142135623730951)
} 

func TestNeighbors(t *testing.T) {
   one := NewCell(0,0)
   zero_one := one.Neighbor(0,1)
   one_one := one.Neighbor(1,1)
   zero_two := zero_one.Neighbor(0,1)
   compare(t, zero_two,one_one.neighbors[-1][1])
}