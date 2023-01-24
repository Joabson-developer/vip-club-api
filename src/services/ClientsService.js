const db = require("../db");

module.exports = {
  getClients() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM clients WHERE active = true",
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(results);
        }
      );
    });
  },
  searchClient({ client_id, name, cpf, birth_date, email }) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM clients WHERE client_id = ? OR name LIKE ? OR cpf = ? OR birth_date = ? OR email = ?",
        [client_id, `%${name}%`, cpf, birth_date, email],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          const [client] = results;

          client ? resolve(client) : resolve(false);
        }
      );
    });
  },
  getClient({ client_id, name, cpf }) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM clients WHERE client_id = ? OR name = ? OR cpf = ?",
        [client_id, name, cpf],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          const [client] = results;

          client ? resolve(client) : resolve(false);
        }
      );
    });
  },
  createClient({ name, cpf, birth_date, email, address_id }) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO clients(name, cpf, address_id, birth_date, email) VALUES (?,?,?,?,?)",
        [name, cpf, address_id, birth_date, email],

        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          const { insertId } = results;

          insertId ? resolve(insertId) : resolve(false);
        }
      );
    });
  },
  // Address
  getAddress({ street, number, cep }) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM address WHERE street LIKE ? AND number = ? AND cep = ?",
        [`%${street}%`, number, cep],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          const [address] = results;

          address ? resolve(address) : resolve(false);
        }
      );
    });
  },
  createAddress({ street, number, cep, city_id }) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO address(street, number, cep, city_id) VALUES (?,?,?,?)",
        [street, number, cep, city_id],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          const { insertId } = results;

          insertId ? resolve(insertId) : resolve(false);
        }
      );
    });
  },
  // City
  getCity({ name }) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM city WHERE name LIKE ?",
        [`%${name}%`],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          const [city] = results;

          city ? resolve(city) : resolve(false);
        }
      );
    });
  },
  createCity({ name, state_id }) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO city(name, state_id) VALUES (?,?)",
        [name, state_id],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          const { insertId } = results;

          insertId ? resolve(insertId) : resolve(false);
        }
      );
    });
  },
  // State
  getState({ name }) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM state WHERE name LIKE ?",
        [`%${name}%`],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          const [state] = results;

          state ? resolve(state) : resolve(false);
        }
      );
    });
  },
  createState({ name, uf, country_id }) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO state(name, uf, country_id) VALUES (?,?,?)",
        [name, uf, country_id],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          const { insertId } = results;

          insertId ? resolve(insertId) : resolve(false);
        }
      );
    });
  },
  // Country
  getCountry({ name }) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM country WHERE name LIKE ?",
        [`%${name}%`],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          const [country] = results;

          country ? resolve(country) : resolve(false);
        }
      );
    });
  },
  createCountry({ name, acronym, ddi }) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO country(name, acronym, ddi) VALUES (?,?,?)",
        [name, acronym, ddi],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          const { insertId } = results;

          insertId ? resolve(insertId) : resolve(false);
        }
      );
    });
  },
  toggleClient({ active = false, client_id }) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE clients SET active = ? WHERE client_id = ?",
        [active, client_id],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          const { affectedRows } = results;

          affectedRows ? resolve(affectedRows) : resolve(false);
        }
      );
    });
  },
};
