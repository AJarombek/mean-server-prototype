// Author: Andrew Jarombek
// Date: 2/25/2018
// MongoDB JavaScript code

db.test.insert({"time":Date()});

db.test.find().pretty();
db.test.count();

// Delete all the documents in the test collection
db.test.deleteMany({});