const mongoose = require('mongoose');
const { Schema } = mongoose;

const VoteSchema = new Schema({
    vote: { type: Boolean, required: true },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        autopopulate: true
    }
});
VoteSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('vote', VoteSchema);