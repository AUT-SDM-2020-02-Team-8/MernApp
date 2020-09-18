const express = require("express")
const router = express.Router()
const bibtexParse = require('bibtex-parse')
const fs = require('fs')
const escapeStringRegexp = require('escape-string-regexp')

// Load Evidence model
const Evidence = require("../../models/Evidence");

// @route GET api/evidences/import
router.get("/import", async (req, res) => {
  const bibtex = fs.readFileSync(__dirname + '/../../sample_data/tdd.txt', 'utf8')
  const sample = bibtexParse.entries(bibtex)
  const claimsSample = ["code quality", "team confidence", "product quality"]
  for (var article of sample) {
    let attrs = {
      author: article['AUTHOR'],
      title: article['TITLE'],
      journal: article['JOURNAL'],
      publisher: article['PUBLISHER'],
      year: article['YEAR'],
      month: article['MONTH'],
      recordType: article['type'],
      metadata: article,
      sePractice: 'TDD',
      claims: claimsSample.slice(0, Math.random()*3)
    }
    let evidence = new Evidence(attrs)
    await evidence.save()
      .then(evidence => console.log(evidence))
      .catch(err => console.log(err))
  }
  Evidence.find({})
    .then(evidences => {
      return res.status(200).json(evidences)
    })
})

router.post("/search", (req, res) => {
  let conditions = []

  if (typeof(req.body.fromYear) == 'number') {
    conditions.push({ year: { $gte: req.body.fromYear } })
  }
  if (typeof(req.body.toYear) == 'number') {
    conditions.push({ year: { $lte: req.body.toYear } })
  }
  if (req.body.query.length > 0) {
    const escapedString = escapeStringRegexp(req.body.query)
    const regexCondition = { $regex: new RegExp(escapedString, 'i') }
    
    conditions.push({ $or: [
      { title: regexCondition },
      { author: regexCondition },
      { journal: regexCondition },
      { publisher: regexCondition },
      { recordType: regexCondition }
    ]})
  }

  let searchConditions = {}
  if (conditions.length > 0) {
    searchConditions = { $and: conditions }
    Evidence.find(searchConditions)
    .then(evidences => {
      return res.status(200).json(evidences)
    })
  }
  else {
    return res.status(200).json([])
  }
})

router.get("/destroy_all", (req, res) => {
  Evidence.deleteMany({}, (err) => {
    return res.status(200).json({})
  })
})

module.exports = router