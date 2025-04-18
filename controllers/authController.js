const bcrypt = require('bcryptjs');
const userDB = require('../models/userDB');
const jwt = require('jsonwebtoken');

// Show registration form
exports.showRegister = (req, res) => {
  res.render('register');
};

// Register a new user (default role: student)
exports.register = async (req, res) => {
  const { fullname, email, username, password, role } = req.body;

  userDB.findOne({ username }, async (err, existingUser) => {
    if (err) return res.send('Error checking for existing user');
    if (existingUser) {
      return res.render('register', { error: 'Username already exists. Please choose another.' });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      fullname,
      email,
      username,
      password: hashedPassword,
      role: role || 'user'  
    };

    userDB.insert(user, (err, newUser) => {
      if (err) return res.send('Error registering user');
      req.session.user = newUser;

      // Redirect based on role
      if (newUser.role === 'organiser') {
        res.redirect('/dashboard');
      } else {
        res.redirect('/');
      }
    });
  });
};

// Show login form
exports.showLogin = (req, res) => {
  res.render('login');
};

// Handle login
exports.login = (req, res) => {
  const { username, password } = req.body;

  userDB.findOne({ username }, async (err, user) => {
    if (!user) return res.render('login', { error: 'User not found.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.render('login', { error: 'Incorrect password.' });

    //Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    //Store token in cookie or session
    req.session.token = token; // Or res.cookie('token', token)
    req.session.user = user;

    res.redirect('/dashboard');
  });
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
