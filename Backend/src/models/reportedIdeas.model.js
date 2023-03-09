const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportedIdeasSchema = new Schema({
    reason: { type: String, required: true },
    idea: {
        type: Schema.Types.ObjectId,
        ref: "idea",
        required: true,
        autopopulate: true
    }
}, {
    versionKey: false,
    timestamps: true
});




reportedIdeasSchema.plugin(require('mongoose-autopopulate'));


module.exports = mongoose.model("reportedIdeas", reportedIdeasSchema);