const express = require('express');
const passport = require('passport');
const { generateToken } = require('../utils/jwt');
const router = express.Router();

// Step 1: Redirect to Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Step 2: Google callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    // Step 3: Successful login, generate token
    const token = generateToken(req.user);
    console.log('Generated token:', token);


    // Redirect with token as query param (or set cookie)
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  }
);

router.get('/failure', (req, res) => {
  res.send("Failed to log in via Google.");
});

module.exports = router;
