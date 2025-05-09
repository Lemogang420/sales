import { Order } from '../types';

export const processData = (rawData: string): Order[] => {
  // Skip the header row and process the remaining lines
  const lines = rawData.trim().split('\n');
  const orders: Order[] = [];

  for (const line of lines) {
    // Split the CSV line by comma, but handle commas within quotes
    const parts = line.split(',');
    
    if (parts.length >= 7) {
      const [orderId, amountStr, profitStr, quantityStr, category, subCategory, paymentMode] = parts;
      
      // Parse numeric values
      const amount = parseFloat(amountStr);
      const profit = parseFloat(profitStr);
      const quantity = parseInt(quantityStr);
      
      if (!isNaN(amount) && !isNaN(profit) && !isNaN(quantity)) {
        orders.push({
          orderId,
          amount,
          profit,
          quantity,
          category,
          subCategory,
          paymentMode
        });
      }
    }
  }

  return orders;
};