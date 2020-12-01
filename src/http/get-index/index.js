const html = String.raw;

exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=60, s-maxage=60',
      'content-type': 'text/html; charset=utf8',
    },
    body: html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
          />
          <title>AWS Lambda WebAssembly</title>
        </head>
        <body>
          <form method="post" enctype="multipart/form-data">
            <fieldset>
              <legend>Upload an image&hellip;</legend>
              <input type="file" name="file" accept="image/*" multiple />
              <button>Upload</button>
            </fieldset>
          </form>
        </body>
      </html>
    `,
  };
};
