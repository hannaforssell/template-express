const { ObjectId } = require('mongodb');
const mongo = require('./mongoService');

const collection = () => mongo.connection.collection('cars');

async function getMany(skip, limit) {
    let cars = await collection().find({ 'isDeleted': false }).skip(skip).limit(limit).toArray();
    for(let car of cars) {
        delete car.isDeleted;
    }
    return cars;
}

async function get(id) {
    let car = await collection().findOne({ '_id': new ObjectId(id), 'isDeleted': false });
    delete car.isDeleted;
    return car;
}

async function create(car) {
    car.isDeleted = false;
    return await collection().insertOne(car);
}

async function replace(id, car) {
    car.isDeleted = false;
    return await collection().replaceOne({ '_id': new ObjectId(id), 'isDeleted': false }, car);
}

async function remove(id) {
    // Updates the boolean isDeleted to true
    return await collection().updateOne({ '_id': new ObjectId(id) }, { $set: { isDeleted: true } });
}

module.exports = {
    getMany,
    get,
    create,
    replace,
    remove
}
