const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware pour activer CORS
app.use(cors());
app.use(express.json());

// Endpoint pour obtenir les événements
app.get("/events", (req, res) => {
  fs.readFile("events.json", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erreur de lecture du fichier" });
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint pour ajouter un événement
app.post("/events", (req, res) => {
  const { evenement, heure, jour } = req.body;

  fs.readFile("events.json", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erreur de lecture du fichier" });
    }

    const eventsData = JSON.parse(data);

    
    if (!eventsData[jour]) {
      eventsData[jour] = [];
    }

    
    eventsData[jour].push({ evenement, heure });
    fs.writeFile("events.json", JSON.stringify(eventsData, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erreur d'écriture dans le fichier" });
      }
      res
        .status(201)
        .json({ message: "Événement ajouté avec succès", evenement });
    });
  });
});


app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
