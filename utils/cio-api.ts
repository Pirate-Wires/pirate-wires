import axios from 'axios';

export const getCustomerSubscription = async (cioId: string) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://api.customer.io/v1/customers/c5e708001213/attributes',
      headers: {
        'Authorization': 'Bearer d5129378f49b327f665e95c65aa65734'
      }
    };

    const response = await axios(options);

    const { topics } = JSON.parse(response.data.customer.attributes._cio_subscription_preferences_computed);

    const subscription: string[] = [];
    if(topics.topic_1)  subscription.push('Wires');
    if(topics.topic_2)  subscription.push('The Industry');
    if(topics.topic_3)  subscription.push('The White Pill');

    return subscription;
  } catch (err) {
    console.error('Error:', err);
    return [];
  }

  return [];
}