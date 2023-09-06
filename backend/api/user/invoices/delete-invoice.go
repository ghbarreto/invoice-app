package invoices

import (
	api "backend-api/api/utils"
	"backend-api/db"
	"net/http"
)

type DelInvoice struct {
	Id  string `json:"id"`
	Uid string `json:"uid"`
}

func DeleteInvoice(w http.ResponseWriter, r *http.Request) {
	var invoice_to_delete DelInvoice

	api.JsonDecode(r, &invoice_to_delete)

	deleteInvoice := `DELETE FROM invoices WHERE id = $1 AND user_id = $2`

	_, err := db.Db().Exec(deleteInvoice, invoice_to_delete.Id, invoice_to_delete.Uid)

	if err != nil {
		panic(err)
	}

	db.Db().Close()

	api.Resp(w, 200, "invoice deleted")
}