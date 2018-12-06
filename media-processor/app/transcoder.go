package main

import (
	"bytes"
	"log"

	"os"
	"os/exec"
)

func ConvertToWebm(jobid string, filename string) (string, error) {
	makeDeliverDir(jobid)

	log.Print("Encoding ", filename, " to webm")

	outFname := "deliver/out.webm"
	cmd := exec.Command("ffmpeg",
		"-i", filename,
		"-c:v", "libvpx",
		"-crf", "10",
		"-b:v", "1M",
		"-c:a", "libvorbis",
		outFname)

	cmd.Dir = "uploads/" + jobid

	var outerr bytes.Buffer
	cmd.Stderr = &outerr

	//err := cmd.Run()
	//out, err := cmd.Output()
	_, err := cmd.Output()
	//fmt.Printf("%s\n", outerr.String())

	if err != nil {
		//return "", err
		log.Fatal(err)
	}
	//fmt.Printf("%s\n", out)
	log.Print("finished webm encode")
	return "hello", nil
}

func ConvertToMp4(jobid string, filename string) (string, error) {
	makeDeliverDir(jobid)
	log.Print("Encoding ", filename, " to mp4")
	outFname := "deliver/out.mp4"
	cmd := exec.Command("ffmpeg",
		"-i", filename,
		"-o", "mp4",
		"-vcodec", "libx264",
		"-preset", "fast",
		"-profile:v", "main",
		"-acodec", "aac",
		outFname)

	cmd.Dir = "uploads/" + jobid

	var outerr bytes.Buffer
	cmd.Stderr = &outerr

	//err := cmd.Run()
	//out, err := cmd.Output()
	_, err := cmd.Output()
	//fmt.Printf("%s\n", outerr.String())

	if err != nil {
		//return "", err
		log.Fatal(err)
	}
	//fmt.Printf("%s\n", out)
	log.Print("finished mp4 encode")

	return "hello", nil
}

func makeDeliverDir(jobid string) {
	//create deliver dir if it doesn't exist
	if _, err := os.Stat(deliverPath(jobid)); os.IsNotExist(err) {
		os.Mkdir(deliverPath(jobid), 0777)
	}
}

func deliverPath(jobid string) string {
	return "uploads/" + jobid + "/deliver"
}
