const express = require("express")
const router = express.Router()
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
      claims: claimsSample.slice(0, Math.random()*3),
      levelOfSupport: Math.floor(Math.random() * 6)
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

  if (typeof(req.body.yearRange) === 'object') {
    conditions.push({ year: { $gte: req.body.yearRange[0] } })
    conditions.push({ year: { $lte: req.body.yearRange[1] } })
  }
  if (req.body.sePractice.length > 0) {
    conditions.push({ sePractice: req.body.sePractice })
    if (req.body.claims.length > 0) {
      conditions.push({ claims: { $in: req.body.claims } })
    }
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

router.post("/create", (req, res) => {
  const { author, title, journal, year, volume, number, pages, doi, email, sePractice } = req.body

  Evidence.findOne({title: title}).then( found => {
    if ( found ) {
      return res.status(400).json( { message: "This article already exists." } )
    } else {
      const metadata = req.body
      Evidence.create({
        title, author, journal, year, metadata, volume, number,
        pages, doi, email, sePractice, recordType: "article"
      }).then( (createdEvidence, err )=> {
        if ( createdEvidence) {
          return res.status(201).json({message: 'Success'})
        } else {
          return res.status(400).json({error: err.message})
        }
      } )
    }
  })
})

router.get("/destroy_all", (req, res) => {
  Evidence.deleteMany({}, (err) => {
    return res.status(200).json({})
  })
})

module.exports = router