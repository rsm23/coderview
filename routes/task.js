const express = require('express');
const router = express.Router();

router.get('/createTask', (req, res) => {
    let newTask = new Task();

    newTask.save((err, data) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/task/' + data._id);
        }
    });
});

router.get('/task/:id', (req, res) => {
    if (req.params.id) {
        Task.findOne({_id: req.params.id}, (err, data) => {
            if (err) {
                res.render('error');
            }
            if(data) {
                console.log(data.id);
                res.render('task', {data: data, roomId: data.id});
            } else {
                res.render('error')
            }
        })
    } else {
        res.redner('error');
    }
});

module.exports = router;
