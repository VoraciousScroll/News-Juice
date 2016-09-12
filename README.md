[![Build Status](https://travis-ci.org/VoraciousScroll/VoraciousScroll.svg?branch=master)](https://travis-ci.org/VoraciousScroll/VoraciousScroll)

# VoraciousScroll
HR47 Greenfield Project

## Team

  - __Product Owner__: Nathanael Ligon
  - __Scrum Master__: Sean Ng
  - __Development Team Members__: Evan Goss, Julie Truong

--
## Table of Contents

1. [Usage](#Usage)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [API Key Set-Up](#api-key-set-up)
1. [Team](#team)
1. [Authors](#authors)

--
## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
nodemon
```

In new terminal tab:
```sh
mongod
```

--
### API Key Set-Up:

#### Set-Up Facebook Developer Key:
* Set-up [Facebook developer profile](https://developers.facebook.com/)  
* Add a New App  
* Select website option
* Set Site URL: `http://localhost/3000`
* Under Settings -> app domain -> `localhost`
* Under Settings -> App Review -> Set App to live

#### Set-Up Aylien Api key:

* Sign-up for [Aylien account](https://newsapi.aylien.com/signup) and obtain keys

#### Save key.js file:

* Open `keys.example.js` file
* Update Facebook and Aylien keys
* Save `keys.example.js` to `keys.js`  

--
### Authors:

* Julie Truong ([Gamerlazer](https://github.com/Gamerlazer))  
* Sean Ng ([seanng](https://github.com/seanng))  
* Evan Goss ([EvanGoss](https://github.com/EvanGoss))  
* Nathanael Ligon ([nligon](https://github.com/nligon))  


<!-- View the project roadmap [here](LINK_TO_PROJECT_ISSUES) -->
    

<!-- ## Contributing -->

<!-- See [CONTRIBUTING.md](https://github.com/unexpected-lion/ourglass/blob/master/contributing.md) for contribution guidelines. -->
