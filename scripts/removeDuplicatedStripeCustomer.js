require("dotenv").config({path: "./.env.local"});
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {getAllStripeCustomers} = require("./utils");

const removeDuplicateCustomers = async () => {
  const allCustomers = await getAllStripeCustomers();
  const customersByEmail = new Map();

  // Grouping customers by email
  allCustomers.forEach(customer => {
    if (customer.email) {
      if (!customersByEmail.has(customer.email)) {
        customersByEmail.set(customer.email, []);
      }
      customersByEmail.get(customer.email).push(customer);
    }
  });

  for (const [email, customers] of customersByEmail) {
    if (customers.length > 1) {
      // Prioritize customers with a default_payment_method
      const sortedCustomers = customers.sort((a, b) => {
        const aHasPaymentMethod = a.default_source != null;
        const bHasPaymentMethod = b.default_source != null;
        return (
          bHasPaymentMethod - aHasPaymentMethod || a.created_at - b.created_at
        );
      });

      // Deleting all other customers
      for (const customer of sortedCustomers.slice(1)) {
        await stripe.customers.del(customer.id);
        console.log(
          `Deleted duplicate customer with email, ID: ${customer.email}, ${customer.id}`,
        );
      }
    }
  }

  console.log("Duplicate removal process completed.");
};

removeDuplicateCustomers();

module.exports = {
  removeDuplicateCustomers,
};
