import express from "express";
import { AnalyticsRecord } from "../types.js";
import { HEADER_INTEGRATION_PROTOCOL, HEADER_SOURCE_SYSTEM } from "../services/protocol.js";

const router = express.Router();

router.post("/ingest", express.json(), (req, res) => {
  const records: AnalyticsRecord[] = req.body.records ?? [];
  const protocolHeader = req.header(HEADER_INTEGRATION_PROTOCOL) ?? "unknown";
  const sourceSystem = req.header(HEADER_SOURCE_SYSTEM) ?? "unknown";

  if (!Array.isArray(records) || records.length === 0) {
    return res.status(400).json({ error: "No analytics records received" });
  }

  const accepted = records.filter((record) => record.recordId && record.customerName).length;
  const rejected = records.length - accepted;

  res.json({
    received: records.length,
    accepted,
    rejected,
    protocol: protocolHeader,
    sourceSystem,
    timestamp: new Date().toISOString(),
  });
});

export default router;
