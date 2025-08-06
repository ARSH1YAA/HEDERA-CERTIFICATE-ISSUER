const express = require("express");
const cors = require("cors");
const path = require("path");
const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");
const axios = require("axios");
require("dotenv").config();
const {
  Client,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  Hbar,
  PrivateKey,
} = require("@hashgraph/sdk");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const operatorId = process.env.ACCOUNT_ID;
const operatorKey = PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

app.post("/create-token", async (req, res) => {
  const recipientId = req.body.recipient?.trim();

  if (!recipientId) {
    return res.status(400).json({ error: "Recipient ID required" });
  }

  try {
    const tx = await new TokenCreateTransaction()
      .setTokenName("HederaCert")
      .setTokenSymbol("CERT")
      .setTreasuryAccountId(recipientId)
      .setTokenType(TokenType.FungibleCommon)
      .setInitialSupply(1)
      .setDecimals(0)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(1)
      .setAdminKey(operatorKey)
      .setSupplyKey(operatorKey)
      .setFreezeDefault(false)
      .setMaxTransactionFee(new Hbar(10))
      .freezeWith(client);

    const signedTx = await tx.sign(operatorKey);
    const submit = await signedTx.execute(client);
    const receipt = await submit.getReceipt(client);
    const tokenId = receipt.tokenId.toString();
    const hashscan = `https://hashscan.io/testnet/token/${tokenId}`;
    const qrImage = await QRCode.toDataURL(hashscan);

    // Verify via Mirror Node
    const mirrorURL = `https://testnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}`;
    let verified = false;
    let retries = 0;
    const maxRetries = 5;

    while (!verified && retries < maxRetries) {
      try {
        const response = await axios.get(mirrorURL);
        if (response.data.token_id) {
          verified = true;
        }
      } catch (err) {
        // not found yet
      }
      if (!verified) {
        await new Promise((r) => setTimeout(r, 1000));
        retries++;
      }
    }

    // Generate PDF
    const doc = new PDFDocument();
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers).toString("base64");
      res.json({
        success: true,
        tokenId,
        hashscan,
        qrImage,
        pdfBase64: pdfData,
        verified,
      });
    });

    doc.fontSize(20).text("🎓 Hedera Certificate Token", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Token ID: ${tokenId}`);
    doc.text(`Recipient: ${recipientId}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.text(`Explorer: ${hashscan}`);
    doc.image(await QRCode.toBuffer(hashscan), { width: 150 });
    doc.end();
  } catch (err) {
    console.error("❌ Token mint failed:", err.message);
    res.status(500).json({ error: "Minting failed" });
  }
});

app.get("/verify-token", async (req, res) => {
  const { tokenId } = req.query;

  if (!tokenId) {
    return res.json({ success: false, error: "Token ID is required" });
  }

  const mirrorURL = `https://testnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}`;

  try {
    const response = await axios.get(mirrorURL);
    return res.json({
      success: true,
      token_id: response.data.token_id,
      symbol: response.data.symbol,
      type: response.data.type,
      treasury_account_id: response.data.treasury_account_id,
      created_timestamp: parseFloat(response.data.created_timestamp),
    });
  } catch (err) {
    return res.json({ success: false, error: "Token not found or invalid ID" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
