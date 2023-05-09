import { useEffect, useState } from 'react'
import './config'
import * as fcl from "@onflow/fcl"

export function SignInButton() {

  const [user, setUser] = useState({loggedIn: null, addr: null})

  useEffect(() => {fcl.currentUser.subscribe(setUser)}, [])

  const AuthedState = () => {
    return (
      <div>
        <div>Address: {user?.addr ?? "No Address"}</div>
        <button onClick={fcl.unauthenticate}>Log Out</button>
      </div>
    )
  }

  const UnauthenticatedState = () => {
    return (
      <div>
        <button onClick={fcl.authenticate}>Log In</button>
        <button onClick={fcl.signUp}>Sign Up</button>
      </div>
    )
  }

  return (
    <div>
      {user.loggedIn
        ? <AuthedState />
        : <UnauthenticatedState />
      }
    </div>
  )
}

// TODO Sign content

// TODO Verify Content
 