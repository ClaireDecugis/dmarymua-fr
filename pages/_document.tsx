import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="fr" style={{ height: "100%" }}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Description " />
          <meta name="keywords" content="mots-clés, associés, à, votre, site" />
          <meta property="og:title" content="Titre du site" />
          <meta property="og:description" content="Description " />
          <meta property="og:image" content="URL de l'image" />
          <meta property="og:url" content="URL " />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body style={{ margin: 0, height: "100%" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
