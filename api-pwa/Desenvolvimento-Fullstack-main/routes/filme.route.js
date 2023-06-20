const express = require('express');
const app = express();
const pedidoRoutes = express.Router();

let Filme = require('../model/Filme');

// api to add filme
pedidoRoutes.route('/add').post(function (req, res) {
  let filme = new Filme(req.body);
  filme.save()
  .then(filme => {
    res.status(200).json({'status': 'success','mssg': 'filme added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get pedidos
pedidoRoutes.route('/').get(function (req, res) {
  Filme.find(function (err, pedidos){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','pedidos': pedidos});
    }
  });
});

// api to get filme
pedidoRoutes.route('/filme/:id').get(function (req, res) {
  let id = req.params.id;
  Filme.findById(id, function (err, filme){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','filme': filme});
    }
  });
});

// api to update route
pedidoRoutes.route('/update/:id').put(function (req, res) {
    Filme.findById(req.params.id, function(err, filme) {
    if (!filme){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        filme.name = req.body.name;
        filme.filme = req.body.filme;

        filme.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
pedidoRoutes.route('/delete/:id').delete(function (req, res) {
  Filme.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = pedidoRoutes;