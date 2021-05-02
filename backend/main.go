package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	dns := "host=db user=app dbname=flower_sprints password=password sslmode=disable"
	_, err := gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	r := mux.NewRouter()
	r.StrictSlash(true)
	r.HandleFunc("/", HomeHandler).Methods(http.MethodGet)
	r.HandleFunc("/sprints/", CreateSprintHandler).Methods(http.MethodPost)
	r.HandleFunc("/sprints/{sprint_id:[0-9]+}/tasks/{task_id:[0-9]+}/", UpdateTaskHandler).Methods(http.MethodPut, http.MethodOptions)

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

// CreateSprintHandler func
func CreateSprintHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Methods", "POST")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Max-Age", "3600")
		w.WriteHeader(http.StatusNoContent)
		return
	}
	w.WriteHeader(http.StatusOK)
}

// UpdateTaskHandler func
func UpdateTaskHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Methods", "PUT")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Max-Age", "3600")
		w.WriteHeader(http.StatusNoContent)
		return
	}
	w.WriteHeader(http.StatusOK)
}

// Sprint struct
type Sprint struct {
	Deadline time.Time `json:"deadline"`
	Tasks    Tasks     `json:"tasks"`
}

// Tasks Array
type Tasks []Task

// Task struct
type Task struct {
	Done bool `json:"done"`
}
