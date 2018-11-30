package main

import (
	"log"
	"os/exec"
)

func Zip(jobid string) {
	cmd := exec.Command("zip",
		"-r", "deliver",
		"deliver")

	cmd.Dir = "uploads/" + jobid

	_, err := cmd.Output()
	if err != nil {
		log.Fatal(err)
	}

	log.Print("finished compression")
}
