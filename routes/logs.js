const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route GET api/logs
// @desc  Get all logs
// @access  Private
router.get('/', async (req, res) => {
  const logs = await Log.find();
  res.json(logs);
});

// @route POST api/logs
// @desc  Add new log
// @access  Private
router.post(
  '/',
  [
    check('message', 'Message is required')
      .not()
      .isEmpty(),
    check('tech', 'Technician name required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, tech, attention } = req.body;

    try {
      const newLog = new Log({
        message,
        tech,
        attention
      });

      const log = await newLog.save();
      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route PUT api/logs/:id
// @desc  Update log
// @access  Private
router.put('/:id', async (req, res) => {
  const { message, tech, attention } = req.body;

  const logParams = {};
  if (message) logParams.message = message;
  if (tech) logParams.tech = tech;
  if ('attention' in req.body) logParams.attention = attention;

  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logParams },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/logs/:id
// @desc  Delete log
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    // find the log by the id passed in the request parameters
    let log = await Log.findById(req.params.id);

    //if the log isnt found
    if (!log) return res.status(404).json({ msg: 'Log not found' });

    //dont use delete method as its deprecated
    await Log.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Log removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
