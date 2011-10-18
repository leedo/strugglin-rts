package stryfe

import "http"
import "io"
import "io/ioutil"
import "log"

func StartServer(listen string, world *World) {

	http.HandleFunc("/state", func(w http.ResponseWriter, req *http.Request) {
		player, err := world.Player(req.URL.Query()["player"][0])
		if err != nil {
			panic(err)
		}
		io.WriteString(w, player.State())
	})

	http.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		index, _ := ioutil.ReadFile("public/index.html")
		io.WriteString(w, string(index))
	})

	http.Handle("/static/", http.StripPrefix("/static", http.FileServer(http.Dir("./public"))))

	err := http.ListenAndServe(listen, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err.String())
	}
}
