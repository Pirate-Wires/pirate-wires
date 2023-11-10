// lib/cioClient.js
import axios from "axios";
import { TrackClient, APIClient, RegionUS } from "customerio-node";

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

export const getCustomerSubscription = async (email: string) => {
  const cioId = await getCustomerId(email);

  try {
    const options = {
      method: 'GET',
      url: `https://api.customer.io/v1/customers/${cioId}/attributes`,
      headers: {
        Authorization: `Bearer ${SITE_API_KEY}`
      }
    };

    const response = await axios(options);

    const { topics } = JSON.parse(
      response.data.customer.attributes._cio_subscription_preferences_computed
    );

    const subscription: string[] = [];
    if (topics.topic_1) subscription.push('Wires');
    if (topics.topic_2) subscription.push('The Industry');
    if (topics.topic_3) subscription.push('The White Pill');

    return { data: subscription, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};
