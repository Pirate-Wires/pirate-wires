const {
  getAllSupabaseUsers,
  getAllStripeCustomers,
  updateStripeCustomersFromSupabase
} = require('./utils');

const syncStripeWithSupabase = async () => {
  try {
    const users = await getAllSupabaseUsers();
    const customers = await getAllStripeCustomers();

    console.log('Start syncing Stripe customers with Supabase users...');
    await updateStripeCustomersFromSupabase({ users, customers });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

syncStripeWithSupabase();

module.exports = {
  syncStripeWithSupabase
};
