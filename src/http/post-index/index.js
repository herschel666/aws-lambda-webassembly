const Busboy = require('busboy');
const photon = require('@silvia-odwyer/photon-node');

const parseRequestPayload = (req) =>
  new Promise((resolve, reject) => {
    const file = {};
    const bb = new Busboy({
      headers: req.headers,
    });

    bb.on('file', (fieldname, obj, filename, encoding, mimetype) => {
      obj.on('data', (data) => {
        file.content = data;
      });

      obj.on('end', () => {
        if (file.content) {
          file.filename = filename;
          file.contentType = mimetype;
          file.encoding = encoding;
          file.fieldname = fieldname;
        }
      });
    });
    bb.on('error', reject);
    bb.on('finish', () => resolve(file));
    bb.write(req.body, 'base64');
    bb.end();
  });

exports.handler = async (req) => {
  const file = await parseRequestPayload(req);
  const suffix = file.contentType.split('/').pop();
  const phtn = photon.PhotonImage.new_from_base64(
    file.content.toString('base64')
  );
  photon.grayscale_human_corrected(phtn);

  return {
    statusCode: 200,
    headers: {
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': file.contentType,
      'content-disposition': `attachment; filename=aws-lambda-webassembly.${suffix}`,
    },
    isBase64Encoded: true,
    body: phtn.get_base64().replace(/^data:image\/\w+;base64,/, ''),
  };
};
