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
  /* const listing = JSON.parse(event.body);
  if (!listing) {
    return {statusCode: 200};
  } */
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
    return {statusCode: 200};
  }
  const users = [];
  snapshot.forEach(function(doc) {
    users.push(doc.id);
  });
  client.transmissions
    .send({
      content: {
        from: 'info@cofind.eu',
        subject: 'Hello, World!',
        html: '<html><body><p>My cool email.</p></body></html>'
      },
      recipients: [{address: 'kaspar.arme@gmail.com'}]
    })
    .then(data => {
      console.log('Woohoo! You just sent your first mailing!');
      console.log(data);
    })
    .catch(err => {
      console.log('Whoops! Something went wrong');
      console.log(err);
    });
  return {statusCode: 200, body: JSON.stringify(users)};
};
