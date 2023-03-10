const {
  getClients,
  searchClient,
  getCountry,
  createCountry,
  getState,
  createState,
  getCity,
  createCity,
  getAddress,
  createAddress,
  getClient,
  createClient,
  toggleClient: deleteClient,
  updateClient,
  getPhones,
  createPhones,
  getInstallments,
  createInstallments,
} = require("../services/ClientsService");

module.exports = {
  async getClients(req, res) {
    const clients = await getClients();

    if (clients) {
      res.json(clients);
    } else {
      res.status(404).json("Nenhum cliente encontrado");
    }
  },
  async getClient(req, res) {
    const { client_id } = req.params;
    const client = await getClient({ client_id });

    if (client) {
      res.json(client);
    } else {
      res.status(404).json("Nenhum cliente encontrado.");
    }
  },
  async searchClient(req, res) {
    const client = await searchClient(req.query);

    if (client) {
      res.json(client);
    } else {
      res.status(404).json("Nenhum cliente encontrado.");
    }
  },
  async createClient(req, res) {
    const { address, phones } = req.body;
    const { city, state, country } = address;

    let { country_id } = await getCountry(country);
    if (!country_id) country_id = await createCountry(country);

    let { state_id } = await getState(state);
    if (!state_id) state_id = await createState({ ...state, country_id });

    let { city_id } = await getCity(city);
    if (!city_id) city_id = await createCity({ ...city, state_id });

    let { address_id } = await getAddress(address);
    if (!address_id) address_id = await createAddress({ ...address, city_id });

    let { client_id } = await getClient(req.body);

    if (!client_id) {
      client_id = await createClient({
        ...req.body,
        address_id,
      });

      const { name, created_at, active, birth_date, email } = await getClient({
        client_id,
      });

      const affectedRows = await createPhones({
        client_id,
        phones,
      });

      const phonesClient = await getPhones({ client_id });

      res.status(201).json({
        client_id,
        name,
        created_at,
        birth_date,
        email,
        phones: phonesClient,
        active: active === 1 ? true : false,
      });
    } else {
      res.status(303).json("Usu??rio existente");
    }
  },
  async deleteClient(req, res) {
    const { client_id } = req.params;
    const client = await deleteClient({ client_id, active: false });

    if (client) {
      res.json("Cliente inativado com sucesso.");
    } else {
      res
        .status(404)
        .json("Cliente n??o existe na base de dados para inativa????o.");
    }
  },
  async updateClient(req, res) {
    const data = req.body;

    updateClient(data);

    res.json("Show");
  },
  async getPhones(req, res) {
    const { phones } = req.body;
    const { client_id } = req.params;

    const phonesClient = await getPhones({ phones, client_id });

    res.json(phonesClient);
  },
  async getInstallments(req, res) {
    const { client_id } = req.params;

    const installments = await getInstallments({ ...req.body, client_id });

    res.json(installments);
  },
  async createInstallments(req, res) {
    const { client_id } = req.params;

    const installments = await createInstallments({ ...req.body, client_id });

    res.json(installments);
  },
};
