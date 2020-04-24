const functions = require('firebase-functions');

exports.helloWorld = functions.https.onCall((request, response) => {
 return("Hello from Firebase!");
});

exports.getDataFromFirebase = functions.https.onCall((request, response) => {
  const db = {  labs:{},
                nodes:{},
                specimens:{},
                content:{}  };

});
