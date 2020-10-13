const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EvidenceSchema = new Schema({
  author: String,
  title: {
    type: String,
    required: true,
    unique: true
  },
  journal: String,
  publisher: String,
  year: Number,
  month: String,
  recordType: String,
  sePractice: String,
  claims: [String],
  levelOfSupport: Number,
  metadata: {
    type: String,
    get: function(data) {
      try { 
        return JSON.parse(data);
      } catch(err) { 
        return data;
      }
    },
    set: function(data) {
      return JSON.stringify(data);
    }
  }
});

module.exports = Evidence = mongoose.model("Evidence", EvidenceSchema);
