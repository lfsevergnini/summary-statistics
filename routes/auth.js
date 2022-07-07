const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();

const userRepository = require('../repositories/users');

router.post('/token', (req, res) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Generate a token for a user.'
    #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/definitions/UserLogin" }
    }
    #swagger.responses[200] = {
        description: "JWT token",
        content: {
            "application/json": {
                schema:{
                    $ref: "#/definitions/UserJWT"
                }
            }
        }
    }
  */
  const { username, password } = req.body;
  const user = userRepository.retrieveByUsernameAndPassword(username, password);

  if (user) {
    const token = jwt.sign({
      name: user.name,
      username: user.username,
    }, process.env.JWT_KEY);

    return res.send({ token });
  }

  return res.status(401).send();
});

module.exports = router;
