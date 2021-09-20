const router = require("express").Router();
const accountsDb = require("./accounts-model");
const accountsMiddleware = require("./accounts-middleware");

router.get("/", (req, res, next) => {
  // DO YOUR MAGIC
  accountsDb
    .getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      res.status(500).json({ message: `Couldn't retrive all accounts` });
    });
});

router.get("/:id", accountsMiddleware.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account);
});

router.post(
  "/",
  accountsMiddleware.checkAccountPayload,
  accountsMiddleware.checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC
    let { name, budget } = req.body;
    name = name.trim();

    accountsDb
      .create({ name, budget })
      .then((account) => {
        res.status(201).json({ name, budget });
      })
      .catch((err) =>
        res.status(500).json({ message: "New account couldnt be created" })
      );
  }
);

router.put("/:id", accountsMiddleware.checkAccountPayload, accountsMiddleware.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  let { name, budget } = req.body;
  name = name.trim();
  const updatedAccount = {name, budget };
  accountsDb
    .updateById(id, updatedAccount)
    .then((account) => {
      res.status(200).json(updatedAccount);
    })
    .catch((err) => {
      res.status(500).json({ message: "The account could not be updated" });
    });
});

router.delete("/:id", accountsMiddleware.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  accountsDb
    .deleteById(id)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      res.status(500).json({ message: "The account could not be removed" });
    });
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json(err)
});

module.exports = router;
