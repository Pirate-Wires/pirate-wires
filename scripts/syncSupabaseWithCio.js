const { getAllSupabaseUsers, getAllCioCustomers, updateSupabaseFromCio } = require("./utils");

const syncSupabaseWithCio = async () => {
  try {
    const users = await getAllSupabaseUsers();
    const customers = await getAllCioCustomers();

    console.log("Start syncing Supabase users with Customer.io customers...");
    await updateSupabaseFromCio({ users, customers });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

syncSupabaseWithCio();

module.exports = {
  syncSupabaseWithCio,
};
