const { syncSupabaseWithCio } = require("./syncSupabaseWithCio");
const { syncSupabaseWithStripe } = require("./syncSupabaseWithStripe");
const { syncCioWithSupabase } = require("./syncCioWithSupabase");
const { syncStripeWithSupabase } = require("./syncStripeWithSupabase");

const syncDB = async () => {
  try {
    await syncSupabaseWithCio();
    await syncSupabaseWithStripe();
    await syncCioWithSupabase();
    await syncStripeWithSupabase();

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

syncDB();

module.exports = {
  syncDB,
};
