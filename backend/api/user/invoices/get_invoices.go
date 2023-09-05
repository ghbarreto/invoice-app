package invoices

import (
	api "backend-api/api/utils"
	"backend-api/db"
	"encoding/json"
	"fmt"
	"net/http"
)

type Invoice struct {
	Id            string  `json:"invoice_id"`
	Date_due      *string `json:"date_due"`
	Currency_code *string `json:"currency_code"`
	Description   string  `json:"description"`
	Status        string  `json:"status"`
	First_name    string  `json:"first_name"`
	Last_name     string  `json:"last_name"`
	Price         float64 `json:"price"`
	Address       *string `json:"address"`
	Country       *string `json:"country"`
	City          *string `json:"city"`
	Client_Email  *string `json:"client_email"`
	Zip_Code      string  `json:"zip_code"`
}

type Body struct {
	Uid string `json:"uid"`
}

func Invoices(w http.ResponseWriter, r *http.Request) {
	var invoices []Invoice
	var u Body

	err := json.NewDecoder(r.Body).Decode(&u)

	if err != nil {
		fmt.Println("Error decoding JSON")
		panic(err)
	}

	rows, err := db.Db().Query("SELECT id, date_due, currency_code, "+
		"description, status, first_name, last_name, price, address, country, city, client_email, zip_code "+
		"FROM invoices WHERE user_id = $1", u.Uid)

	if err != nil {
		fmt.Println(err)
	}

	defer rows.Close()

	for rows.Next() {
		var i Invoice

		rows.Scan(&i.Id, &i.Date_due, &i.Currency_code,
			&i.Description, &i.Status,
			&i.First_name, &i.Last_name, &i.Price, &i.Address,
			&i.Country, &i.City, &i.Client_Email, &i.Zip_Code)

		invoices = append(invoices, i)

	}

	db.Db().Close()

	res := map[string]interface{}{
		"invoices_status": getInvoiceStatus(u.Uid),
		"invoices":        invoices,
		"invoices_count":  getInvoicesCount(u.Uid),
	}

	api.Resp(w, http.StatusOK, res)
}
