//pages/api/login.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nextConnect from 'next-connect';
import database from '../../lib/mongodb';

const handler = nextConnect();

handler.use(database);

handler.post(async (req, res) => {
  try {
    const { username, password } = req.body;

    // Get user from database
    const user = await req.db.collection('users').findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Set JWT token as a cookie
    res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; ${
        process.env.NODE_ENV === "production" ? "Secure;" : ""
      }`
    );

    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

export default handler;
