package invoices

import "backend-api/db"

func getInvoicesCount(uid string) int {
	var count int

	row := db.Db().QueryRow("SELECT COUNT(*) as count from invoices where user_id = $1", uid)

	row.Scan(&count)

	db.Db().Close()

	return count
}
