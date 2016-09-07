var profile = function (fbProfile) {
  return {
    _facebookUniqueID: fbProfile.id,
    firstname: fbProfile.name.givenName,
    lastname: fbProfile.name.familyName,
    picture: fbProfile.photos[0].value,
    gender: fbProfile.gender
  };
};





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












module.exports = {
  profile: profile,
};