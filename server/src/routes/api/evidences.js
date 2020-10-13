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
  const { author, title, journal, year, volume, number, pages, doi, _key, _type } = req.body

  if (!title) return res.status(400).json({error: "Please provide the title."})

  Evidence.findOne({title: title}).then( found => {
    if ( found ) {
      return res.status(400).json( { error: "This title already exists." } )
    } else {
      const metadata = { 
        AUTHOR: author, 
        TITLE: title, 
        JOURNAL: journal,
        YEAR: year, 
        key: _key || author.substr(0, 5) + year + title.substr(0, 2),
        type: _type || "article",
        VOLUME: volume,
        NUMBER: number,
        PAGES: pages,
        DOI: doi
      }
      Evidence.create({
        title, author, journal, year, metadata, recordType: _type || "article"
      }).then( (createdEvidence, err )=> {
        if ( createdEvidence) {
          return res.status(200).json({success: true})
        } else {
          return res.status(400).json({error: "Bad request"})

        }
      } )
    }
    
  })


})

router.post("/parse", (req, res) => {


  const { bibtex } = req.body
  
  if ( !bibtex) return res.status(400).json({error: "Please provide the file."})
  
  const fileData = bibtexParse.entries( bibtex )
  
  if ( fileData.length !== 1 ) return res.status( 400 ).json( { error: "File should describe one entry." } )
  
  return res.status( 200 ).json( fileData[0] )

})

router.get("/destroy_all", (req, res) => {
  Evidence.deleteMany({}, (err) => {
    return res.status(200).json({})
  })
})

module.exports = router