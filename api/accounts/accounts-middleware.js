const accountsDb = require('./accounts-model');//

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {name, budget} = req.body;
  
  if(!name || !budget) {
    res.status(400).json({ message: "name and budget are required" })
  }else if(typeof name !== "string") {
    res.status(400).json({ message: "name of account must be a string" })  
  }else if(name.length<3 || name.length>100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" }
    )
  }else if(typeof budget !== "number"){
    res.status(400).json({ message: "budget of account must be a number" })
  }else if(budget<0 || budget>1000000){
    res.status(400).json({ message: "budget of account is too large or too small" })
  }else {
    next()
  }

}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const {name} = req.body;
  accountsDb.getAll()
  .then(accounts => {
    const account = accounts.find(record => record.name === name)
    if(account){
      res.status(400).json({ message: "that name is taken" })
    }else{
      next();
    }
  })
  .catch(err => res.status(500).json({message: "Couldn't check account name unique"}))
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params;

  accountsDb.getById(id)
  .then(account => {
   
    if(!account){
      res.status(404).json({ message: "account not found" })
    }else{
      req.account = account;
      next();
    }

  })
  .catch(err => {
    res.status(500).json({message: `Couldn't retrive account id ${id}` })
  })

}
