import { render } from '@react-email/render';
import NewsletterEmail, { NewsletterEmailProps } from 'emails/newsletter';
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'postmark';

const postmarkClient = new Client(process.env.POSTMARK_API_KEY || '');

export async function sendEmailHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { title, subTitle, section } = req.body as NewsletterEmailProps;

      console.log('Received request to send email:', {
        title,
        subTitle,
        section
      });

      const emailHtml = render(
        NewsletterEmail({
          title,
          subTitle,
          section
        })
      );

      console.log('Generated email HTML:', emailHtml);

      const response = await postmarkClient.sendEmail({
        From: 'newsletter@piratewires.us',
        To: 'reader@piratewires.us',
        Subject: 'Pirate Wires Newsletter',
        HtmlBody: emailHtml
      });

      console.log('Email sent successfully:', response);

      if (response.ErrorCode) {
        console.error('Error sending email:', response.Message);
        return res.status(500).json({ error: 'Failed to send email' });
      }

      return res.status(200).json({ message: 'Email sent!' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

export { sendEmailHandler as POST };
