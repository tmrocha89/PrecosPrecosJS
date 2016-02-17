var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Divisao = mongoose.model('Divisao');

//middleware
router.use(function(req,res, next){
  if( !req.isAuthenticated()){
    return res.redirect('#/login');
  }
  return next();
});

router.route('/')

    //obter todas as Divisaos
    .get(function(req, res){
        Divisao.find(function(err,divisoes){
           if(err){
               return res.send(500, err);
           }
            return res.send(divisoes);
        });
    })

    //criar uma nova Divisao
    .post(function(req, res){
        var divisao = new Divisao();
        divisao.nome = req.body.nome;
        console.log(req.body);
        divisao.save(function(err){
           if(err){
               return res.send(500, err); //throw err;
           }
            return res.json(divisao);
        });
    });


router.route('/:id')

    .get(function(req,res){
        Divisao.findById(req.params.id, function(err,divisao){
           if(err){
               return res.send(500,err);
           }
            return res.json(divisao);
        });
    })

    .put(function(req,res){
        Divisao.findById(req.params.id, function(err,divisao){
           if(err){
               return res.send(500, err);
           }
            divisao.nome = req.body.nome;
            divisao.save(function(err,Divisao){
               if(err){
                   return res.send(500,err);
               }
                return res.json(divisao);
            });
        });
    })


    .delete(function(req,res){
        Divisao.remove({_id : req.params.id}, function(err){
            if(err){
                return res.send(500, err);
            }
            return res.json(req.params.id +' deleted');
        });
    });

module.exports = router;