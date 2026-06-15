export const PROTOCOL_NAME = "SAP-S4HANA-Integration-V1";
export const PROTOCOL_VERSION = "1.0";
export const HEADER_INTEGRATION_PROTOCOL = "X-Integration-Protocol";
export const HEADER_SOURCE_SYSTEM = "X-Source-System";
export const HEADER_MESSAGE_ID = "X-Message-Id";

export function buildProtocolHeaders(messageId: string) {
  return {
    [HEADER_INTEGRATION_PROTOCOL]: `${PROTOCOL_NAME}/${PROTOCOL_VERSION}`,
    [HEADER_SOURCE_SYSTEM]: "SAP S/4HANA",
    [HEADER_MESSAGE_ID]: messageId,
  };
}
