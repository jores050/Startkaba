// Achats mockés pour le dev local (mode simulation paiement).

export type PaymentStatus = "PENDING" | "PAID" | "MOCK_PAID";

export interface PurchaseEntry {
  id: string;
  userId: string;
  productId: string;
  priceCFA: number;
  commissionCFA: number;
  coachAmountCFA: number;
  paymentStatus: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
}

const globalForPurchases = globalThis as unknown as {
  mockPurchases?: PurchaseEntry[];
};

export const mockPurchases: PurchaseEntry[] =
  globalForPurchases.mockPurchases ?? [];
globalForPurchases.mockPurchases = mockPurchases;

export function getMockPurchase(
  userId: string,
  productId: string
): PurchaseEntry | undefined {
  return mockPurchases.find(
    (p) => p.userId === userId && p.productId === productId
  );
}

export function getMockUserPurchases(userId: string): PurchaseEntry[] {
  return mockPurchases.filter((p) => p.userId === userId);
}

export function createMockPurchase(entry: PurchaseEntry): PurchaseEntry {
  const existing = mockPurchases.findIndex(
    (p) => p.userId === entry.userId && p.productId === entry.productId
  );
  if (existing >= 0) {
    mockPurchases[existing] = entry;
  } else {
    mockPurchases.push(entry);
  }
  return entry;
}
