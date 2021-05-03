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
	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	r := mux.NewRouter()
	r.StrictSlash(true)
	r.Handle("/", &HomeHandler{db}).Methods(http.MethodGet)
	r.Handle("/sprints/", &CreateSprintHandler{db}).Methods(http.MethodPost)
	r.Handle("/sprints/{sprint_id:[0-9]+}/tasks/{task_id:[0-9]+}/", &UpdateTaskHandler{db}).Methods(http.MethodPut, http.MethodOptions)

	fmt.Println("Start Server")
	if err := http.ListenAndServe(":8081", r); err != nil {
		panic(err)
	}
}

// HomeHandler func
type HomeHandler struct {
	DB *gorm.DB
}

func (h *HomeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var sprint Sprint
	result := h.DB.Preload("Tasks").Where("deadline > ?", time.Now()).Last(&sprint)
	if result.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	if err := json.NewEncoder(w).Encode(sprint); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
}

// CreateSprintHandler func
type CreateSprintHandler struct {
	DB *gorm.DB
}

// CreateSprintHandler func
func (h *CreateSprintHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Methods", "POST")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Max-Age", "3600")
		w.WriteHeader(http.StatusNoContent)
		return
	}

	var params struct {
		Count    int    `json:"count"`
		Deadline string `json:"deadline"`
	}

	if err := json.NewDecoder(r.Body).Decode(&params); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	jst, _ := time.LoadLocation("Asia/Tokyo")
	deadline, err := time.ParseInLocation("2006-01-02", params.Deadline, jst)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var tasks Tasks
	for i := 0; i < params.Count; i++ {
		tasks = append(tasks, Task{Done: false})
	}
	sprint := Sprint{
		Deadline: deadline,
		Tasks:    tasks,
	}
	result := h.DB.Create(&sprint)
	if result.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// UpdateTaskHandler func
type UpdateTaskHandler struct {
	DB *gorm.DB
}

// UpdateTaskHandler func
func (*UpdateTaskHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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
	ID        int       `json:"id"`
	Deadline  time.Time `json:"deadline"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Tasks     Tasks     `json:"tasks"`
}

// Tasks Array
type Tasks []Task

// Task struct
type Task struct {
	ID        int `json:"id"`
	SprintID  int
	Done      bool      `json:"done"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
