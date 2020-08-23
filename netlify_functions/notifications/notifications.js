const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST_API_KEY, {
  origin: 'https://api.eu.sparkpost.com:443'
});
const admin = require('firebase-admin');
const serviceFile = require('./firebase_key.json');
const serviceAccount = {
  ...serviceFile,
  private_key: process.env.SERVICE_KEY.replace(/\\n/g, '\n')
};

exports.handler = async function(event, context, callback) {
  const defaultResponse = {statusCode: 200, body: '{}'};
  const listing = JSON.parse(event.body);
  if (!listing) {
    return defaultResponse;
  }
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://cofind-2f876.firebaseio.com'
    });
  }
  const db = admin.firestore();
  const snapshot = await db
    .collection('users')
    .where('notifications', '==', true)
    .get();

  if (snapshot.empty) {
    return defaultResponse;
  }
  const users = [];
  snapshot.forEach(function(doc) {
    if (doc.id !== listing.ignore) {
      users.push({address: doc.id});
    }
  });
  const {title, link, text} = listing;
  client.transmissions.send({
    content: {
      from: 'info@cofind.eu',
      subject: title,
      html: `<html><body><p>${text} <a href=${link}>${link}</a></p></body></html>`
    },
    recipients: users
  });
  return defaultResponse;
};
