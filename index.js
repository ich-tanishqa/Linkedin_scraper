const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Profile = sequelize.define('Profile', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  followerCount: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  connectionCount: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

const app = express();
app.use(bodyParser.json());

// POST API to add LinkedIn profile data
app.post('/api/profiles', async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json
    (profile);
} catch (error) {
res.status(400).json({ error: error.message });
}
});

// GET API to fetch all LinkedIn profiles
app.get('/api/profiles', async (req, res) => {
try {
const profiles = await Profile.findAll();
res.status(200).json(profiles);
} catch (error) {
res.status(500).json({ error: error.message });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
await sequelize.sync();
console.log('Server is running on port ${PORT}');
});