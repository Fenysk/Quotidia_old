const express = require("express");
const cors = require("cors");
const askToGPT = require("./askToGPT.js");

const app = express();
app.use(cors());
app.use(express.json());

// POST
app.post("/askToGPT", async (req, res) => {
  const user_input = req.body.user_input;
  const system_input = req.body.system_input;
  const old_messages = req.body.old_messages;
  const temperature = req.body.temperature;

  console.log(`Demande à GPT-3...`);
  const response = await askToGPT(
    user_input,
    system_input,
    old_messages,
    temperature
  );

  console.log(`Réponse reçue :`);
  console.log(response);

  res.send(response.content);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution à l'adresse : http://localhost:${port}`);
});
