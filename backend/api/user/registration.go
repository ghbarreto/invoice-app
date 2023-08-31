package user

import (
	api "backend-api/api/utils"
	"backend-api/db"
	"encoding/json"
	"fmt"
	"net/http"
)

type User struct {
	Id         string `json:"id"`
	Email      string `json:"email"`
	ProviderId string `json:"provider_id"`
}

func Registration(w http.ResponseWriter, r *http.Request) {
	var user User

	rows := searchCredentials(r, &user)

	if rows == 0 {
		insertNewUser(r, &user)
	}

	api.Resp(w, 200, user)
}

func insertNewUser(r *http.Request, user *User) {
	insertUser := `INSERT INTO credentials (uid, email, provider_id) VALUES ($1, $2, $3);`

	_, err := db.Db().Exec(insertUser, user.Id, user.Email, user.ProviderId)

	if err != nil {
		fmt.Println("Error inserting new user")
		panic(err)
	}

}

func searchCredentials(r *http.Request, user *User) (rows int64) {
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		fmt.Println("Error decoding JSON")
		panic(err)
	}

	findUser := `SELECT uid from credentials WHERE uid = $1;`
	u, err := db.Db().Exec(findUser, user.Id)

	if err != nil {
		fmt.Println("Error searching for user")
		panic(err)
	}

	rows, err = u.RowsAffected()

	if err != nil {
		fmt.Println("Error getting rows affected")
		panic(err)
	}

	return rows
}
