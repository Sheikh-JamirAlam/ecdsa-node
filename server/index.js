const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const balances = {
  "020a91ae9cbf4cf68de3f8e40dd0ff8c334d3dc43667a1f58d965f6a6c77ca1164": 100,
  "038dcae8af5d677f7eaec8f38d7e92cfab91db152dd9235f26add80ac38630b626": 50,
  "03028724d7cf2d95840a84725c6f7ce2d11664863d46083f61f51ce931d76cf635": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, r, s, recovery, amount, recipient } = req.body;
  msgHash = keccak256(utf8ToBytes("Signature"));
  const bigIntR = BigInt(r);
  const bigIntS = BigInt(s);
  const signature = new secp.secp256k1.Signature(bigIntR, bigIntS, parseInt(recovery));
  const verified = secp.secp256k1.verify(signature, msgHash, sender);

  if (verified) {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
