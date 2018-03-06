'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

const controller = {};

controller.get = async(req, res, next) => {
    try {
        let data = await repository.getAll();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao listar todos os produtos!',
            data: error
        });
    }

}

controller.getBySlug = async(req, res, next) => {
    try {
        res.status(200).send(await repository.getBySlug(req.params.slug));
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao listar o produto!',
            data: error
        });
    }
};

controller.getById = async(req, res, next) => {
    try {
        res.status(200).send(await repository.getById(req.params.id));
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao listar o produto!',
            data: error
        });
    }
};

controller.getByTag = async(req, res, next) => {
    try {
        res.status(200).send(await repository.getByTag(req.params.tag));
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao listar o produto!',
            data: e
        });
    }
};

controller.post = async(req, res, next) => {
    try {
        validator(req.body);
        await repository.create(req.body);
        res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao cadastrar o produto!',
            data: error
        });
    }
};

controller.put = async(req, res, next) => {
    try {
        validator(req.body);
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Produto atualizado com sucesso!' });
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao atualiar o produto!',
            data: e
        });
    }
};

controller.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao remover o produto!',
            data: e
        });
    }
};

module.exports = controller;

function validator(data) {

    let contract = new ValidationContract();
    contract.hasMinLen(data.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(data.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(data.description, 3, 'O título deve conter pelo menos 3 caracteres');  
    
    // Se os dados forem inválidos
    if (!contract.isValid()) {
        throw contract.errors();
    }
}

