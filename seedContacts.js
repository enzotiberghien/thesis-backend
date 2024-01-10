const faker = require('faker');
const mongoose = require('mongoose');
const Contact = require('./models/contactModel');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();


const generateRandomContacts = (numberOfContacts) => {
  const contacts = [];

  for (let i = 0; i < numberOfContacts; i++) {
    contacts.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
      address: {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zipCode: faker.address.zipCode(),
        country: faker.address.country(),
      },
    });
  }

  return contacts;

};


const insertRandomContacts = async (numberOfContacts) => {
  try {
    const contactsToInsert = generateRandomContacts(numberOfContacts);
    await Contact.insertMany(contactsToInsert);
    console.log(`${numberOfContacts} contacts have been successfully added.`);
  } catch (error) {
    console.error('Error inserting contacts:', error);
  }
};


const seedDB = async () => {
  try {
    await Contact.deleteMany({});
    console.log('Existing contacts cleared.');

     // Get the number of contacts to seed from the command line argument
     let numberOfContacts = parseInt(process.argv[2], 10) || 100; // Default to 100 if no argument is provided

     // Validate the number and ensure it does not exceed 10,000
     if (isNaN(numberOfContacts)) {
       throw new Error('Invalid number of contacts provided.');
     }
 
     if (numberOfContacts > 10000) {
       console.log('Number of contacts is limited to 10,000. Seeding 10,000 contacts.');
       numberOfContacts = 10000;
     }

    await insertRandomContacts(numberOfContacts);

    console.log('Seeding complete. Closing database connection.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding contacts:', error);
    mongoose.connection.close();
  }
};


seedDB()