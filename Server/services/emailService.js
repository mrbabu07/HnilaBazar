// Mock email service for development (nodemailer not installed)
class EmailService {
  constructor() {
    console.log("📧 Email service initialized (mock mode)");
  }

  async sendOrderConfirmation(data) {
    console.log("📧 [MOCK] Order confirmation email:", {
      to: data.userEmail,
      orderId: data.orderId,
      userName: data.userName,
    });
    return Promise.resolve();
  }

  async sendOrderStatusUpdate(data) {
    console.log("📧 [MOCK] Order status update email:", {
      to: data.userEmail,
      orderId: data.orderId,
      status: data.status,
    });
    return Promise.resolve();
  }

  async sendLowStockAlert(data) {
    console.log("📧 [MOCK] Low stock alert email:", {
      product: data.productTitle,
      stock: data.currentStock,
    });
    return Promise.resolve();
  }

  async sendReturnConfirmation(data) {
    console.log("📧 [MOCK] Return confirmation email:", {
      to: data.userEmail,
      returnId: data.returnId,
    });
    return Promise.resolve();
  }
}

module.exports = new EmailService();
