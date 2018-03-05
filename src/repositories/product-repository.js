'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

const repository = {};

repository.getAll = () => {
    return Product
        .find({
            active: true
        }, 'title price slug')
}

repository.getBySlug = (slug) => {
    return Product
        .findOne({
            slug: slug,
            active: true
        }, 'title description price slug tags');
}

repository.getById= (id) => {
    return Product.findById(id);
}

repository.getByTag = (tag) => {
    return Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags')
}

repository.create = (data) => {
    let product = new Product(data);
    return product.save()
}

repository.update = (id, data) => {
    return Product
        .findByIdAndUpdate(id,
        {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price
            }
        })
}

repository.delete = (id) => {
    return Product.findByIdAndRemove(id);
}

module.exports = repository;

