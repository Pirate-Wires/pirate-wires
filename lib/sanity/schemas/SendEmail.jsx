// lib/sanity/schemas/SendEmail.jsx
import { toHTML } from '@portabletext/to-html';
import React from 'react';
import { useMemo } from 'react';
import { useFormValue } from 'sanity';

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
  const form = useFormValue([]);
  const title = useFormValue(['title']);
  const section = useFormValue(['section']);
  const subTitle = useFormValue(['excerpt']);
  const preface = useFormValue(['preface']);
  const body = useFormValue(['body']);
  const bodyHtml = toHTML(body, { components });

  // const authorName = 'Author Name';
  // const authorSlug = 'author-slug';
  // const authorImageUrl = 'author-image';

  console.log('form', form);
  console.log('title', title);
  console.log('section', section);
  console.log('subTitle', subTitle);
  console.log('preface', preface);
  console.log('bodyHtml', bodyHtml);

  const [formValues, setFormValues] = React.useState({
    title: '',
    section: '',
    subTitle: '',
    preface: '',
    bodyHtml: ''
  });

  React.useEffect(() => {
    setFormValues({
      title: title,
      section: section,
      subTitle: subTitle,
      preface: preface,
      bodyHtml: bodyHtml
    });
  }, [title, section, subTitle, preface, bodyHtml]);

  const handleSendEmail = async () => {
    // Prepare the request body
    // I only want to send the title, section, and subTitle right now
    const requestBody = {
      title: formValues.title,
      subTitle: formValues.subTitle,
      section: formValues.section
    };

    console.log('Request body:', requestBody);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        setEmailSent(true);
      } else {
        console.error('Email sending failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="space-y-2 border p-4">
      <h2 className="text-xl font-bold">Send Email</h2>
      <div className="flex flex-col space-y-2">
        <pre>{title}</pre>
        <button onClick={handleSendEmail}>Send Email</button>
      </div>
    </div>
  );
}
