const CAPTURED_STORE_KEY = "CAPTURED";

export function getCaputred(username: string): string[] {
  const capturedStr = localStorage.getItem(CAPTURED_STORE_KEY) ?? "{}";
  const captured = JSON.parse(capturedStr)[username] ?? [];
  return captured;
}

export function setCaptured(username: string, captured: string[]) {
  const capturedStr = localStorage.getItem(CAPTURED_STORE_KEY) ?? "{}";
  const capturedStore = JSON.parse(capturedStr);
  capturedStore[username] = captured;
  localStorage.setItem(CAPTURED_STORE_KEY, JSON.stringify(capturedStore));
}
