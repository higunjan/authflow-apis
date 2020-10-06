const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({})

const userService = require('./user.service');
const Schema = require('../../helpers/req-validator');

// routes
router.post('/authenticate', authenticate);
router.post('/register', UPLOAD_FILE.any(), validator.body(Schema.registerSchema), register);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', UPLOAD_FILE.any(), validator.body(Schema.registerSchema), update);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

async function register(req, res, next) {
    let fileName = req.files[0].path;
    req.body.image = fileName;
    req.body.skill = JSON.parse(req.body.skill);
    // res.json("validate");
    userService.create(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function update(req, res, next) {
    let fileName = req.files[0].path;
    req.body.image = fileName;
    req.body.skill = JSON.parse(req.body.skill);
    userService.update(req.params.id, req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}