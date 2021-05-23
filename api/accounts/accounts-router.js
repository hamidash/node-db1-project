const router = require('express').Router()
const accountsDB = require('./accounts-model')
const accountsMiddleware = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  accountsDB.getAll()
  .then(result => {
    res.status(200).json({data: result});
  })
  .catch(err => {
    res.status(500).json({message: `Failed to get all the accounts`})
  })
})

router.get('/:id', accountsMiddleware.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params
  // console.log(id);
  accountsDB
  .getById(id)
  .then(result => {
    res.status(200).json({data: result})
  })
  .catch(err => {
    res.status(500).json({message: "Failed to  get the requested account id"})
  })
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
  const newAccount = req.body;
  // console.log(newAccount);

  accountsDB
  .create(newAccount)
  .then(resultId => {
    accountsDB.getById(resultId[0])
    .then(result => {
      res.status(200).json({data: result})
    })
    .catch(err => {
      res.status(500).json({message: `Failed to retrieve created account id ${resultId[0]}`})
    })
    // res.status(200).json({data: resultId});
  })
  .catch(err => {
    res.status(500).json({message: `Failed to create a new account`})
  })
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  const updateAccount = req.body;
  const {id} = req.params;

  accountsDB.updateById(id, updateAccount)
  .then(result => {
    if(result === 0){
      res.status(404).json({message: `No records were found to be updated`})
    }
    else{
      res.status(200).json({message: `Account id ${id} succcessfully updated`})
    }
  })
  .catch(err => {
       res.status(500).json({message: `Failed to update id ${id}`})
  })
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params
  accountsDB.deleteById(id)
  .then(result => {
    res.status(200).json({message: `Account id ${id} deleted successfully`})
  })
  .catch(err => res.status(500).json({message: `Failed to deleted acount id ${id}`}))
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({
    message: `failed to route in accounts router`,
    error: err.message,
  })
  next()
})

module.exports = router;
