const {
  getAllSupabaseUsers,
  getAllStripeCustomers,
  getAllSupabaseSubscriptions,
  updateStripeFromSupabase,
} = require("./utils");

async function syncStripeWithSupabase() {
  try {
    const [users, customers, subscriptions] = await Promise.all([
      getAllSupabaseUsers(),
      getAllStripeCustomers(),
      getAllSupabaseSubscriptions(),
    ]);

    console.log("Start syncing Stripe customers with Supabase users...");
    await updateStripeFromSupabase({users, customers, subscriptions});
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

(async () => {
  try {
    await syncStripeWithSupabase();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

module.exports = {
  syncStripeWithSupabase,
};
