var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Produto = mongoose.model('Produto');
var Aspirador = mongoose.model('Aspirador');
var Cama = mongoose.model('Cama');
var Colchao = mongoose.model('Colchao');
var Figorifico = mongoose.model('Figorifico');
var MaqLavarRoupa = mongoose.model('MaqLavarRoupa');
var ObjectID = mongoose.ObjectID;

var constructors = [];
constructors['Produto'] = { constructor: new Produto(), builderName: 'buildProduto' };
constructors['Aspirador'] = { constructor: new Aspirador(), builderName: 'buildAspirador' };
constructors['Cama'] = { constructor: new Cama(), builderName: 'buildCama' };
constructors['Colchao'] = { constructor: new Colchao(), builderName: 'buildColchao' };
constructors['Figorifico'] = { constructor: new Figorifico(), builderName: 'buildFigorifico' };
constructors['MaqLavarRoupa'] = { constructor: new MaqLavarRoupa(), builderName: 'buildMaqLavarRoupa' };


//global.buildProduto = function(req, doc){};

global.buildProduto = function(body, produto){
  produto.nome = body.nome;
  produto.obs = body.obs;
  produto.divisao = body.divisao;
  produto.marca = body.marca;
  produto.precos = body.precos;
  produto.imagens = body.imagens;
};

global.buildAspirador = function(body, aspirador){
  buildProduto(body,aspirador);
  aspirador.decibeis = body.decibeis;
  aspirador.potencia = body.potencia;
  aspirador.temSaco = body.temSaco;
};

global.buildCama = function(body, cama){
  buildProduto(body,cama);
  cama.comprimento = body.comprimento;
  cama.largura = body.largura;
  cama.altura = body.altura;
};

global.buildColchao = function(body, colchao){
  buildProduto(body,colchao);
  colchao.comprimento = body.comprimento;
  colchao.largura = body.largura;
  colchao.altura = body.altura;
};

global.buildFigorifico = function(body, figorifico){
  buildProduto(body,figorifico);
  figorifico.capCongelador = body.capCongelador;
  figorifico.capFigorifico = body.capFigorifico;
  figorifico.classEnergetica = body.classEnergetica;
};

global.buildMaqLavarRoupa = function(body, maqLavarRoupa){
  buildProduto(body,maqLavarRoupa);
  maqLavarRoupa.capacidade = body.capacidade;
  maqLavarRoupa.temLavagemManual = body.temLavagemManual;
  maqLavarRoupa.classEnergetica = body.classEnergetica;
};

/*
var registerProduct = function(body, callback){
  if(body.kind === undefined)
    body.kind = 'Produto';
  console.log("Body Kind: " + body.kind);
  var objProd = constructors[body.kind].constructor;
  if(objProd){
    if(typeof objProd === "object"){
      var funcName = constructors[body.kind].builderName;
      console.log("FuncName: " + funcName);
      global[funcName](body, objProd);
      objProd._id = new ObjectID();
      //Produto.collection.insert(objProd,callback);
      objProd.save(callback);
    }
  }else{
      callback('Nao é um tipo conhecido', null);
    }
};
*/

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

router.route('/Produtos')

    //obter todas os Produtos
    .get(function(req, res){
      Produto.find({})
        .populate('divisao')
        .populate('precos')
        //.populate('imagens')
        .exec(function(err,produtos){
            if(err){
              console.log("erro:: "+err);
               return res.send(500, err);
            }
            return res.send(produtos);
        });
    });

router.route('/Aspiradores')

    //obter todas os Produtos
    .get(function(req, res){
      Aspirador.find({})
        .populate('divisao')
        .populate('precos')
        //.populate('imagens')
        .exec(function(err,produtos){
            if(err){
               return res.send(500, err);
            }
            return res.send(produtos);
        });
    });

router.route('/Camas')

    //obter todas os Produtos
    .get(function(req, res){
      Cama.find({})
        .populate('divisao')
        .populate('precos')
        //.populate('imagens')
        .exec(function(err,produtos){
            if(err){
               return res.send(500, err);
            }
            return res.send(produtos);
        });
    });

router.route('/Colchoes')

    //obter todas os Produtos
    .get(function(req, res){
      Colchao.find({})
        .populate('divisao')
        .populate('precos')
        //.populate('imagens')
        .exec(function(err,produtos){
            if(err){
               return res.send(500, err);
            }
            return res.send(produtos);
        });
    });

router.route('/Figorificos')

    //obter todas os Produtos
    .get(function(req, res){
      Figorifico.find({})
        .populate('divisao')
        .populate('precos')
        //.populate('imagens')
        .exec(function(err,produtos){
            if(err){
               return res.send(500, err);
            }
            return res.send(produtos);
        });
    });

router.route('/MaqsLavarRoupa')

    //obter todas os Produtos
    .get(function(req, res){
      MaqLavarRoupa.find({})
        .populate('divisao')
        .populate('precos')
        //.populate('imagens')
        .exec(function(err,produtos){
            if(err){
               return res.send(500, err);
            }
            return res.send(produtos);
        });
    });

