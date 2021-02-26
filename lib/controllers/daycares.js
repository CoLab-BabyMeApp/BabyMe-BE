const { Router } = require('express');
const Daycare = require('../models/daycare');

module.exports = Router()
  .post('/', (req, res, next) => {
    Daycare
      .insert({ ...req.body })
      .then(daycare => res.send(daycare))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Daycare.getDaycares()
      .then(daycares => res.send(daycares))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    Daycare.update({ ...req.body }, req.params.id)
      .then(daycare => res.send(daycare))
      .catch(next);
  })
  .delete('/:id', async (req, res, next) => {
    Daycare.deleteDaycare(req.params.id)
      .then(daycare => res.send(daycare))
      .catch(next);
  });
