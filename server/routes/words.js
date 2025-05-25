const express = require('express');
const router = express.Router();
const Word = require('../models/Word');

// GET all words
router.get('/', async (req, res) => {
  try {
    const words = await Word.find().sort({ createdAt: -1 });
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET specific word by ID (more specific route)
router.get('/:id', async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }
    res.json(word);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET words by search query (more specific route)
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query.toLowerCase();
    const words = await Word.find({
      $or: [
        { word: { $regex: query, $options: 'i' } },
        { definition: { $regex: query, $options: 'i' } }
      ]
    });
    
    if (words.length === 0) {
      return res.status(404).json({ message: 'No words found' });
    }
    
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new word
router.post('/', async (req, res) => {
  const { word, definition, imageUrl, videoUrl } = req.body;
  
  if (!word || !definition || !imageUrl || !videoUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newWord = new Word({
    word,
    definition,
    imageUrl,
    videoUrl
  });

  try {
    const savedWord = await newWord.save();
    res.status(201).json(savedWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a word
router.put('/:id', async (req, res) => {
  try {
    const updatedWord = await Word.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWord) {
      return res.status(404).json({ message: 'Word not found' });
    }
    res.json(updatedWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a word
router.delete('/:id', async (req, res) => {
  try {
    const deletedWord = await Word.findByIdAndDelete(req.params.id);
    if (!deletedWord) {
      return res.status(404).json({ message: 'Word not found' });
    }
    res.json({ message: 'Word deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;