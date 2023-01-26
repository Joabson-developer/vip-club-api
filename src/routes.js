const express = require("express");
const router = express.Router();

const {
  getClients,
  searchClient,
  createClient,
  getClient,
  deleteClient,
  updateClient,
  getPhones,
  getInstallments,
  createInstallments,
} = require("./controllers/ClientsController");

router.get("/clients", getClients);
router.get("/search-client", searchClient); //query params
router.post("/client", createClient);
router.patch("/client", updateClient);
router.get("/client/:client_id", getClient);
router.delete("/client/:client_id", deleteClient);

router.post("/phones/:client_id", getPhones);
router.post("/get-installments", getInstallments);
router.post("/get-installments/:client_id", getInstallments);
router.post("/create-installments/:client_id", createInstallments);

module.exports = router;
