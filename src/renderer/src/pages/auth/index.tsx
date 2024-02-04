import { useState } from "react"

import Login from "./login"
import Register from "./register"

import { SMain } from "./style"

import { C } from "@renderer/components/Form"
import useAuth from "@renderer/hook/useAuth"

function Auth(): JSX.Element {
    const { del } = useAuth()
    const [ rainbow_animation ] = useState<boolean>(true)

    del()
    
    return (
        <SMain $rainbow_animation={rainbow_animation} >
            <C.Content>
                <Login />
                <Register />
            </C.Content>
        </SMain>
    )
}

export default Auth