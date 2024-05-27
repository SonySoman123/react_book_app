// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user
        user = new User({
            username,
            email,
            password,
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Return the JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            'your_jwt_secret', // Use your own secret
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post(
    '/login',
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let user = await User.findOne({ email });
  
        if (!user) {
          return res.status(400).json({ msg: 'Invalid Credentials' });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid Credentials' });
        }
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 360000
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.log("sssss");
        console.error(err.message);
        console.log("eeeeee");
        res.status(500).send('Server error');
      }
    }
  );
  

module.exports = router;
