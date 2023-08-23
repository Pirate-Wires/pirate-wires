// emails/newsletter.tsx
import { Body, Container, Head, Heading, Html, Img, Link, Preview, Tailwind, Text, Column, Row, Hr } from '@react-email/components';
import * as React from 'react';

export interface NewsletterEmailProps {
  title?: string;
  subTitle?: string;
  date?: string;
  section?: string;
  authorName?: string;
  authorSlug?: string;
  authorImageUrl?: string;
  sectionImageUrl?: string;
}

const defaultValues: NewsletterEmailProps = {
  title: "San Francisco's Homeless Ticking Time Bomb",
  subTitle: "the majority of the city's homelessness budget goes to keeping people in no-contingency housing units, permanently. what happens when the city can't pay the bill?",
  date: 'AUG 17',
  authorName: 'Sanjana Friedman',
  authorSlug: 'sanjana-friedman',
  sectionImageUrl: 'https://substackcdn.com/image/fetch/e_trim:10:white/e_trim:10:transparent/h_56,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F24c4d637-c799-4b1b-9e80-e075956a959a_1500x325.png',
};

const NewsletterEmail = (props: NewsletterEmailProps) => {

  const mergedProps = { ...defaultValues, ...props };

  const main = {
    backgroundColor: '#ffffff',
  };

  const container = {
    paddingLeft: '12px',
    paddingRight: '12px',
    margin: '0 auto',
  };

  const h1 = {
    color: '#333',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
  };

  const link = {
    color: '#2754C5',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    textDecoration: 'underline',
  };

  const text = {
    color: '#333',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    margin: '24px 0',
  };

  const footer = {
    color: '#898989',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '12px',
    lineHeight: '22px',
    marginTop: '12px',
    marginBottom: '24px',
  };

  const code = {
    display: 'inline-block',
    padding: '16px 4.5%',
    width: '90.5%',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
    border: '1px solid #eee',
    color: '#333',
  };

  return (
    <Html>
      <Head />
      <Preview>Pirate Wires Newsletter</Preview>
      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Img
              src={mergedProps.sectionImageUrl}
              alt="Cat"
              className="mx-auto mt-24"
              width="200"
            />
            <Heading style={h1} className="text-2xl">
              {mergedProps.title}
            </Heading>
            <Text style={text}>{mergedProps.subTitle}</Text>
            <Row>
              <Column>
                <Link href={`/author/${mergedProps.authorSlug}`}>
                  <Text style={text}>
                    {mergedProps.authorName}
                    <br />
                    {mergedProps.date}
                  </Text>
                </Link>
              </Column>
              <Column>
                <Link href={`/author/${mergedProps.authorSlug}`}>
                  <Img
                    src={mergedProps.authorImageUrl}
                    className="rounded-full"
                    width="50"
                    height="50"
                  />
                </Link>
              </Column>
            </Row>
            <Hr />
            <Text style={footer}>
              <Link
                href="https://piratewires.com"
                target="_blank"
                style={{ ...link, color: '#898989' }}
              >
                piratewires.com
              </Link>
              , politics, culture, technology
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NewsletterEmail;
