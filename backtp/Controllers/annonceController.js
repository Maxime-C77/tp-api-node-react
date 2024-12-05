const Annonce = require("../Models/annonceModel");

const getAnnonces = async (req, res) => {
    try {
      const filter = {};
      if (req.query.title) {
        filter.title = { $regex: req.query.title, $options: "i" };
      }
      if (req.query.prix) {
        filter.prix = { $regex: req.query.prix, $options: "i" };
      }
      if (req.query.description) {
        filter.description = { $regex: req.query.description, $options: "i" };
      }
      if (req.query.livraison) {
        filter.livraison = { $regex: req.query.livraison, $options: "i" };
      }  
      if (req.query.addresse) {
        filter.addresse = { $regex: req.query.addresse, $options: "i" };
      }  
      const annonces = await Annonce.find(filter).populate(
        "author",
        "username email"
      );
  
      res.status(200).send(annonces);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
};

const getAnnonceByUserId = async (req, res) => {
    try {
      const annonce = await Annonce.find({ author: req.params.userId }).populate(
        "author",
        "username email"
      );
      if (!annonce) {
        return res.status(404).send({ error: "Annonce introuvable" });
      }
      res.status(200).send(annonce);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};

const addAnnonce = async (req, res) => {
    console.log(req.body);
    const authorId = req.user?.id;  // Utilisation de l'opérateur optionnel pour éviter les erreurs
    if (!authorId) {
      return res.status(401).send("Utilisateur non authentifié");
    }
  
    try {
      const annonce = new Annonce({
        ...req.body,
        author: authorId,  // Utilise l'ID de l'utilisateur authentifié
      });
  
      if (!annonce) {
        return res.status(400).send("Merci de remplir tous les champs");
      }
  
      await annonce.save();
      res.status(201).send(annonce);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
};

const updateAnnonce = async (req, res) => {
    try {
      const annonce = await Annonce.findByIdAndUpdate(
        req.params.annonceId,
        req.body,
        {
          new: true,
        }
      );
      if (!annonce) {
        return res.status(404).send({ error: "Annonce introuvable" });
      }
      res.status(200).send(annonce);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};

const deleteAnnonce = async (req, res) => {
    try {
      const annonce = await Annonce.findByIdAndDelete(req.params.annonceId);
      if (!annonce) {
        return res.status(404).send({ error: "Annonce introuvable" });
      }
      res.status(200).send({ message: "Annonce supprimée" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};

module.exports = {
    addAnnonce,
    deleteAnnonce,
    updateAnnonce,
    getAnnonces,
    getAnnonceByUserId
}