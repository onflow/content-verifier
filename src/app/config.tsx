import * as fcl from "@onflow/fcl";

const Title = "Contect Verifier";
const Icon = null; // TODO: set icon

fcl.config({
  "flow.network": "testnet",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "app.detail.title": Title
})
