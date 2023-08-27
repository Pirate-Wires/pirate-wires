// app/api/send-email-customerio/route.ts
import { render } from '@react-email/render';
import NewsletterEmail, { NewsletterEmailProps } from 'emails/newsletter';
// Import your Newsletter component
import { NextRequest, NextResponse } from 'next/server';

const { APIClient, RegionUS } = require('customerio-node');

const apiKey =
  process.env.CUSTOMER_IO_API_KEY || 'd5129378f49b327f665e95c65aa65734';
const cio = new APIClient(apiKey, { region: RegionUS });

async function sendEmailHandler(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    const apiKey =
      process.env.CUSTOMER_IO_API_KEY || 'd5129378f49b327f665e95c65aa65734';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    };

    const requestData = await req.json();

    // docs refer to this as a campaign id, but it's actually the broadcast id if you want to get really technical, which i do, baby
    const broadcastId = requestData.data.broadcastId;

    const selectedEmail = requestData.data.emails[0]; // Assuming the emails array has only one element

    const customerIoData = {
      data: {
        headline: requestData.data.headline,
        title: requestData.data.title,
        slug: requestData.data.slug,
        date: requestData.data.date,
        text: requestData.data.text,
        authorName: requestData.data.authorName,
        authorNameSlug: requestData.data.authorNameSlug,
        subTitle: requestData.data.subTitle,
        bodyHtml: requestData.data.bodyHtml,
        preface: requestData.data.preface,
        authorImageURL: requestData.data.authorImageURL
      },
      // emails: ['fran@boringprotocol.io']
      emails: [selectedEmail] // Include the selected email in the emails array

      // recipients: {
      //   attribute: {
      //     field: 'draft_newsletters',
      //     operator: 'eq',
      //     value: true
      //   }
      // }
    };

    console.log('customerIoData', customerIoData);

    try {
      const response = await fetch(
        `https://api.customer.io/v1/api/campaigns/${broadcastId}/triggers`,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(customerIoData)
        }
      );

      if (response.ok) {
        return NextResponse.json(
          { message: 'Email sent successfully' },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: 'Email sending failed' },
          { status: response.status }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: 'An error occurred', error: error.message },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: 'Method not allowed' },
      { status: 405 }
    );
  }
}

export { sendEmailHandler as POST };
