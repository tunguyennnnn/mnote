package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/satori/go.uuid"
)

// PORT 6000 http server
const PORT = 4001

func main() {
	http.HandleFunc("/upload", handleUpload)
	http.HandleFunc("/healthcheck", handleHealthCheck)
	log.Printf("Server starting on port %v\n", PORT)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", PORT), nil))
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func handleHealthCheck(w http.ResponseWriter, req *http.Request) {
	fmt.Fprint(w, "Hello World\n")
}

func handleUpload(w http.ResponseWriter, req *http.Request) {
	enableCors(&w)
	if req.Method != http.MethodPost {
		fmt.Println("Not a post")
		return
	}

	reader, err := req.MultipartReader()

	if err != nil {
		log.Println(err)
		http.Error(w, "Error uploading file", http.StatusInternalServerError)
		return
	}
	if _, err := os.Stat("upload"); os.IsNotExist(err) {
		os.Mkdir("uploads", 0777)
	}

	for {
		part, err := reader.NextPart()
		if err == io.EOF {
			break
		}
		fmt.Println("Filename is", part.FileName())
		if part.FileName() == "" {
			continue
		}

		myUUID, _ := uuid.NewV4()
		jobid := myUUID.String()
		os.Mkdir("uploads/"+jobid, 0777)

		dst, err := os.Create("uploads/" + jobid + "/" + part.FileName())
		defer dst.Close()

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if _, err := io.Copy(dst, part); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		c := make(chan bool)

		go func() {
			ConvertToWebm(jobid, part.FileName())
			c <- true
		}()

		// go func() {
		// 	ConvertToMp4(jobid, part.FileName())
		// 	c <- true
		// }()

		<-c
		<-c
		Zip(jobid)

	}
	// file, handler, err := req.FormFile("file")
	// fmt.Fprintf(w, "%v", handler.Header)
	// if err != nil {
	// 	log.Println(err)
	// 	http.Error(w, "Error uploading file", http.StatusInternalServerError)
	// 	return
	// }
	// defer file.Close()
	// bs, err := ioutil.ReadAll(file)
	// if err != nil {
	// 	log.Println(err)
	// 	http.Error(w, "Error uploading file", http.StatusInternalServerError)
	// }
	// fmt.Println("reachhhhhh")
	// fmt.Println(bs)
}
