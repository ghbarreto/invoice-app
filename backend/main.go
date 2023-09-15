package main

import (
	r "backend-api/api/user"
	c "backend-api/api/user/customers"
	i "backend-api/api/user/invoices"
	utils "backend-api/api/utils"
	"backend-api/db"
	"net/http"
)

func main() {
	db.Init()

	// TODO very important: fix every connection pool to use the connection returned by GetConnection()
	// customers wrapper
	utils.Routes("customers", c.CustomersRoute)
	// invoice wrapper
	utils.Routes("invoices", i.InvoicesRoute)
	// user wrapper
	utils.Routes("credentials", r.Registration)

	http.ListenAndServe(":8080", nil)
}
