export const mockPayment = async (amount) => {
  if (amount !== 100) return { success: false };
  return {
    success: true,
    paymentId: "PAY-" + Date.now(),
    timestamp: new Date(),
    amount,
  };
};
