'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

const repository = {};

repository.getAll = async() => {
    let res = await Product.find({
            active: true
        }, 'title price slug');

    return res;
}

repository.getBySlug = async(slug) => {
    return await Product
        .findOne({
            slug: slug,
            active: true
        }, 'title description price slug tags');
}

repository.getById= async(id) => {
    return await Product.findById(id);
}

repository.getByTag = async(tag) => {
    return await Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags')
}

repository.create = async(data) => {
    let product = new Product(data);
    await product.save();
}

repository.update = async(id, data) => {
    await Product
        .findByIdAndUpdate(id,
        {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price
            }
        })
}

repository.delete = async(id) => {
    await Product.findByIdAndRemove(id);
}

module.exports = repository;

