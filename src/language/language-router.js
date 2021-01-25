const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const parser = express.json()
const { _Node, array} = require('../linked/linked')

const languageRouter = express.Router()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try {
      const [upcoming] = await LanguageService.getNextWord(
        req.app.get('db'),
        req.language.id
      )
      res.json({
        nextWord: nextWord.original,
        totalScore: req.language.total_score,
        wordCountCorrect: nextWord.correct_count,
        wordIncorrectCount: nextWord.incorrect_count
      })
      next()
    } catch (e) {
      next(e)
    }
  })

languageRouter
  .post('/guess', parser, async (req, res, next) => {
    const answer = req.body.guess

    if(!answer){
      res.status(200).json({ error: `Missing 'guess' in request body.`})
    }

    try{
      let words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id
      )
      const [{ head }] = await LanguageService.getLangHead(
        req.app.get('db'),
        req.language.id
      )
      let list = LanguageService.createLL(words, head)
      let [nextWord] = await LanguageService.compare(
        req,app.get('db'),
        req.language.id
      )
    
      if(nextWord.translation === answer) {
        let memValue = list.head.value.memory_value * 2
        list.head.value.memory_value = memValue
        list.head.value.correct_count++

        let current = list.head
        let less = memValue
        while(less > 0 && current.next !== null) {
          current = current.next
          less--
        }

        let tempNode = new _Node(list.head.value)
      }
    }
  })

module.exports = languageRouter
