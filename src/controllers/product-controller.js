'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

const controller = {};

controller.post = (req, res, next) => {
    let product = new Product(req.body);
    product
        .save()
        .then(x => {
            res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto!',
                data: e
            });
        });
};

controller.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send(
        {
            id: id,
            item: req.body
        });
};

controller.delete = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send(
        {
            id: id,
            item: req.body
        });
};

module.exports = controller;