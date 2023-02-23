const mongoose = require("mongoose");
const latestDate = require('../helpers/latestDate.helper')
const { Schema } = mongoose;

const IdeaSchema = new Schema({
    idea: { type: String, required: true },
    description: { type: String, required: true },
    vote: [
        { //este campo se relaciona con el autor del modelo user que alla realizado la idea
            type: Schema.Types.ObjectId,
            ref: "vote",
            required: true,
            autopopulate: true
        }
    ],
    author: { //este campo se relaciona con el autor del modelo user que alla realizado la idea
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        autopopulate: true
    },
    comments: [
        { //este campo se relaciona con el autor del modelo user que alla realizado la idea
            type: Schema.Types.ObjectId,
            ref: "comment",
            required: true,
            autopopulate: true
        }
    ],
    
   
},{versionKey: false,
    timestamps: true});



IdeaSchema.plugin(require('mongoose-autopopulate'));//Es para que traiga la informacion relacionada

module.exports = mongoose.model('idea', IdeaSchema);