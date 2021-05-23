const accountsDB = require("../../data/db-config");

const getAll = () => {
  // DO YOUR MAGIC
  const accounts = accountsDB("accounts");
  return accounts;
};

const getById = (id) => {
  // DO YOUR MAGIC
  const account = accountsDB("accounts").where({id});
  return account;
};

const create = async (account) => {
  // DO YOUR MAGIC
  const newAccount = accountsDB("accounts").insert(account);
  
  return newAccount;
};

const updateById = (id, account) => {
  // DO YOUR MAGIC
  const updatedAccount = accountsDB("accounts").update(account).where({id});
  return updatedAccount;
};

const deleteById = (id) => {
  // DO YOUR MAGIC
  const deletedAcct = accountsDB("accounts").del().where({id})
  
  return deletedAcct;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
