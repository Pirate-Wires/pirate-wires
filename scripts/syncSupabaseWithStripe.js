const {
  getAllSupabaseUsers,
  getAllStripeCustomers,
  updateSupabaseUsersFromStripe
} = require('./utils');

const syncSupabaseWithStripe = async () => {
  try {
    const users = await getAllSupabaseUsers();
    const customers = await getAllStripeCustomers();

    console.log('Start syncing Supabase users with Stripe customers...');
    await updateSupabaseUsersFromStripe({ users, customers });

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
