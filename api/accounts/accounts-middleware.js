const accountsDB = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC //
  const { name, budget } = req.body;

  if (!name || !budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (typeof name !== "string") {
    res.status(400).json({ message: "name of account must be a string" });
  } else if (name.length < 3 || name.length > 100) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (typeof budget !== "number") {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else {
    req.body = {name, budget}
    next();
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const {name} = req.body;
 
  const accounts = accountsDB.getAll();

  const nameMatch = accounts.find(account => account.name === name)

  if(nameMatch){
    res.status(400).json({ message: "that name is taken" })
  }
  else{
    next()
  }
};

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.body;

  // const account=[]; 
  
  accountsDB.getById(id)
  .then(result => {
    account = result;
  })
  
  if(account.length === 0){
    res.status(404).json({ message: "account not found" })
  }
  else{
    next();
  }
  
};

// module.exports = {checkAccountId, checkAccountNameUnique, checkAccountPayload}