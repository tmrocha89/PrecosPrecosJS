var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Marca = mongoose.model('Marca');

//middleware
/*
 duplicated!!
 Fix this later
*/
router.use(function(req,res, next){
  if( !req.isAuthenticated()){
    return res.redirect('#/login');
  }
  return next();
});

router.route('/')

    //obter todas as marcas
    .get(function(req, res){
        Marca.find(function(err,marcas){
           if(err){
               return res.send(500, err);
           }
            return res.send(marcas);
        });
    })

    //criar uma nova marca
    .post(function(req, res){
        var marca = new Marca();
        marca.nome = req.body.nome;
        marca.save(function(err){
           if(err){
               return res.send(500, err); //throw err;
           }
            return res.json(marca);
        });
    });


router.route('/:id')

    .get(function(req,res){
        Marca.findById(req.params.id, function(err,marca){
           if(err){
               return res.send(500,err);
           }
            return res.json(marca);
        });
    })

    .put(function(req,res){
        Marca.findById(req.params.id, function(err,marca){
           if(err){
               return res.send(500, err);
           }
            marca.nome = req.body.nome;
            marca.save(function(err,marca){
               if(err){
                   return res.send(500,err);
               }
                return res.json(marca);
            });
        });
    })


    .delete(function(req,res){
        Marca.remove({_id : req.params.id}, function(err){
            if(err){
                return res.send(500, err);
            }
            return res.json(req.params.id +' deleted');
        });
    });

module.exports = router;