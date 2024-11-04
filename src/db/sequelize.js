/**
 * File to connection config DB
 */

const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../../src/models/pokemon");
let mockPokemons = require("./mock-pokemon");
const { types } = require("pg");
require("dotenv").config();

/* console.log("Connexion DB_HOST data Base :", process.env.DB_HOST); */
// Données d'authentifcation
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    schema: process.env.DB_SCHEMA,
  }
);

// Database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successfully established.");
  })
  .catch((err) => {
    console.error("Unable to connect:", err);
  });

// Defining the model for table access
const PokemonData = PokemonModel(sequelize, DataTypes);

// Synchronisation of schemas with the Pokedex database
// NB: force: true => recreate the table each time you reboot
const initDB = () => {
  return sequelize.sync({ force: true }).then(() => {
    mockPokemons.map((pokemon) => {
      PokemonData.create({
        id: pokemon.id,
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });

    console.log(`Synchronisation of schemas to the "Pokedex" database.`);
  });
};

module.exports = {
  initDB,
  PokemonData,
};
