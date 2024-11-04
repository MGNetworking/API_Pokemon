const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { success } = require("./helper");

const sequelizeConfig = require("./src/db/sequelize");
const pokemon = require("./src/models/pokemon");
const { types } = require("pg");
const { ValidationError, where, Op } = require("sequelize");

// express Server config
const app = express();
const port = 3000;

sequelizeConfig.initDB();

// middlewares
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

// run API
app.listen(port, () =>
  console.log(`this API to run in basic IP: http://localhost:${port}`)
);

// Get pokemons by ID
app.get("/api/pokemon/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) {
    const pk = await sequelizeConfig.PokemonData.findByPk(id);
    if (pk) {
      return res.json(success(`Vous avez demander le pokemon ${pk.id}`, pk));
    } else {
      return res
        .status(400)
        .send(`heuuuu comment dire. Il n'exite pas ce pockemon`);
    }
  } else {
    return res.status(400).send("Erreur : ID invalide");
  }
});

// Get pokemons
app.get("/api/pokemons", (req, res) => {
  const name = req.query.name; // query params
  const limite = parseInt(req.query.limit) || 5; // query params

  if (name) {
    // limits the search to too few characters
    if (name.length <= 2) {
      const message = `La recherche doit contenir plus de ${name.length} caractère !`;
      return res.status(400).json({ message: message });
    }
    sequelizeConfig.PokemonData.findAndCountAll({
      where: { name: { [Op.like]: `%${name}%` } }, // Search using the LIKE operator
      order: ["name"], // sort in ascending order
      limit: limite, // limits research
    }).then(({ count, rows }) => {
      message = `there are ${count} Pokémons that match the search name ${name}`;
      res.json({ message, data: rows });
    });
  } else {
    sequelizeConfig.PokemonData.findAll({ order: ["name"] })
      .then((pk) => {
        res.json(success("Here is the list of pokemons", pk));
      })
      .catch((error) => {
        const message = `The list of pokemons could not be recovered!`;
        console.error(error.message);
        res.status(500).json({ message: message });
      });
  }
});

// Post pokemons
app.post("/api/addPokemon", (req, res) => {
  sequelizeConfig.PokemonData.create(req.body)
    .then((pokemon) => {
      res.json(
        success(`You have created your pokemon ${pokemon.name}`, pokemon)
      );
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        const message = `A validation error occurred during the creation of the Pokémon: ${req.body.name} `;
        console.error(message);
        console.error(error.message);
        return res.status(400).json({ message: message, data: error });
      }
      const message = `Error during Pokémon creation: ${pokemon.name}`;
      console.error(error.message);
      res.status(500).json({ message: message });
    });
});

// update pokemons
app.put("/api/updatePokemon", (req, res) => {
  sequelizeConfig.PokemonData.update(req.body, {
    where: { id: req.body.id },
  })
    .then(() => {
      return sequelizeConfig.PokemonData.findByPk(req.body.id).then((pok) => {
        if (!pok) {
          return res.status(404).json({
            message: `No pokemon found with this ${req.body.id}`,
          });
        }
        const message = `Le pokémon ${pok.name} has been modified`;
        res.json({ message, data: pok });
      });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        const message = `A validation error occurred when updating the Pokémon: ${req.body.name} `;
        console.error(message);
        console.error(error.message);
        return res.status(400).json({ message: message, data: error });
      }
      const message = `A technical error occurred during the Pokémon update: ${req.body.name} `;
      console.error(error.message);
      res.status(500).json({ message: message });
    });
});

// delete pokemons
app.delete("/api/deletePokemon/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const pokemon = await sequelizeConfig.PokemonData.findByPk(id);
    if (!pokemon) {
      return res
        .status(404)
        .json({ message: "No Pokémon found with this ID." });
    }
    await pokemon.destroy();

    res.json(success(`You have deleted the pokemon ${pokemon.name}`, pokemon));
  } catch (error) {
    const message = `Error when deleting Pokémon: ${pokemon.name}`;
    console.error(error.message);
    res.status(500).json({ message: message });
  }
});

// route to user access for login
require("./src/routes/login")(app);

// gesiton des erreurs du server
app.use(({ res }) => {
  res.status(404).json("Resource not found , try another resource !!!");
});
