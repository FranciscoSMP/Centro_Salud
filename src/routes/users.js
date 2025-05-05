const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    const role = req.body;
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('dashboard', { user: req.user });
    } else {
        req.flash('error_msg', 'Por favor, inicie sesión');
        res.redirect('/users/login');
    }
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'Has cerrado sesión');
        res.redirect('/users/login');
    });
});

module.exports = router;
