package main

import (
	p "backend-api/api/product"
	r "backend-api/api/user"
	"backend-api/auth"
	"fmt"
	"net/http"

	"github.com/rs/cors"
)

func main() {
	fmt.Println("here")
	allowedOrigins := []string{"http://localhost:3000"}
	corsMiddleware := cors.New(
		cors.Options{
			AllowedOrigins:   allowedOrigins,
			AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
			AllowedHeaders:   []string{"Authorization", "Content-Type"},
			AllowCredentials: true,
			Debug:            true,
		},
	)

	http.Handle("/api/invoices", corsMiddleware.Handler(auth.Auth(http.HandlerFunc(p.Product))))
	http.Handle("/api/credentials", corsMiddleware.Handler(auth.Auth(http.HandlerFunc(r.Registration))))

	http.ListenAndServe(":8080", nil)
}
