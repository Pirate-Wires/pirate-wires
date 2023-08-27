// lib/sanity/schemas/SendEmailPostmarkApp.jsx

import { apiVersion, dataset, projectId, useCdn } from '../config';
import { PortableText } from '@portabletext/react';
import { toHTML } from '@portabletext/to-html';
import { createClient } from 'next-sanity';
import React from 'react';
import { useState, useEffect } from 'react';
import { useFormValue } from 'sanity';

const toMarkdown = require('@sanity/block-content-to-markdown');

const components = {
  types: {
    image: ({ value }) => {
      if (value && value.asset && value.asset._ref) {
        return `<img src="${value.asset._ref}" />`;
      } else {
        return '';
      }
    },
    embed: ({ value }) => {
      if (value && value.url) {
        return `<iframe src="${value.url}" />`;
      } else {
        return '';
      }
    }
  }
};

export default function SendEmail(props) {
  const [authorName, setAuthorName] = useState();
  const { _ref } = useFormValue(['author']);
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
      }
    };

    fetchData();
  }, [_ref]);

  console.log('authorName', authorName);

  const form = useFormValue([]);
  const title = useFormValue(['title']);
  const section = useFormValue(['section']);
  const subTitle = useFormValue(['excerpt']);
  const mainImage = useFormValue(['mainImage']);
  const preface = useFormValue(['preface']);
  const body = useFormValue(['body']);
  const _createdAt = useFormValue(['_createdAt']);
  const bodyHtml = toHTML(body, { components });
  const author = useFormValue(['author']);

  console.log('form', form);
  console.log('title', title);
  console.log('section', section);
  console.log('subTitle', subTitle);
  console.log('mainImage', mainImage);
  console.log('preface', preface);
  console.log('body', body);
  console.log('_createdAt', _createdAt);
  console.log('bodyHtml', bodyHtml);
  console.log('author', author);

  const formattedBodyHtml = bodyHtml
    .replace(/<a href="(.*?)">(.*?)<\/a>/gi, '<Link href="$1">$2</Link>')
    .replace(/<img src="(.*?)" \/>/gi, '<Img src="$1" alt="placeholder" />')
    .replace(/<p>(.*?)<\/p>/gi, '<Text>$1</Text>')
    .replace(/<\/h[1-6]>/gi, '</h$0>\n')
    .replace(/<\/blockquote>/gi, '</blockquote>\n');

  const markdownFormattedHtml = toMarkdown(body); // Convert the PortableText content to Markdown

  const [formValues, setFormValues] = React.useState({
    title: '',
    section: '',
    subTitle: '',
    preface: '',
    bodyHtml: '',
    body: '',
    formattedBodyHtml: '',
    authorName: '',
    markdownFormattedHtml: ''
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
      markdownFormattedHtml: markdownFormattedHtml
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
    markdownFormattedHtml
  ]);

  const [emailSent, setEmailSent] = React.useState(false);

  const handleSendEmail = async () => {
    const requestBody = {
      title: formValues.title,
      _createdAt: formValues._createdAt,
      subTitle: formValues.subTitle,
      preface: formValues.preface,
      section: formValues.section,
      bodyHtml: formValues.bodyHtml,
      body: formValues.body,
      authorName: formValues.authorName,
      formattedBodyHtml: formValues.formattedBodyHtml,
      markdownFormattedHtml: formValues.markdownFormattedHtml
    };

    try {
      const response = await fetch('/api/send-email-postmarkapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        setEmailSent(true);
        console.log('Email sending succeeded');
      } else {
        console.error('Email sending failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <>
      {/* <div className="space-y-2 border p-4">
      <h2 className="text-xl font-bold">Send Email</h2>
      <div className="flex flex-col space-y-2 text-xs">
        markdownFormattedHtml:
        <pre
          style={{
            whiteSpace: 'normal',
            overflow: 'auto',
            height: '200px',
            padding: '10px',
            border: '1px solid #ccc'
          }}
        >
          {markdownFormattedHtml}
        </pre>
        formattedBodyHtml:
        <pre
          style={{
            whiteSpace: 'normal',
            overflow: 'auto',
            height: '200px',
            padding: '10px',
            border: '1px solid #ccc'
          }}
        >
          {formattedBodyHtml}
        </pre>
        bodyHtml:
        <pre
          style={{
            whiteSpace: 'normal',
            overflow: 'auto',
            height: '200px',
            padding: '10px',
            border: '1px solid #ccc'
          }}
        >
          {bodyHtml}
        </pre>
        <button onClick={handleSendEmail}>Send Email</button>
      </div>
    </div> */}
    </>
  );
}
