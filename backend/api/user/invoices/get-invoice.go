package invoices

import (
	api "backend-api/api/utils"
	"backend-api/auth"
	"backend-api/db"
	"fmt"
	"net/http"
)

func GetInvoice(w http.ResponseWriter, r *http.Request) {
	match := api.GetParams(r, `/api/invoice/([a-zA-Z0-9]+)`, w)

	if match == "error" {
		return
	}

	uid := r.Context().Value(auth.UidContextKey).(string)

	var i invoice

	conn := db.GetConnection()

	query := conn.QueryRow(GET_INVOICE+" AND invoices.id = $2", uid, match)

	err := query.Scan(&i.Id, &i.Date_due, &i.Currency_code,
		&i.Description, &i.Status,
		&i.First_name, &i.Last_name, &i.Price, &i.Address,
		&i.Country, &i.City, &i.Client_Email, &i.Zip_Code)

	i.Items = getInvoiceItems(i.Id)

	for _, items := range i.Items {
		i.Total += items.Total
	}

	fmt.Println(query)

	if err != nil {
		fmt.Println(err)
		api.Resp(w, 400, "error")
		return
	}

	fmt.Println(i)

	api.Resp(w, 200, i)
}
