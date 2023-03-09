const mongoose = require("mongoose");
const { Schema } = mongoose;

const suspendedUsersSchema = new Schema({
    reason: { type: String, required: true },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: this.suspentionMinutesQuantity + 'm' },
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        autopopulate: true
    },

    suspentionMinutesQuantity: { type: Number, required: true }
});




suspendedUsersSchema.plugin(require('mongoose-autopopulate'));


module.exports = mongoose.model("suspendedUsers", suspendedUsersSchema);