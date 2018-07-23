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

const tech_url = urlBuilder(url.search, {q: 'technology', 'from-date': '2018-01-01'});
const tags_url = urlBuilder(url.tags, {});
//fetch(tech_url);
//fetch(tags_url);

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

exports.fetchTechNews = function(since){
    const tech_url = urlBuilder(url.search, {q: 'technology', 'from-date': since || '2018-01-01'});
    return new Promise((resolve, reject) => {
        https.get(tech_url,  (response) => {
          // temporary data holder
          const body = [];
          // on every content chunk, push it to the data array
          response.on('data', (chunk) => body.push(chunk));
          // we are done, resolve promise with those joined chunks
          response.on('end', () => {
            var json = JSON.parse(body.join(''));
            resolve(json.response.results)
          });
        }).on('error', (error) => {
            reject(err);
        });
    })
};

exports.fetchNewsByTag = function(tag){
    
};
