const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res, next) => {
    res.render('login', {title: 'Coderview'})
});
router.route('/register')
    .get((req, res, next) => {
        res.render('register', {title: 'Coderview'})
    })
    .post((req, res, next) => {
        req.checkBody('name', 'Empty Name').notEmpty();
        req.checkBody('email', 'Invalid Email').notEmpty();
        req.checkBody('password', 'Empty Password').notEmpty();
        req.checkBody('confirm', 'Password does not match').equals(req.body.confirm).notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.render('register', {
                name: req.body.name,
                email: req.body.email,
                errorMessages: errors,
                title : 'Coderview'
            });
        } else {
            let user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.setPassword(req.body.password);
            user.save((err) => {
                if (err) {
                    res.render('register', {errorMessages: err, title : 'Coderview'});
                } else {
                    res.redirect('/login');
                }
            });
        }
    });

module.exports = router;
