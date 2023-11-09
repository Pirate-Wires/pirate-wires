// lib/cioClient.js
import { TrackClient, APIClient, RegionUS, RegionEU } from "customerio-node";

const SITE_ID = process.env.CUSTOMER_IO_SITE_ID as string;
const SITE_API_KEY = process.env.CUSTOMER_IO_API_KEY as string;
const TRACKING_API_KEY = process.env.CUSTOMER_IO_TRACKING_API_KEY as string;

export const trackerCio = new TrackClient(SITE_ID, TRACKING_API_KEY, { region: RegionUS });
export const apiCio = new APIClient(SITE_API_KEY, { region: RegionUS });

export const getCustomerId = async (email: string) => {
  const response = await apiCio.getCustomersByEmail(email);
  const customer = response.results[0];

  if(!customer) {
    return null;
  }

  return customer.cio_id;
}

