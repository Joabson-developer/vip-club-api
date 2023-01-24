const express = require("express");
const router = express.Router();

const {
  getClients,
  searchClient,
  createClient,
  getClient,
  deleteClient,
} = require("./controllers/ClientsController");

router.get("/clients", getClients);
router.get("/search-client", searchClient); //query params
router.post("/client", createClient);
router.get("/client/:client_id", getClient);
// router.patch("/client/:client_id", updateClient);
router.delete("/client/:client_id", deleteClient);

module.exports = router;
