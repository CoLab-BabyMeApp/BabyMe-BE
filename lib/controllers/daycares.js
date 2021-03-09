const { Router } = require('express');
const Daycare = require('../models/Daycare');

module.exports = Router()
  .post('/', (req, res, next) => {
    Daycare
      .insert({ ...req.body })
      .then(daycare => res.send(daycare))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Daycare
      .findAllDaycares({ ...req.body })
      .then(daycare => res.send(daycare))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Daycare
      .findDaycareById(req.params.id)
      .then(daycare => res.send(daycare))
      .catch(next)
  })
  .put('/:id', (req, res, next) => {
    Daycare
      .updateDaycareById(req.params.id, req.body)
      .then(daycare => res.send(daycare))
      .catch(next);
  })
  .delete('/:id', async (req, res, next) => {
    Daycare
      .deleteDaycare(req.params.id)
      .then(daycare => res.send(daycare))
      .catch(next);
  });
