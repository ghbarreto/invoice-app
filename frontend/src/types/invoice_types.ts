export type InvoiceItems = {
  invoice_id: string;
  item_amount: number;
  item_id: string;
  item_name: string;
  overcharge: number;
  price: number;
  total: number;
};

export type Invoice = {
  address: string;
  city: string;
  client_email: string;
  country: string;
  currency_code: string;
  date_due: string;
  description: string;
  first_name: string;
  invoice_id: string;
  items: Array<InvoiceItems>;
  last_name: string;
  price: number;
  status: InvoiceStatusTypes;
  total: number;
  zip_code: string;
  business: Business;
};

export type Business = {
  address: string;
  city: string;
  country: string;
  zip: string;
};

export type InvoiceStatus = {
  paid: number | null;
  pending: number | null;
  draft: number | null;
  overdue: number | null;
};

export type InvoiceStatusTypes = keyof InvoiceStatus;
