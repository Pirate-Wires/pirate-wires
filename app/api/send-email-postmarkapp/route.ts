// app/api/send-email-postmarkapp/route.ts
import { render } from '@react-email/render';
import NewsletterEmail, { NewsletterEmailProps } from 'emails/newsletter';
import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'postmark';

const postmarkClient = new Client(process.env.POSTMARK_API_KEY || '');

async function sendEmailHandler(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    try {
      const requestBody = await req.json(); // Parse the JSON data from the request body
      const {
        title,
        subTitle,
        preface,
        section,
        bodyHtml,
        authorName,
        _createdAt,
        formattedBodyHtml,
        markdownFormattedHtml
      } = requestBody as NewsletterEmailProps;

      console.log('Request body:', requestBody);

      const emailHtml = render(
        NewsletterEmail({
          title,
          _createdAt,
          subTitle,
          preface,
          section,
          bodyHtml,
          formattedBodyHtml,
          markdownFormattedHtml,
          authorName
        })
      );

      const response = await postmarkClient.sendEmail({
        From: 'newsletter@piratewires.us',
        To: 'reader@piratewires.us',
        Subject: 'Pirate Wires Newsletter',
        HtmlBody: emailHtml
      });

      console.log('Email sent successfully:', response);

      if (response.ErrorCode) {
        console.error('Error sending email:', response.Message);
        return NextResponse.json(
          { error: 'Failed to send email' },
          { status: 500 }
        );
      }

      return NextResponse.json({ message: 'Email sent!' }, { status: 200 });
    } catch (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
  }
}

export { sendEmailHandler as POST };
