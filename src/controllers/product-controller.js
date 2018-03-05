'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

const controller = {};

controller.get = (req, res, next) => {
    repository
        .getAll()
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
    repository
        .getBySlug(req.params.slug)
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
    repository
        .getById(req.params.id)
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
    repository
        .getByTag(req.params.tag)
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
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }


    repository
        .create(req.body)
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
    repository
        .update(req.params.id, req.body)
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
    repository
        .delete(req.params.id)
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