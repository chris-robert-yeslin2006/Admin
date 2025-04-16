import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="LinguaHub - Language Learning Platform" />
        <meta name="author" content="LinguaHub" />
        <meta property="og:title" content="LinguaHub - Language Learning Platform" />
        <meta property="og:description" content="Learn languages with our interactive platform" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/images/og-image.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}