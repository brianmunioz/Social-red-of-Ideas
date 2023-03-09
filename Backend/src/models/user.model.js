const mongoose = require('mongoose');
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');
const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    img_profile: {type: String},
    rol: {type: String, default: 'user', required: true},
    reports:[ { 
        type: Schema.Types.ObjectId,
        ref: "reportedIdeas",
        required: true,
        autopopulate: true
    }],
    suspentions: [
        { 
            type: Schema.Types.ObjectId,
            ref: "suspendedUsers",
            required: true,
            autopopulate: true
        }
    ]
},{versionKey: false,
    timestamps: true});
UserSchema.methods.toJSON = function () {
    let user = this.toObject();
    delete user.password;
    return user;
}
UserSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password);
}
UserSchema.pre('findOneAndUpdate', async function(next){
  const user = await this.model.findOne(this.getQuery());
  if (!user.isModified('password')) {
    return next();
}

const salt = genSaltSync(10);
const hashedPassword = hashSync(user.password, salt);
user.password = hashedPassword;
next()
})
UserSchema.pre('save', async function (next) { 
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
 
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next()
})

module.exports = mongoose.model('user', UserSchema);