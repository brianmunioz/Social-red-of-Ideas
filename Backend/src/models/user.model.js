const mongoose = require('mongoose');
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');
const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});
UserSchema.methods.toJSON = function () {
    //Lo que se hace acá que cuando se requiere mostrar informacion no te muestra las contraseñas
    let user = this.toObject();
    delete user.password;
    return user;
}
UserSchema.methods.comparePasswords = function (password) {
    //Este es un metodo para comparar la contraseña introducida con la de la base de datos
    return compareSync(password, this.password);
}
UserSchema.pre('save', async function (next) { //Esto se ejecuta cada vez que se guarda un archivo de mongo
    const user = this;
    if (!user.isModified('password')) { //Si el campo contraseña no fue modificado se ejecuta este if
        return next();
    }
    const salt = genSaltSync(10);//Se define el tamaño de la contraseña
    const hashedPassword = hashSync(user.password, salt); //Encripta contraseña
    user.password = hashedPassword;//Se lo asigna a la contraseña del usuario
    next()
})
module.exports = mongoose.model('user', UserSchema);