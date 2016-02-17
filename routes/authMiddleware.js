/*

This File isn't in use

*/
var express = require('express');
var router = express.Router();

router.use(function(req,res, next){
	//next chama o proximo middleware

// permite aceder a todos os metodos GET
	/*if(req.method === "GET"){
		return next();
	}*/

	if( !req.isAuthenticated())
	{
		// user nao esta autenticado
		return res.redirect('/#login');
	}

	return next();

});

module.exports = router;