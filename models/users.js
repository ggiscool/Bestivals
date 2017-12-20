const mongoose = require('mongoose');
const bcrypt      =require('bcrypt');

const UsersSchema = mongoose.Schema({
 username: String,
 password: String
});


UsersSchema.pre('save', function(next) {
   //console.log('what is "this" doc?', this);
   if (this.isModified('password')) {
      const hashedPass = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
      this.password = hashedPass;
   }
   next();
});

UsersSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('UsersSchema', UsersSchema)
