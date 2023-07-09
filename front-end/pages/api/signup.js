// pages/api/signup.js
import bcrypt from 'bcrypt';
import nextConnect from 'next-connect';
import database from '../../lib/mongodb';

const handler = nextConnect();

handler.use(database);

handler.post(async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 14);
    const user = { username, password: passwordHash, email };

    // Check if the username or email already exists
    const existingUser = await req.db.collection('users').findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Insert the user in the database
    await req.db.collection('users').insertOne(user);
    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

export default handler;
