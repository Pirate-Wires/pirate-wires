// lib/sanity/schemas/SendEmailCustomerIO.jsx
import { apiVersion, dataset, projectId, useCdn } from '../config';
// import { PortableText } from '@portabletext/react';
import { toHTML } from '@portabletext/to-html';
import { createClient } from 'next-sanity';
import React from 'react';
import { useState, useEffect } from 'react';
import { useFormValue } from 'sanity';

// const toMarkdown = require('@sanity/block-content-to-markdown');

// todo: get the author image from the author's slug
const authorImages = {
  'mike-solana':
    'https://pirate-wires.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcjtc1tnd%2Fproduction%2F70be49eeea24927f8d0e491667aee243bd5de5c1-224x224.webp%3Fw%3D224%26auto%3Dformat&w=640&q=75',
  'kat-rosenfield':
    'https://pirate-wires.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcjtc1tnd%2Fproduction%2F72e278fbee986ec46219c04e57334d77d2a50230-224x224.webp%3Fw%3D224%26auto%3Dformat&w=640&q=75',
  'river-page':
    'https://pirate-wires.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcjtc1tnd%2Fproduction%2F63507c74248557cf7af33eb17b73473c3d86dedc-224x224.webp%3Fw%3D224%26auto%3Dformat&w=640&q=75'
};

// todo: figure out the components thing
// const components = {
//   types: {
//     image: ({ value }) => {
//       if (value && value.asset && value.asset._ref) {
//         return `<img src="${value.asset._ref}" />`;
//       } else {
//         return '';
//       }
//     },
//     embed: ({ value }) => {
//       if (value && value.url) {
//         return `<iframe src="${value.url}" />`;
//       } else {
//         return '';
//       }
//     }
//   }
// };

