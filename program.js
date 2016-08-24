#!/usr/bin/env node
"use strict";

const [,, ...args] = process.argv
let [url="http://google.com"] = [...args]

if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
  url = `https://${url}`
  console.log(url)
}

const { createServer } = require('http')
const { get } = require('request')
const { load } = require('cheerio')

const server = createServer()

server.on('request', (req, res) => {
  get(url, (err, _, body) => {
    const $ = load(body)

    $('img').each(function(i, img){
      $(img).attr('src', giphyGenerator())
    })
    res.end($.html())
  })
})

server.listen(8080)

let gifGoldblums = ["https://media.giphy.com/media/l0MYCzCMjRDsgqrUk/giphy.gif", "https://media.giphy.com/media/gim44Z9Ygw3Ic/giphy.gif", "https://media.giphy.com/media/mWYJsOqmvQcbm/giphy.gif", "http://www.reactiongifs.com/r/hapssh.gif", "http://www.reactiongifs.com/wp-content/uploads/2013/10/pos.gif", "https://media.giphy.com/media/HxXYHeQuEp0oU/giphy.gif", "https://media.giphy.com/media/NOLlgmFtbS6u4/giphy.gif"]

const giphyGenerator = () => {
  let gifGoldblum = gifGoldblums[Math.floor(Math.random() * (gifGoldblums.length))];
  return gifGoldblum
}
