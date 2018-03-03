'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

const controller = {};

controller.get = (req, res, next) => {
    Product
        .find({
            active: true
        },
            'title price slug')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao listar o produto!',
                data: e
            });
        });
};

controller.getBySlug = (req, res, next) => {
    Product
        .findOne({
            slug: req.params.slug,
            active: true
        },
            'title description price slug tags')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao listar o produto!',
                data: e
            });
        });
};

controller.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao listar o produto!',
                data: e
            });
        });
};

controller.getByTag = (req, res, next) => {
    Product
        .find({
            tags: req.params.tag,
            active: true
        }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao listar o produto!',
                data: e
            });
        });
};

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
    Product
        .findByIdAndUpdate(req.params.id,
        {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            }
        })
        .then(x => {
            res.status(200).send({
                message: 'Produto atualizado com sucesso!'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao atualiar o produto!',
                data: e
            });
        });
};

controller.delete = (req, res, next) => {
    Product
        .findByIdAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({
                message: 'Produto removido com sucesso!'
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao remover o produto!',
                data: e
            });
        });
};

module.exports = controller;