let callbackFunction = () => {};

const options = (orderData, onClose) => ({
  key: "rzp_test_Oza0Wpn27TeWiC", // Enter the Key ID generated from the Dashboard
  amount: orderData.amount_due, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: orderData.currency,
  name: "Acme Corp",
  description: "Bussiness Account",
  image: "https://example.com/your_logo",
  order_id: orderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  callback_url: "http://localhost:3001/",
  prefill: {
    name: "Narsijngh Jaiswal",
    email: "Narsingh.jaiswal@digivalet.com",
    contact: "8349377776"
  },
  notes: {
    address: "Book My table Corporate Office"
  },
  theme: {
    color: "#3399cc"
  },
  handler: (response) => {
    callbackFunction();
  },
  modal: {
    ondismiss: () => onClose()
  }
});

export const openRazorPay = (callback, orderData, onClose = () => {}) => {
  callbackFunction = callback;
  const razorpay = new window.Razorpay(options(orderData, onClose));
  razorpay.open();

  razorpay.on("payment.failed", function (response) {
    alert(response.error.description);
  });
};
