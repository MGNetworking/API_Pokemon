# Node test

### Run

Run project with npm script

```shell
 npm run start
```

### Config for Run

In this projet, you find config for database to connecting in file `.envExemple` . Change this name to `.env` and add your config database connection.

### Installation de dépendances

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

### Documantation

express: https://expressjs.com/
morgan: https://expressjs.com/en/resources/middleware/morgan.html
nodemon: https://nodemon.io/
sequelize: https://sequelize.org/
PostgreSQL Node : https://www.npmjs.com/package/pg
dotenv: https://www.npmjs.com/package/dotenv#%EF%B8%8F-usage
bcrypt: https://www.npmjs.com/package/bcrypt