/*
router.route('/:type(Produtossss|Aspiradores|Camas|Colchoes|Figorificos|MaqsLavarRoupa)')
    //criar uma nova Produto
    .post(function(req, res){
      console.log("vou guardar o produto........");
      console.log(req.body);
        registerProduct(req.body, function(err,objProd){
          if(err){
            return res.send(err);
          }
          console.log("guardado "+objProd);
          return res.send(objProd);
          /*
                      FIX THIS !!!!!!!!
                      PROBLEMS WHEN I TRY SAVE A OBJECT WITHOUT 'divisao'
          */
          //console.log("Post Obj: " + objProd);
          //console.log("Post Erro: "+err);
          //return res.send(objProd,err);
 //       });
//    });


router.route('/:type(Produtos)')
    .post(function(req, res){
      var produto = new Produto();
      buildProduto(req.body,produto);
      produto.save( function(err,objProd){
          if(err){
            console.log(err);
            return res.send(err);
          }
          console.log("guardado "+objProd);
          return res.send(objProd);
        });
    });


router.route('/:type(Aspiradores)')
    .post(function(req, res){
      var aspirador = new Aspirador();
      buildAspirador(req.body, aspirador);
        aspirador.save( function(err,objProd){
          if(err){
            console.log(err);
            return res.send(err);
          }
          console.log("guardado "+objProd);
          return res.send(objProd);
        });
    });

router.route('/:type(Camas)')
    .post(function(req, res){
      var cama = new Cama();
      buildCama(req.body,cama);
      cama.save( function(err,objProd){
          if(err){
            console.log(err);
            return res.send(err);
          }
          console.log("guardado "+objProd);
          return res.send(objProd);
        }); 
    });



router.route('/:type(Colchoes)')
    .post(function(req, res){
      var colchao = new Colchao();
      buildColchao(req.body,colchao);
        colchao.save( function(err,objProd){
          if(err){
            console.log(err);
            return res.send(err);
          }
          console.log("guardado "+objProd);
          return res.send(objProd);
        });
    });


router.route('/:type(Figorificos)')
    .post(function(req, res){
      var figorifico = new Figorifico();
      buildFigorifico(req.body,figorifico);
      figorifico.save( function(err,objProd){
        if(err){
          console.log(err);
          return res.send(err);
        }
        console.log("guardado "+objProd);
        return res.send(objProd);
      });
    });


router.route('/:type(MaqsLavarRoupa)')
    .post(function(req, res){
      var maqLavarRoupa = new MaqLavarRoupa();
      buildMaqLavarRoupa(req.body, maqLavarRoupa);
      maqLavarRoupa.save( function(err,objProd){
          if(err){
            console.log(err);
            return res.send(err);
          }
          console.log("guardado "+objProd);
          return res.send(objProd);
        });
    });


router.route('/Produtos/:id')

    .get(function(req,res){
        Produto.findById({_id : req.params.id})
          .populate('divisao')
          .populate('precos')
          .populate('imagens')
          .exec(function(err,produto){
           if(err){
               return res.send(500,err);
           }
            return res.json(produto);
        });
    });

router.route('/Aspiradores/:id')

    .get(function(req,res){
        Aspirador.findById({_id : req.params.id, kind : 'Aspirador'})
          .populate('divisao')
          .populate('precos')
          .populate('imagens')
          .exec(function(err,produto){
           if(err){
               return res.send(500,err);
           }
            return res.json(produto);
        });
    });

router.route('/Camas/:id')

    .get(function(req,res){
        Cama.findById({_id : req.params.id})
          .populate('divisao')
          .populate('precos')
          .populate('imagens')
          .exec(function(err,produto){
           if(err){
               return res.send(500,err);
           }
            return res.json(produto);
        });
    });

router.route('/Colchoes/:id')

    .get(function(req,res){
        Colchao.findById({_id : req.params.id})
          .populate('divisao')
          .populate('precos')
          .populate('imagens')
          .exec(function(err,produto){
           if(err){
            console.log("Erro get colchoes: "+err);
               return res.send(500,err);
           }
           console.log("entrei: "+produto);
            return res.json(produto);
        });
    });

router.route('/Figorificos/:id')

    .get(function(req,res){
        Figorifico.findById({_id : req.params.id})
          .populate('divisao')
          .populate('precos')
          .populate('imagens')
          .exec(function(err,produto){
           if(err){
               return res.send(500,err);
           }
            return res.json(produto);
        });
    });

router.route('/MaqsLavarRoupa/:id')

    .get(function(req,res){
        MaqLavarRoupa.findById({_id : req.params.id})
          .populate('divisao')
          .populate('precos')
          .populate('imagens')
          .exec(function(err,produto){
           if(err){
               return res.send(500,err);
           }
            return res.json(produto);
        });
    });

router.route('/:type(Produtos|Aspiradores|Camas|Colchoes|Figorificos|MaqsLavarRoupa)/:id')
    /*
    .get(function(req,res){
        Produto.findById({_id : req.params.id})
          .populate('precos')
          .populate('imagens')
          .exec(function(err,produto){
           if(err){
               return res.send(500,err);
           }
            return res.json(produto);
        });
    })
    */

    .put(function(req,res){
        Produto.findById(req.params.id, function(err,produto){
           if(err){
               return res.send(500, err);
           }
        if(produto.kind){
          global[ constructors[produto.kind].builderName ](req.body, produto);
        }else{
          global[ constructors['Produto'].builderName ](req.body, produto);
        }

        produto.save(function(err,Produto){
               if(err){
                   return res.send(500,err);
               }
                return res.json(produto);
            });
        });
    })


    .delete(function(req,res){
      Produto.findOne({ _id: req.params.id }, function(err,produto){
        produto.remove();
      });
    });

module.exports = router;