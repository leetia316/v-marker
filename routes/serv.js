'use strict'
const router = require('express').Router()
const superagent = require('superagent')
const cheerio = require('cheerio')

router.get('/', (req, res) => {
  res.send('Hello serv!')
})

router.post('/', (req, res) => {
  let keyWord = req.query.key
  console.log(keyWord)
  if (keyWord) {
    let resultArr = []
    superagent
      .get('http://weixin.sogou.com/weixin?type=1&query=' + keyWord)
      .end((err, response) => {
        if (err) res.send(err)
        let $ = cheerio.load(response.text)

        $('.mt7 .wx-rb').each((index, item) => {
          let resultObj = {
              title: '',
              wxNum: '',
              link: '',
              pic: '',
          }

          resultObj.title = $(item).find('h3').text()
          resultObj.wxNum = $(item).find('label').text()
          resultObj.link = $(item).attr('href')
          resultObj.pic = $(item).find('img').attr('src')
          resultArr.push(resultObj)
        })

        res.send(JSON.stringify(resultArr))
      })
  }
})

module.exports = router