import { apiVersion, dataset, projectId, useCdn } from '@/lib/sanity/config';
import { createClient } from 'next-sanity';
import { NextRequest, NextResponse } from 'next/server';

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-03-25' // move me to config.ts
};

const client = createClient(config);
// console.log('client', client);
// console.log('dataset', dataset);
// console.log('projectId', projectId);
// console.log('apiVersion', apiVersion);
// console.log('useCdn', useCdn);
// console.log('token', process...env.SANITY_API_TOKEN);
async function createComment(req: NextRequest, res: NextResponse) {
  // return NextResponse.json({ message: 'Comment submitted' }, { status: 200 });
  // De-structuring the form's fields
  const body = await req.json();

  const { _id, name, email, comment } = body;

  // console.log('Received comment data:', body);
  // console.log('Post _id:', _id);
  try {
    // Creating a document in sanity studio CMS for Comments with creating a schema for it
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id
      },
      name,
      email,
      comment
    });
    console.log('Comment submitted');
    return NextResponse.json({ message: 'Comment made!' }, { status: 200 });
  } catch (err) {
    console.error('Error creating comment:', err);
    return NextResponse.json(
      { message: 'Could not submit comment' },
      { status: 500 }
    );
  }

  console.log('yay, comment submitted');
  return NextResponse.json({ message: 'Comment made!' }, { status: 200 });
}

export { createComment as POST };
