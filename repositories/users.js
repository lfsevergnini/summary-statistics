const fs = require('fs');

const users = JSON.parse(fs.readFileSync('repositories/users.json'));

const UserRepository = {
  retrieveByUsernameAndPassword:
    (username, password) => users.find((u) => u.username === username && u.password === password),
};

module.exports = UserRepository;
