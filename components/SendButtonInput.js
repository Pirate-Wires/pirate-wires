// /components/SendButtonInput.js
import React from 'react';
import { useState } from 'react';
import { useFormValue } from 'sanity'
import { toHTML } from '@portabletext/to-html'
import Joi from 'joi';

// define payload schema
const schema = Joi.object({
  recipients: Joi.array().items(Joi.object({ email: Joi.string() })),
  data: Joi.object({
    title: Joi.string(),
    body: Joi.string(),
    section: Joi.string(),
    author: Joi.string()
  })
});

// Add embed handler 
const components = {
  types: {
    image: ({ value }) => {
      return `<img src="https://cdn.sanity.io/images/cjtc1tnd/production/${value.asset._ref}" />`
    },
    embed: ({ value }) => {
      // Return iframe for embed
      return `<iframe src="${value.url}" />`
    }
  }
}

export default function SendButtonInput(props) {
  const form = useFormValue([])

  const body = toHTML(form.body, { components });

  // console.log("Body", body);

  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [payloadText, setPayloadText] = useState('');


  const payload = {
    recipients: [{ email: email }],
    author: form.author,
    section: form.section,
    data: {
      title: form.title,
      excerpt: form.excerpt,
      body: body
    }
  };

  const handleSendTest = () => {

    // Transform the body to HTML
    const formattedBody = body
      .replace(/<\/p>/gi, '</p>\n')
      .replace(/<\/div>/gi, '</div>\n')
      .replace(/<\/h[1-6]>/gi, '</h$0>\n')
      .replace(/<\/blockquote>/gi, '</blockquote>\n');

    // validate payload
    const { error } = schema.validate(payload);
    if (error) {
      console.log('Invalid payload:', error);
    } else {
      console.log('Payload is valid');
    }
    // Log the payload
    // console.log('Payload:', payload);

    // Update the payload text state
    // setPayloadText(JSON.stringify(payload.data, null, 2)); // Pretty format JSON

    setPayloadText(formattedBody); // Set the formatted body content


    // setPayloadText(JSON.stringify(payload, null, 2)); // Pretty format JSON

  };

  const handleSendFinal = () => {
    // send final email
  };

  return (
    <div className='space-y-2 border p-4'>

      <div className="flex space-x-0">
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-3/5"
        />
        <button
          className='inline-flex w-24 items-center justify-center space-x-2 rounded-r-md px-4 py-2 text-white bg-green-500 hover:bg-green-400 transition duration-300'
          onClick={handleSendTest}
        >
          Build
        </button>
      </div>

      {/* Display payload text */}
      <div className="max-w-screen-md">

        {/* Display payload text */}
        <div className="max-w-screen-md">
          <p>Payload Text (HTML):</p>
          <p className="text-xs">Using regex to sanitize and form HTML that customer.io layout will not choke on.</p>
          <pre className="whitespace-pre-wrap max-h-40 overflow-y-auto border p-2 text-xs">{payloadText}</pre>
        </div>

        {/* Display JSON payload */}
        <div className="max-w-screen-md">
          <p>Payload JSON:</p>
          <pre className="whitespace-pre-wrap max-h-40 overflow-y-auto border p-2 text-xs">{JSON.stringify(payload, null, 2)}</pre>
        </div>


      </div>

      <div className='pt-8'>
        <p className="text-sm text-gray-500 py-2"></p>
        <button
          className='inline-flex w-48 items-center justify-center space-x-2 rounded-md px-4 py-2 text-white bg-green-500 hover:bg-green-400 transition duration-300'
          onClick={handleSendFinal}
          disabled
        >
          Send Test
        </button>
      </div>

      <div className='pt-8'>
        <p className="text-sm text-gray-500 py-2">Test emails look good? Send final to <strong>{form.section}</strong> segment:</p>
        <button
          className='inline-flex w-24 items-center justify-center space-x-2 rounded-md px-4 py-2 text-white bg-green-500 hover:bg-green-400 transition duration-300'
          onClick={handleSendFinal}
          disabled
        >
          Send
        </button>
      </div>

    </div>
  );
}
