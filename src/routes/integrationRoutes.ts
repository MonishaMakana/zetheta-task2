import express from "express";
import { fetchSapCustomers, fetchSapInvoices } from "../services/sapClient.js";
import { transformSapInvoices } from "../services/transformer.js";
import { ingestAnalyticsRecords } from "../services/analyticsClient.js";
import { IntegrationSummary } from "../types.js";

const router = express.Router();

router.post("/run", async (_req, res) => {
  try {
    const invoices = await fetchSapInvoices();
    const customers = await fetchSapCustomers();
    const analyticsRecords = await transformSapInvoices(invoices, customers);

    const ingestion = await ingestAnalyticsRecords(analyticsRecords, "http://localhost:4000/api/analytics/ingest");

    const summary: IntegrationSummary = {
      status: "success",
      message: "Integration completed successfully",
      extractedRecords: invoices.length,
      transformedRecords: analyticsRecords.length,
      ingestion,
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ status: "failure", message: error instanceof Error ? error.message : "Unknown error" });
  }
});

export default router;
