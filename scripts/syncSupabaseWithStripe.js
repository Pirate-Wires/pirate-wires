const {
  getAllSupabaseUsers,
  getAllStripeCustomers,
  updateSupabaseFromStripe,
  getAllStripeSubscriptions
} = require('./utils');

const syncSupabaseWithStripe = async () => {
  try {
    const users = await getAllSupabaseUsers();
    const customers = await getAllStripeCustomers();
    const subscriptions = await getAllStripeSubscriptions();

    console.log('Start syncing Supabase users with Stripe customers...');
    await updateSupabaseFromStripe({ users, customers, subscriptions });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

syncSupabaseWithStripe();

module.exports = {
  syncSupabaseWithStripe
};