// todd: are we going to pass props in or just handle everyhting within the main function?
export default function SendEmail(props) {
  const [authorName, setAuthorName] = useState();
  const [authorNameSlug, setAuthorNameSlug] = useState();
  const { _ref } = useFormValue(['author']) || '';
  const authorNameGroqQuery = `*[_type == 'author' && _id == $authorId][0].name`;

  async function getAuthorName() {
    const client = projectId
      ? createClient({ projectId, dataset, apiVersion, useCdn })
      : null;

    const author = await client.fetch(authorNameGroqQuery, { authorId: _ref });
    return author;
  }

  useEffect(() => {
    const fetchData = async () => {
      if (_ref) {
        const name = await getAuthorName(_ref);
        setAuthorName(name);
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        setAuthorNameSlug(slug);
      }
    };

    fetchData();
  }, [_ref]);

  // const form = useFormValue([]);
  const title = useFormValue(['title']) || '';
  const section = useFormValue(['section']) || '';
  const subTitle = useFormValue(['excerpt']) || '';
  const mainImage = useFormValue(['mainImage']) || '';
  const preface = useFormValue(['preface']) || '';
  const body = useFormValue(['body']) || '';
  const _createdAt = useFormValue(['_createdAt']) || '';
  const bodyHtml = toHTML(body);
  const author = useFormValue(['author']) || '';

  // minor scorcery to get the slug value
  const slugValue = useFormValue(['slug']);
  const slug = slugValue ? slugValue.current : '';

  console.log('mainImage', mainImage);

  // minor scorcery to get the sectionBroadcastId value
  let sectionBroadcastId = 0;
  if (section === 'the-wire') {
    sectionBroadcastId = 9;
  } else if (section === 'the-industry') {
    sectionBroadcastId = 12;
  } else if (section === 'the-white-pill') {
    sectionBroadcastId = 13;
  }

  // use the authorNameSlug, now get the matching key from authorImages and put its value in a authorImage variable
  const authorImageURL = authorImages[authorNameSlug];

  const formattedBodyHtml = bodyHtml
    .replace(/<a href="(.*?)">(.*?)<\/a>/gi, '<Link href="$1">$2</Link>')
    .replace(/<img src="(.*?)" \/>/gi, '<Img src="$1" alt="placeholder" />')
    .replace(/<p>(.*?)<\/p>/gi, '<Text>$1</Text>')
    .replace(/<\/h[1-6]>/gi, '</h$0>\n')
    .replace(/<\/blockquote>/gi, '</blockquote>\n');

  // const markdownFormattedHtml = toMarkdown(body); // Convert the PortableText content to Markdown

  const [formValues, setFormValues] = React.useState({
    title: '',
    section: '',
    subTitle: '',
    preface: '',
    bodyHtml: '',
    body: '',
    formattedBodyHtml: '',
    authorName: '',
    authorNameSlug: ''
  });

  React.useEffect(() => {
    setFormValues({
      title: title,
      _createdAt: _createdAt,
      section: section,
      subTitle: subTitle,
      preface: preface,
      bodyHtml: bodyHtml,
      body: body,
      formattedBodyHtml: formattedBodyHtml,
      authorName: authorName,
      authorNameSlug: authorNameSlug,
      authorImageURL: authorImageURL
    });
  }, [
    title,
    _createdAt,
    section,
    subTitle,
    preface,
    bodyHtml,
    body,
    formattedBodyHtml,
    authorName,
    authorNameSlug,
    authorImageURL
  ]);

  const [emailSent, setEmailSent] = React.useState(false);

  const broadcastId = sectionBroadcastId;
  // wire: 9
  // the-industry: 12
  // white-pill" 13

  const data = {
    data: {
      title: title,
      slug: slug,
      headline: 'Email Headline',
      subTitle: subTitle,
      authorName: authorName,
      date: 1511315635,
      text: 'Email text',
      bodyHtml: bodyHtml,
      broadcastId: broadcastId,
      preface: preface,
      authorNameSlug: authorNameSlug,
      authorImageURL: authorImageURL
    }
  };
  const [selectedEmail, setSelectedEmail] = useState('reader@piratewires.us'); // Added state for selected email

  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

  // This effect will automatically hide the success message after 5 seconds
  React.useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 9000); // 9000 milliseconds = 9 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showSuccessMessage]);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendEmail = async () => {
    try {
      setIsLoading(true); // Set loading state to true

      const response = await fetch('/api/send-email-customerio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          // Adding the selected email to the emails array
          data: {
            ...data.data,
            emails: [selectedEmail]
          }
        })
      });

      if (response.ok) {
        setEmailSent(true);
        setShowSuccessMessage(true); // Show the success message
        console.log('Email sending succeeded');
      } else {
        console.error('Email sending failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <div className="space-y-2 border p-4">
      <p className="text-xs py-3">
        <select
          className="border p-3"
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
        >
          <option value="reader@piratewires.us"> reader@piratewires.us</option>
          <option value="mike@piratewires.com">mike@piratewires.com</option>
          <option value="eric@piratewires.com">eric@piratewires.com</option>
          <option value="joshuavaage@icloud.com">joshuavaage@icloud.com</option>
          <option value="fran@boringprotocol.io">fran@boringprotocol.io</option>
          <option value="thefranswan@gmail.com">thefranswan@gmail.com</option>
        </select>
      </p>

      {/* Send button or spinner */}
      {isLoading ? (
        <div className="space-y-2 p-2 border border-none rounded-md">
          <button disabled>
            <div className="animate-spin h-5 w-5 mr-3 border-t-2 border-r-2 border-b-2 border-blue-400"></div>
            Sending...
          </button>
        </div>
      ) : (
        <div className="space-y-2 p-2 border border-none rounded-md">
          <button onClick={handleSendEmail}>Send</button>
        </div>
      )}

      {/* Success message */}
      {showSuccessMessage && (
        <div className="space-y-2 bg-green-600">
          <p className="text-sm text-white p-3 mt-4">
            Email sent successfully to {selectedEmail} via the {section}{' '}
            segment.
            <button
              className="ml-2 text-white"
              onClick={() => setShowSuccessMessage(false)}
            >
              Close
            </button>
          </p>
        </div>
      )}
      <div className="space-y-2">
        <p className="text-xs py-3">
          broadcastId: {broadcastId} | {section} segment
        </p>
        <h2>Notes:</h2>
        <p className="text-xs py-3">
          You do not need to publish this article to send the newsletter. The
          newsletter contents will be pulled from the draft which autosaves as
          you type.
        </p>
        <p className="text-xs py-3">
          The post does not need to be published in order to send it as a
          newlstter. You can send an unpublished post as a newsletter.
        </p>
        <p className="text-xs py-3">
          The recipienst in the select box above must be added as people in
          customer.io and belong to the to segment named for each section.
        </p>
        <p className="text-xs py-3">
          Send all is implemented and extensiveley tested. It will send the post
          to all people in the customer.io account who have chosen the
          respective sections in their newsetter preferences. Presently we are
          defining only one recipient above for testing purposes.
        </p>
      </div>
    </div>
  );
}
