import { AnalyticsRecord, IngestionResult } from "../types.js";
import { buildProtocolHeaders } from "./protocol.js";

export async function ingestAnalyticsRecords(
  records: AnalyticsRecord[],
  targetUrl: string,
): Promise<IngestionResult> {
  const messageId = `msg-${Date.now()}`;
  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildProtocolHeaders(messageId),
    },
    body: JSON.stringify({ records }),
  });

  if (!response.ok) {
    throw new Error(`Analytics ingestion failed with status ${response.status}`);
  }

  const json = await response.json();
  return {
    received: json.received,
    accepted: json.accepted,
    rejected: json.rejected,
    protocol: json.protocol,
    timestamp: json.timestamp,
  };
}
