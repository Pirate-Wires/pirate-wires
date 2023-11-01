// app/api/customer-io/route.ts
// import cio from '../../../lib/cioClient';

// export default async function handler(req, res) {
//   const { email } = req.query;

//   try {
//     const customer = await cio.getCustomersByEmail(email);

//     res.status(200).json(customer);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
