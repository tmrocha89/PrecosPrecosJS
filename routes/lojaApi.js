var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Loja = mongoose.model('Loja');

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
        Loja.find(function(err,lojas){
           if(err){
               return res.send(500, err);
           }
            return res.send(lojas);
        });
    })

    //criar uma nova Loja
    .post(function(req, res){
        var loja = new Loja();
        loja.nome = req.body.nome;
        loja.local = req.body.local;
        console.log(req.body);
        loja.save(function(err){
           if(err){
               return res.send(500, err); //throw err;
           }
            return res.json(loja);
        });
    });


router.route('/:id')

    .get(function(req,res){
        Loja.findById(req.params.id, function(err,loja){
           if(err){
               return res.send(500,err);
           }
            return res.json(loja);
        });
    })

    .put(function(req,res){
        Loja.findById(req.params.id, function(err,loja){
           if(err){
               return res.send(500, err);
           }
            loja.nome = req.body.nome;
            loja.local = req.body.local;
            loja.save(function(err,Loja){
               if(err){
                   return res.send(500,err);
               }
                return res.json(loja);
            });
        });
    })


    .delete(function(req,res){
        Loja.remove({_id : req.params.id}, function(err){
            if(err){
                return res.send(500, err);
            }
            return res.json(req.params.id +' deleted');
        });
    });

module.exports = router;