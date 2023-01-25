const { resolve } = require("node:path/win32");
const db = require("../db");

module.exports = {
  // Clients
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
  // Client
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
  updateClient({ name, cpf, address, birth_date, email, client_id }) {
    return new Promise((resolve, reject) => {
      // db.query(
      //   "UPDATE clients SET name=?, cpf=?, birth_date=?, email=? WHERE client_id=?",
      //   [name, cpf, birth_date, email, client_id],
      //   (error, results) => {
      //     if (error) {
      //       reject(error);
      //       return;
      //     }

      //     const [client] = results;

      //     client ? resolve(client) : resolve(false);
      //   }
      // );
      resolve(true);
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
  // Phone
  getPhones({ client_id, phones }) {
    const data = { ddds: [], numbers: [] };

    if (phones) {
      phones.forEach(({ ddd, number }) => {
        data.ddds.push(ddd);
        data.numbers.push(number);
      });
    }

    const query = phones
      ? `ddd IN [${data.ddds.join(",")}] AND number IN [${data.numbers.join(
          ","
        )}]`
      : "1 = 1";

    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM phones WHERE client_id = ? AND ?",
        [client_id, query],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }

          const phones = results;

          phones ? resolve(phones) : resolve(false);
        }
      );
    });
  },
  createPhones({ client_id, phones }) {
    const query = phones
      ? phones
          .map(({ ddd, number }) => `(${ddd}, ${number}, ${client_id})`)
          .join(",")
      : "";

    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO phones(ddd, number, client_id) VALUES ${query}`,
        [],
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

  // Toggle Client
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
  //installments
  getInstallments({ initial_date, final_date, paid, client_id }) {
    let query = "";

    if ((initial_date && final_date) || paid !== undefined || client_id) {
      query = " WHERE ";

      if (client_id) {
        query += `client_id = ${client_id} `;
      }

      if (initial_date && final_date && client_id) {
        query += `AND installment_date BETWEEN '${initial_date}' AND '${final_date}' `;
      } else if (initial_date && final_date && !client_id) {
        query += `installment_date BETWEEN '${initial_date}' AND '${final_date}' `;
      }

      if (paid !== undefined) {
        if (client_id || (initial_date && final_date)) {
          query += `AND paid = ${paid}`;
        } else {
          query += `paid = ${paid}`;
        }
      }
    }

    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM installments ${query}`, [], (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        const installments = results.map((installment) => ({
          ...installment,
          paid: installment.paid ? true : false,
        }));

        installments ? resolve(installments) : resolve(false);
      });
    });
  },
  createInstallments({ name, acronym, ddi }) {
    return new Promise((resolve, reject) => {
      // db.query(
      //   "INSERT INTO country(name, acronym, ddi) VALUES (?,?,?)",
      //   [name, acronym, ddi],
      //   (error, results) => {
      //     if (error) {
      //       reject(error);
      //       return;
      //     }

      //     const { insertId } = results;

      //     insertId ? resolve(insertId) : resolve(false);
      //   }
      // );

      resolve(true);
    });
  },
};
