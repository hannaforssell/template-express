const carService = require('../services/carService');

async function getMany(req, res, next) {
  try {
    let skip = 0;
    let limit = 10;

    if (!isNaN(req.query.skip)) {
      skip = Number(req.query.skip);
    }

    if (!isNaN(req.query.limit)) {
      limit = Number(req.query.limit);
    }

    if (limit > 20) {
      limit = 20;
    }

    res.json(await carService.getMany(skip, limit));
  } catch (err) {
      console.error(`Error while getting cars`, err.message);
      next(err);
  }
}

async function get(req, res, next) {
  try {
      let result = await carService.get(req.params.id);
      if (result != null) {
        res.json(result);
      } else {
        res.status(404);
        res.json({ 'message': 'car not found' });
      }

  } catch (err) {
      console.error(`Error while getting car`, err.message);
      next(err);
  }
}

async function create(req, res, next) {
  try {
    let result = await carService.create(req.body);
    res.status(201);
    res.json({'message': 'success', 'id': result.insertedId});
  } catch (err) {
    console.error(`Error while creating car`, err.message);
    next(err);
  }
}

async function replace(req, res, next) {
  try {
    let result = await carService.replace(req.params.id, req.body);

    if (result.modifiedCount == 1) {
      res.json({'message': 'success', 'id': req.params.id});
    } else {
      res.status(404);
      res.json({ 'message': 'car not found' });
    }
  } catch (err) {
    console.error(`Error while updating car`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await carService.remove(req.params.id);
    res.json({'message': 'success'});
  } catch (err) {
    console.error(`Error while deleting car`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  getMany,
  create,
  replace,
  remove
};
