// Compteur de téléchargements mocké — singleton globalThis (cf. mock-progress.ts).

const globalForMock = globalThis as unknown as {
  mockDownloads?: Map<number, number>;
};

export const mockDownloads: Map<number, number> =
  globalForMock.mockDownloads ?? new Map([[1, 42], [2, 31], [3, 17]]);
globalForMock.mockDownloads = mockDownloads;

export function incrementDownload(resourceId: number): number {
  const next = (mockDownloads.get(resourceId) ?? 0) + 1;
  mockDownloads.set(resourceId, next);
  return next;
}
