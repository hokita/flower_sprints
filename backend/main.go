package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", HomeHandler).Methods(http.MethodGet)

	fmt.Println("Start Server")
	if err := http.ListenAndServe(":8081", r); err != nil {
		panic(err)
	}
}

// HomeHandler func
func HomeHandler(w http.ResponseWriter, r *http.Request) {
	task1 := Task{Done: true}
	task2 := Task{Done: false}
	task3 := Task{Done: false}
	sprint := Sprint{
		Deadline: time.Now().AddDate(0, 0, 5),
		Tasks:    Tasks{task1, task2, task3},
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	if err := json.NewEncoder(w).Encode(sprint); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
}

// Sprint struct
type Sprint struct {
	Deadline time.Time `json:"date"`
	Tasks    Tasks     `json:"tasks"`
}

// Tasks Array
type Tasks []Task

// Task struct
type Task struct {
	Done bool `json:"done"`
}
