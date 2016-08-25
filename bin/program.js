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
const { readFile } = require('fs')

const server = createServer()

server.on('request', (req, res) => {
  get(url, (err, _, body) => {
    let $ = ""
    if (err) {
      res.end(`<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>PAGE NOT FOUND</title>
          <link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet">
        </head>
        <body>
          <img style="margin: 3% 28%" src = "https://media.giphy.com/media/3oD3YQjT2cSZTsy6Va/giphy.gif" />
          <h2 style="font-family: 'Amatic SC'; text-align: center"> Sorry. Can't find the webpage you were looking for to Jeff it up.</h2>
        </body>
      </html>`)
    } else {
      $ = load(body)
      $('img').each(function(i, img){
        $(img).attr('src', giphyGenerator())
      })
      $ = $.html()
      res.end($)
    }
  })
})

server.listen(8080)

let gifGoldblums = ["https://media.giphy.com/media/l0MYCzCMjRDsgqrUk/giphy.gif", "https://media.giphy.com/media/gim44Z9Ygw3Ic/giphy.gif", "https://media.giphy.com/media/mWYJsOqmvQcbm/giphy.gif", "http://www.reactiongifs.com/r/hapssh.gif", "http://www.reactiongifs.com/wp-content/uploads/2013/10/pos.gif", "https://media.giphy.com/media/HxXYHeQuEp0oU/giphy.gif", "https://media.giphy.com/media/NOLlgmFtbS6u4/giphy.gif"]
let jeffGetter = () => {
  get(`http://giphy.com/search/jeff-goldblum`, (err, _, body)=> {
    const $ = load(body)
    $('.gifs-gif').each(function(i, gif){
      gifGoldblums.push($(gif).attr("data-animated"))
    })
  })
}
jeffGetter()


const giphyGenerator = () => {
  let gifGoldblum = gifGoldblums[Math.floor(Math.random() * (gifGoldblums.length))];
  return gifGoldblum
}
