var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Imagem = mongoose.model('Imagem');

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

    //obter todas as Divisaos
    .get(function(req, res){
        Imagem.find(function(err,imagens){
           if(err){
               return res.send(500, err);
           }
            return res.send(imagens);
        });
    })

    //criar uma nova Imagem
    .post(function(req, res){
        var imagem = new Imagem();
        imagem.nome = req.body.nome;
        imagem.tipo = req.body.tipo;
        imagem.data = req.body.data;

        imagem.save(function(err){
           if(err){
               return res.send(500, err); //throw err;
           }
            return res.json(imagem);
        });
    });


router.route('/:id')

    .get(function(req,res){
        Imagem.findById(req.params.id, function(err,imagem){
           if(err){
               return res.send(500,err);
           }
            return res.json(imagem);
        });
    })

    .put(function(req,res){
        Imagem.findById(req.params.id, function(err,imagem){
           if(err){
               return res.send(500, err);
           }
            imagem.nome = req.body.nome;
            imagem.tipo = req.body.tipo;
            imagem.data = req.body.data;
            imagem.save(function(err,Imagem){
               if(err){
                   return res.send(500,err);
               }
                return res.json(imagem);
            });
        });
    })


    .delete(function(req,res){
        Imagem.remove({_id : req.params.id}, function(err){
            if(err){
                return res.send(500, err);
            }
            return res.json(req.params.id +' deleted');
        });
    });

module.exports = router;