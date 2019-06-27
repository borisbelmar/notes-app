const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    register_date: { type: Date, default: Date.now }
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); 
    const hash = bcrypt.hash(password, salt); //Generamos un Hash
    return hash;
};

// No usamos arrow function porque debemos manipular el objeto
UserSchema.methods.matchPAssword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);