// lib/sanity/schemas/send-button.js

export default {
  name: 'sendButton',
  title: 'Send Button',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      readOnly: true
    },
    {
      name: 'body',
      type: 'text',
      readOnly: true
    }
  ]
}
