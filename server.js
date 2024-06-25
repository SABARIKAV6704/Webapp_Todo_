const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// MongoDB Atlas connection string
mongoose.connect('mongodb+srv://sabarikav21csd:W8f3wL5bZ1WjZmyN@cluster0.dcclsgq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB database');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Define user schema and model for authentication
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true }, // Added username field
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Define todo schema and model
const todoSchema = new mongoose.Schema({
  todo: { type: String, required: true },
});

const Todo = mongoose.model('Todo', todoSchema);

// Middleware
app.use(express.json());
app.use(cors());

// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, confirmPassword } = req.body;

    // Validate input fields
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed. Please try again.' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

// POST route for creating a new 'todo' document
app.post('/posting', async (req, res) => {
  try {
    const { todo } = req.body;

    if (!todo) {
      return res.status(400).json({ message: 'Todo is required' });
    }

    const newTodo = new Todo({
      todo,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// GET route for retrieving all 'todo' documents
app.get('/getting', async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (error) {
    console.error('Error retrieving todos:', error);
    res.status(500).json({ message: 'Failed to retrieve todos' });
  }
});

// PUT route for updating a 'todo' document by ID
app.put('/updating/:id', async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { todo },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error('Failed to update todo:', error);
    res.status(500).json({ message: 'Failed to update todo' });
  }
});

// DELETE route for deleting a 'todo' document by ID
app.delete('/deleting/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Failed to delete todo:', error);
    res.status(500).json({ message: 'Failed to delete todo' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
