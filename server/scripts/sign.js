const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const privateKeyJamir = "f91569847780bd075fa7f8f389f29d737a6f9cf81f27d35b25e29e3ce6bcdab8";
const publicKeyJamir = "020a91ae9cbf4cf68de3f8e40dd0ff8c334d3dc43667a1f58d965f6a6c77ca1164";

const privateKeySudip = "0cd0b003b717a7825950308682aca825934d9a3f7cb2b2901c98d3642d7671ca";
const publicKeySudip = "038dcae8af5d677f7eaec8f38d7e92cfab91db152dd9235f26add80ac38630b626";

const privateKeyRahul = "de5ebc23b53e38e09313afddf037c2e52bedd74a34b1a7b5ede55c193eb2f1cf";
const publicKeyRahul = "03028724d7cf2d95840a84725c6f7ce2d11664863d46083f61f51ce931d76cf635";

const message = "Signature";
const signatureJamir = secp.secp256k1.sign(keccak256(utf8ToBytes(message)), privateKeyJamir);
console.log(signatureJamir);
const signatureSudip = secp.secp256k1.sign(keccak256(utf8ToBytes(message)), privateKeySudip);
console.log(signatureSudip);
const signatureRahul = secp.secp256k1.sign(keccak256(utf8ToBytes(message)), privateKeyRahul);
console.log(signatureRahul);
