import { AnalyticsRecord, SAPCustomer, SAPInvoice } from "../types.js";

const riskClasses: Record<string, number> = {
  PAID: 10,
  OPEN: 50,
  OVERDUE: 90,
};

function calculateRiskScore(invoice: SAPInvoice, customer: SAPCustomer | undefined): number {
  const baseScore = riskClasses[invoice.paymentStatus] ?? 60;
  const creditModifier = customer?.creditGroup === "A" ? -10 : customer?.creditGroup === "B" ? 5 : 10;
  const ageModifier = Math.max(0, Math.floor((Date.now() - new Date(invoice.postingDate).getTime()) / (1000 * 60 * 60 * 24 * 30)) * 2);
  return Math.min(100, Math.max(1, baseScore + creditModifier + ageModifier));
}

export async function transformSapInvoices(
  invoices: SAPInvoice[],
  customers: SAPCustomer[],
): Promise<AnalyticsRecord[]> {
  return invoices.map((invoice) => {
    const customer = customers.find((entry) => entry.customerId === invoice.customerId);
    return {
      recordId: invoice.invoiceId,
      customerName: customer?.name ?? "Unknown Customer",
      region: customer?.region ?? "Unknown",
      revenue: invoice.invoiceAmount - invoice.taxAmount,
      outstandingBalance: invoice.paymentStatus === "PAID" ? 0 : invoice.invoiceAmount,
      invoiceDate: invoice.postingDate,
      dueDate: invoice.dueDate,
      riskScore: calculateRiskScore(invoice, customer),
      currency: invoice.currency,
      sourceSystem: "SAP S/4HANA",
      segment: customer?.industry ?? "General",
    };
  });
}
