const {
  getAllSupabaseUsers,
  getAllCioCustomers,
  updateCioFromSupabase,
} = require('./utils');

const syncCioWithSupabase = async () => {
  try {
    const users = await getAllSupabaseUsers();
    const customers = await getAllCioCustomers();

    console.log('Start syncing Customer.io customers with Supabase users...');
    await updateCioFromSupabase({ users, customers });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

syncCioWithSupabase();

module.exports = {
  syncCioWithSupabase
};
