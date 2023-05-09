import "./config";
import * as fcl from "@onflow/fcl";

export function SignInButton() {
  const handleSignIn = () => {
    fcl.authenticate();
  };

  return <button onClick={handleSignIn}>Sign In</button>;
}

// TODO Sign content

// TODO Verify Content
