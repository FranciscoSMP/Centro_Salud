const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../lib/auth');
const passport = require('passport');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        user: req.user
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'Ha cerrado sesión');
        res.redirect('/');
    });
});

module.exports = router;
