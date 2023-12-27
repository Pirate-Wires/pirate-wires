const {
  getAllSupabaseUsers,
  getAllStripeCustomers,
  getAllSupabaseSubscriptions,
  updateStripeFromSupabase,
} = require("./utils");

async function syncStripeWithSupabase() {
  try {
    const users = await getAllSupabaseUsers();
    const customers = await getAllStripeCustomers();
    const subscriptions = await getAllSupabaseSubscriptions();

    console.log("Start syncing Stripe customers with Supabase users...");
    await updateStripeFromSupabase({ users, customers, subscriptions });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

syncStripeWithSupabase();

module.exports = {
  syncStripeWithSupabase,
};
