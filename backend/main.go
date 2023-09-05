package main

import (
	r "backend-api/api/user"
	i "backend-api/api/user/invoices"
	utils "backend-api/api/utils"
	"net/http"
)

func main() {
	// invoice wrapper
	utils.Routes("invoices", i.Invoices)
	utils.Routes("invoices/create_invoice", i.CreateInvoice)
	utils.Routes("invoices/update_invoice", i.UpdateInvoice)

	// user wrapper
	utils.Routes("credentials", r.Registration)

	http.ListenAndServe(":8080", nil)
}
