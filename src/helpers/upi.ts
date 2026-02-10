export function buildUpiLink(
  upiId: string,
  name: string,
  amount: number,
  note: string
) {
  return `upi://pay?pa=${encodeURIComponent(
    upiId
  )}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(
    note
  )}`;
}
