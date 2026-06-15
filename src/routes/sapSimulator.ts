import express from "express";
import { SAPCustomer, SAPInvoice } from "../types.js";

const router = express.Router();

const invoices: SAPInvoice[] = [
  {
    invoiceId: "INV-1001",
    customerId: "CUST-770",
    postingDate: "2026-06-01",
    dueDate: "2026-06-30",
    invoiceAmount: 52000,
    currency: "EUR",
    paymentStatus: "OPEN",
    companyCode: "1000",
    profitCenter: "PC01",
    taxAmount: 10400,
  },
  {
    invoiceId: "INV-1002",
    customerId: "CUST-420",
    postingDate: "2026-06-03",
    dueDate: "2026-07-02",
    invoiceAmount: 98000,
    currency: "EUR",
    paymentStatus: "PAID",
    companyCode: "1000",
    profitCenter: "PC02",
    taxAmount: 19600,
  },
  {
    invoiceId: "INV-1003",
    customerId: "CUST-770",
    postingDate: "2026-05-15",
    dueDate: "2026-06-14",
    invoiceAmount: 43000,
    currency: "EUR",
    paymentStatus: "OVERDUE",
    companyCode: "1000",
    profitCenter: "PC01",
    taxAmount: 8600,
  },
];

const customers: SAPCustomer[] = [
  {
    customerId: "CUST-770",
    name: "Acme Financial Services",
    region: "EMEA",
    creditGroup: "A",
    industry: "Banking",
  },
  {
    customerId: "CUST-420",
    name: "Global Retail Partners",
    region: "EMEA",
    creditGroup: "B",
    industry: "Retail",
  },
];

router.get("/invoices", (_req, res) => {
  res.json({ data: invoices, count: invoices.length, source: "SAP S/4HANA" });
});

router.get("/customers", (_req, res) => {
  res.json({ data: customers, count: customers.length, source: "SAP S/4HANA" });
});

export default router;
