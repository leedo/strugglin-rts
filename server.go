package strugglin

import  "http"
import  "io"
import  "log"


func StartServer (port int, world *World) {
  http.HandleFunc("/state", func (w http.ResponseWriter, req *http.Request) {
    io.WriteString(w, world.ToJson())
  })
  err := http.ListenAndServe(":12345", nil)
  if err != nil {
		log.Fatal("ListenAndServe: ", err.String())
	}
}