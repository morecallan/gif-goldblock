#!/usr/bin/env node

"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var _process$argv = _toArray(process.argv);

var args = _process$argv.slice(2);

var _ref = [].concat(_toConsumableArray(args));

var _ref$ = _ref[0];
var url = _ref$ === undefined ? "http://google.com" : _ref$;


if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
  url = "https://" + url;
  console.log(url);
}

var _require = require('http');

var createServer = _require.createServer;

var _require2 = require('request');

var get = _require2.get;

var _require3 = require('cheerio');

var load = _require3.load;

var _require4 = require('fs');

var readFile = _require4.readFile;


var server = createServer();

server.on('request', function (req, res) {
  get(url, function (err, _, body) {
    var $ = "";
    if (err) {
      readFile('./jeff.html', function (err, data) {
        if (err) console.log(err);
        if (data) {
          $ = "" + data;
          res.end($);
        }
      });
    } else {
      $ = load(body);
      $('img').each(function (i, img) {
        $(img).attr('src', giphyGenerator());
      });
      $ = $.html();
      res.end($);
    }
  });
});

server.listen(8080);

var gifGoldblums = ["https://media.giphy.com/media/l0MYCzCMjRDsgqrUk/giphy.gif", "https://media.giphy.com/media/gim44Z9Ygw3Ic/giphy.gif", "https://media.giphy.com/media/mWYJsOqmvQcbm/giphy.gif", "http://www.reactiongifs.com/r/hapssh.gif", "http://www.reactiongifs.com/wp-content/uploads/2013/10/pos.gif", "https://media.giphy.com/media/HxXYHeQuEp0oU/giphy.gif", "https://media.giphy.com/media/NOLlgmFtbS6u4/giphy.gif"];
var jeffGetter = function jeffGetter() {
  get("http://giphy.com/search/jeff-goldblum", function (err, _, body) {
    var $ = load(body);
    $('.gifs-gif').each(function (i, gif) {
      gifGoldblums.push($(gif).attr("data-animated"));
    });
  });
};
jeffGetter();

var giphyGenerator = function giphyGenerator() {
  var gifGoldblum = gifGoldblums[Math.floor(Math.random() * gifGoldblums.length)];
  return gifGoldblum;
};