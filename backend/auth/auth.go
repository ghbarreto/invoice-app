package auth

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

func Auth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		ctx := context.Background()

		opt := option.WithCredentialsFile("service_account.json")
		app, err := firebase.NewApp(ctx, nil, opt)

		if err != nil {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		authClient, err := app.Auth(ctx)
		if err != nil {
			fmt.Println(err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			http.Error(w, "Unauthorized token", http.StatusUnauthorized)
			return
		}

		token := tokenParts[1]

		_, err = authClient.VerifyIDToken(ctx, token)
		if err != nil {
			http.Error(w, "Unauthorized idtoken", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	}
}
