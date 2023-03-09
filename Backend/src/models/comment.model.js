const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
    comment: { type: String, required: true },
    author: { //este campo se relaciona con el autor del modelo user que alla realizado la idea
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        autopopulate: true
    }
});




CommentSchema.plugin(require('mongoose-autopopulate'));


module.exports = mongoose.model("comment", CommentSchema);