const schema = {
  name: 'comments',
  type: 'document',
  title: 'Comments',
  fields: [
    {
      name: 'name',
      type: 'string'
    },
    {
      // To make sure only comments that are approved by the author would show on the blog post
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: "comments won't show on the site without approval"
    },
    {
      name: 'email',
      type: 'string'
    },
    {
      name: 'comments',
      type: 'text'
    },
    {
      name: 'post',
      type: 'reference',
      to: [{ type: 'post' }]
    }
  ]
};

export default schema;
