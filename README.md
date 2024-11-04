# Node test

## Run

1. Install dependencies of this projet

```shell
npm install
```

2. Change file name `.envExemple` to `.env` and add your configuration database

3. Run this project with npm script

```shell
npm run start
```

## EndPoints API

Base API is `http://localhost:3000/`

- `GET /api/pokemon` : Get pokemon by id
- `GET /api/pokemons`: Get All Pokemon or get pokemon with name and limit
- `POST /api/addPokemon` : add pokemon
- `POST /api/login` : User authenticat
- `PUT /api/updatePokemon` : updatepokemon

## Config for Run

In this projet, you find config for database to connecting in file `.envExemple` . Change this name to `.env` and add your config database connection.

## All dependencies

```shell
# le server http
npm install express --save
# refesh pendant le Dev
npm install nodemon --save-dev
# middlewares pour les logs dans le dev
npm install morgan --save-dev
# middlewares en gestion de la favicon
npm install serve-favicon --save
# middlewares pars Json
npm install body-parser --save
# ORM
npm install sequelize --save
# Le driver pour l'accès a postgreSql
npm install pg --save
# harger les variables depuis le fichier
npm install dotenv --save
# encryption module
npm install bcrypt --save
# Json Web token
npm install jsonwebtoken --save
```

l'option: --save-dev this option install the dependancy in file `package.json` in config devDependencies

### Documentation

express: https://expressjs.com/
morgan: https://expressjs.com/en/resources/middleware/morgan.html
nodemon: https://nodemon.io/
sequelize: https://sequelize.org/
PostgreSQL Node : https://www.npmjs.com/package/pg
dotenv: https://www.npmjs.com/package/dotenv#%EF%B8%8F-usage
bcrypt: https://www.npmjs.com/package/bcrypt

### Features
