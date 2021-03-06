const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017/callsdb';

const dbModule = {};

insertCallData = (callData) => {
  // Use connect method to connect to the Server
  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);

      // Get the documents collection
      const collection = db.collection('calls');

      // Insert some users
      collection.insert(callData, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Inseted into DB: ', result.length, result);
        }
        db.close();
      });
    }
  });
};

dbModule.insertCallData = insertCallData;

find = (findBy) => {
  return new Promise((fulfill) => {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', url);

        const collection = db.collection('calls');

        collection.find(findBy).toArray((error, result) => {
          if (error) {
            console.log(error);
            fulfill(false);
          } else if (result.length) {
            fulfill(result);
          } else {
            console.log('No Previous Analysis Has Been Done');
            fulfill(false);
          }
        });
        db.close();
      }
    });
  });
};

dbModule.find = find;

drop = () => {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);

      const collection = db.collection('calls');

      collection.drop();
      db.close();
    }
  });
};

dbModule.drop = drop;

module.exports = dbModule;
