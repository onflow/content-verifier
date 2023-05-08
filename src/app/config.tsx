import * as fcl from "@onflow/fcl"

const Title = "Contect Verifier"
const Icon = null // TODO: set icon

fcl
  .config()
  .put("flow.network", "testnet")
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")
  .put("app.detail.title", Title)
