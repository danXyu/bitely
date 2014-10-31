/**
 * Module dependencies
 */
var request = require('request');
var querystring = require('querystring');


/**
 * GET /
 * Home page.
 *
 * ::> Render home template.
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'Bitely',
    recipes: 'First'
  });
};


/**
 * POST /
 * Home page.
 *
 * ::> Get and render recipes in SPA.
 */
exports.getRecipes = function(req, res) {
	req.assert('ingredient', "Please enter at least one main ingredient").notEmpty();
	req.checkBody('ingredient', "Please enter only one main ingredient").isNotArray();

  var ingredient = req.body.ingredient;
  var query = querystring.stringify({'ingredients-all': ingredient});
  var url = 'http://api.pearson.com:80/kitchen-manager/v1/recipes?' + query;

  request.get(url, function(error, request, body) {
    if (error) {
    	// Display error if request failed.
    	req.flash('errors', { msg: error.message });
    } else {
    	// Get recipes from body and re-render homepage.
    	var recipes = JSON.parse(body).results;
    	res.render('home', {
    		title: 'Bitely',
    		recipes: recipes
    	});
    }
  });
};
