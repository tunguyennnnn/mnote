package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

// PORT 5000 http server
const PORT = 6000

func main() {
	http.HandleFunc("/upload", handleUpload)
	log.Printf("Server starting on port %v\n", PORT)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", PORT), nil))

}

func handleUpload(w http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodPost {
		return
	}
	file, header, err := req.FormFile("file")
	fmt.Println(header)
	if err != nil {
		log.Println(err)
		http.Error(w, "Error uploading file", http.StatusInternalServerError)
		return
	}
	defer file.Close()
	bs, err := ioutil.ReadAll(file)
	if err != nil {
		log.Println(err)
		http.Error(w, "Error uploading file", http.StatusInternalServerError)
	}
	s := string(bs)
	fmt.Println(s)
}
