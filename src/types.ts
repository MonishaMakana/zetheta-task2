export interface SAPInvoice {
  invoiceId: string;
  customerId: string;
  postingDate: string;
  dueDate: string;
  invoiceAmount: number;
  currency: string;
  paymentStatus: "PAID" | "OPEN" | "OVERDUE";
  companyCode: string;
  profitCenter: string;
  taxAmount: number;
}

export interface SAPCustomer {
  customerId: string;
  name: string;
  region: string;
  creditGroup: string;
  industry: string;
}

export interface AnalyticsRecord {
  recordId: string;
  customerName: string;
  region: string;
  revenue: number;
  outstandingBalance: number;
  invoiceDate: string;
  dueDate: string;
  riskScore: number;
  currency: string;
  sourceSystem: string;
  segment: string;
}

export interface IngestionResult {
  received: number;
  accepted: number;
  rejected: number;
  protocol: string;
  timestamp: string;
}

export interface IntegrationSummary {
  status: "success" | "failure";
  message: string;
  extractedRecords: number;
  transformedRecords: number;
  ingestion: IngestionResult;
}
