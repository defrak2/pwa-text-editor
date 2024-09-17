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
export const putDb = async (content) => { // Removed id parameter
  console.log('PUT to the database');
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    // Store the content with an auto-incremented ID
    const request = store.put({ jate: content }); // No need to pass id
    const result = await request;
    console.log('Data saved to the database', result);
  } catch (error) {
    console.error('Error saving data to the database', error);
  }
};

// Get content from the database by ID
export const getDb = async (id) => {
  console.log('GET from the database');
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    // Retrieve the content by ID
    const request = store.get(Number(id)); // Ensure ID is a number
    const result = await request;

    if (result) {
      console.log('Retrieved data:', result); // Log the entire object
    } else {
      console.log('No data found for the specified ID.');
    }
    return result;
  } catch (error) {
    console.error('Error retrieving data from the database', error);
  }
};

initdb();