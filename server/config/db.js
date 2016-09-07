var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/voraciousscroll');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  _facebookUniqueID: String,
  firstname: String,
  lastname: String,
  picture: String,
  gender: String
});

var User = mongoose.model('User', userSchema);

User.findOrCreateUser = function(profile, callback) {
  User.findOne({_facebookUniqueID: profile.id}, function (error, user) {
    if (!user) {
      
    }
  });
};


// console.log(profile, 'THESE ARE YOUR PROFILE OPTIONS');
// console.log(profile._json, 'JSON OBJECT');
  // User.findOne({_facebookUniqueID: profile.id}, function (error, result) {
  //   // console.log(result, 'THIS IS MY RESULT FROM THE DB');
  //   if (!result) {
  //     User.create({  
  //       _facebookUniqueID: profile.id,
  //       firstname: profile.first_name,
  //       lastname: profile.last_name,
  //       picture: profile.picture,
  //       gender: String
  //     }, function (error, user) {

  //     });
  //   } else {
  //     callback (error, result);
  //   }
  // });

/*

{ id: '10105679927746073',
  username: undefined,
  displayName: undefined,
  name: 
   { familyName: 'Truong',
     givenName: 'Julie',
     middleName: undefined },
  gender: 'female',
  profileUrl: undefined,
  photos: [ { value: 'https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/10417550_10103418587420213_3389328959999895776_n.jpg?oh=c5d1e046a88781bba8ed97f006f4aa60&oe=584A7A45' } ],
  provider: 'facebook',
  _raw: '{"id":"10105679927746073","last_name":"Truong","first_name":"Julie","picture":{"data":{"is_silhouette":false,"url":"https:\\/\\/scontent.xx.fbcdn.net\\/v\\/t1.0-1\\/s200x200\\/10417550_10103418587420213_3389328959999895776_n.jpg?oh=c5d1e046a88781bba8ed97f006f4aa60&oe=584A7A45"}},"gender":"female"}',
  _json: 
   { id: '10105679927746073',
     last_name: 'Truong',
     first_name: 'Julie',
     picture: { data: [Object] },
     gender: 'female' } }


*/


exports.User = User;
