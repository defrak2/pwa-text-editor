import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { 
  console.log('PUT to the database');
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');


    const request = store.put({ jate: content }); 
    const result = await request;
    console.log('Data saved to the database', result);
  } catch (error) {
    console.error('Error saving data to the database', error);
  }
};


export const getDb = async () => {
  console.log('GET from the database');
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');


    const request = store.get(1); 
    const result = await request;

    if (result) {
      console.log('Retrieved data:', result); 
    } else {
      console.log('No data found for the specified ID.');
    }
    return result;
  } catch (error) {
    console.error('Error retrieving data from the database', error);
  }
};

initdb();