package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHomeHandler(t *testing.T) {
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}

	r := httptest.NewRecorder()

	handler := http.HandlerFunc(HomeHandler)
	handler.ServeHTTP(r, req)

	// status test
	if r.Code != http.StatusOK {
		t.Errorf("Expected response code %v but %v\n",
			r.Code, http.StatusOK)
	}
}
