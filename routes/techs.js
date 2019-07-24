const express = require('express');
const router = express.Router();
const Tech = require('../models/Tech');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route GET api/techs
// @desc  Get all techs
// @access  Private
router.get('/', async (req, res) => {
  const techs = await Tech.find();
  res.json(techs);
});

// @route POST api/techs
// @desc  Add new tech
// @access  Private
router.post(
  '/',
  [
    check('firstName', 'First Name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Last Name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName } = req.body;

    try {
      const newTech = new Tech({
        firstName,
        lastName
      });

      const tech = await newTech.save();
      res.json(tech);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/techs/:id
// @desc  Delete log
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    // find the tech by the id passed in the request parameters
    let tech = await Tech.findById(req.params.id);

    //if the tech isnt found
    if (!tech) return res.status(404).json({ msg: 'Technician not found' });

    //dont use delete method as its deprecated
    await Tech.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Technician removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
