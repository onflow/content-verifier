import { useEffect, useState } from "react";
import "./config";
import * as fcl from "@onflow/fcl";

export function SignInButton() {
  const [user, setUser] = useState({ loggedIn: null, addr: null });

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, []);

  const AuthedState = () => {
    return (
      <div className="flex flex-row justify-center items-center">
        <div>Address: {user?.addr ?? "No Address"}</div>
        <button
          className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fcl.unauthenticate}
        >
          Log Out
        </button>
      </div>
    );
  };

  const UnauthenticatedState = () => {
    return (
      <div>
        <button
          className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fcl.authenticate}
        >
          Log In
        </button>
        <button
          className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fcl.signUp}
        >
          Sign Up
        </button>
      </div>
    );
  };

  return (
    <div className="no-wrap">
      {user.loggedIn ? <AuthedState /> : <UnauthenticatedState />}
    </div>
  );
}
