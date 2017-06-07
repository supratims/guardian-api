/**
 * Simple script to read content off guardian open api
 */
const https = require('https');
const fs = require('fs');
const querystring = require('querystring');

/*
 * Make sure you have a api_key file with the key from guardian 
 */
const options = {
  key: fs.readFileSync('./api_key').toString().trim(),
};

const url = {
	search : "https://content.guardianapis.com/search",
	tags : "https://content.guardianapis.com/tags",
	sections : "https://content.guardianapis.com/sections"
};

const search = {
	
};

function urlBuilder(url, params){
	return url+'?api-key='+options.key+'&'+querystring.stringify(params);
}

const tech_url = urlBuilder(url.search, {q: 'technology', 'from-date': '2017-01-01'});
const tags_url = urlBuilder(url.tags, {});
//fetch(tech_url);
fetch(tags_url);

function fetch(url, callback){
    https.get(url, (res) => {
      //console.log('statusCode:', res.statusCode);
      //console.log('headers:', res.headers);
      res.on('data', (d) => {
        var json = JSON.parse(d.toString());
	console.log(json.response.results);
      });
    
    }).on('error', (e) => {
      console.error(e);
    });
}
