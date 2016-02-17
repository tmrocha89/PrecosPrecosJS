var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Preco = mongoose.model('Preco');

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
      Preco.find({})
        .populate('loja')
        .exec(function(err,precos){
            if(err){
               return res.send(500, err);
            }
            return res.send(precos);
        });
      /*
        Preco.find(function(err,precos){
           if(err){
               return res.send(500, err);
           }
            return res.send(precos);
        });
        */
    })

    //criar uma nova Preco
    .post(function(req, res){
        var preco = new Preco();
        preco.valor = req.body.nome;
        preco.eCampanha = req.body.eCampanha;
        preco.loja.push(req.body.lojaId);
        console.log(req.body);
        preco.save(function(err){
           if(err){
               return res.send(500, err); //throw err;
           }
            return res.json(preco);
        });
    });


router.route('/:id')

    .get(function(req,res){
        Preco.findById({_id : req.params.id})
          .populate('loja')
          .exec(function(err,preco){
           if(err){
               return res.send(500,err);
           }
            return res.json(preco);
        });
    })

    .put(function(req,res){
        Preco.findById(req.params.id, function(err,preco){
           if(err){
               return res.send(500, err);
           }
            preco.valor = req.body.nome;
            preco.eCampanha = req.body.eCampanha;
            preco.loja.push(req.body.lojaId);         //fix this !!
            preco.save(function(err,Preco){
               if(err){
                   return res.send(500,err);
               }
                return res.json(preco);
            });
        });
    })


    .delete(function(req,res){
        Preco.remove({_id : req.params.id}, function(err){
            if(err){
                return res.send(500, err);
            }
            return res.json(req.params.id +' deleted');
        });
    });

module.exports = router;