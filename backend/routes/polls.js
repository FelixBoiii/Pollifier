const express = require('express')
const router = express.Router()
const Poll = require('../models/poll')

// Getting all
router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find()
    res.json(polls)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getpoll, (req, res) => {
  res.json(res.poll)
})

// Creating one
router.post('/', async (req, res) => {
  const poll = new Poll({
    name: req.body.name,
    options: req.body.options
  })
  try {
    const newpoll = await poll.save()
    res.status(201).json(newpoll)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getpoll, async (req, res) => {
  if (req.body.name != null) {
    res.poll.name = req.body.name
  }
  if (req.body.options != null) {
    res.poll.options = req.body.options
  }
  try {
    const updatedpoll = await res.poll.save()
    res.json(updatedpoll)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getpoll, async (req, res) => {
  try {
    await res.poll.remove()
    res.json({ message: 'Deleted poll' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getpoll(req, res, next) {
  let poll
  try {
    poll = await Poll.findById(req.params.id)
    if (poll == null) {
      return res.status(404).json({ message: 'Cannot find poll' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.poll = poll
  next()
}

module.exports = router