// app/api/send-email-customerio/route.ts
import {NextRequest, NextResponse} from "next/server";
import {APIClient, RegionUS} from "customerio-node";

const DUMMY_API_KEY = "dummy-placeholder-key";

const apiKey = process.env.CUSTOMER_IO_API_KEY || DUMMY_API_KEY;
const cio = new APIClient(apiKey, {region: RegionUS});

async function sendEmailHandler(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const requestData = await req.json();

    const broadcastId = requestData.data.broadcastId;
    const selectedEmail = requestData.data.emails[0];

    const customerIoData = {
      data: {
        ...requestData.data,
        authorImageURL: requestData.data.authorImageURL,
      },
      emails: [selectedEmail],
    };

    try {
      const response = await fetch(
        `https://api.customer.io/v1/api/campaigns/${broadcastId}/triggers`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(customerIoData),
        },
      );

      if (response.ok) {
        return NextResponse.json(
          {message: "Email sent successfully"},
          {status: 200},
        );
      } else {
        return NextResponse.json(
          {message: "Email sending failed"},
          {status: response.status},
        );
      }
    } catch (error) {
      return NextResponse.json(
        {message: "An error occurred", error: error.message},
        {status: 500},
      );
    }
  } else {
    return NextResponse.json({message: "Method not allowed"}, {status: 405});
  }
}

export {sendEmailHandler as POST};
