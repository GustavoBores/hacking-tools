import { useState } from "react"

import { SMain } from "./style"

function Auth(): JSX.Element {
    const [ animation_rgb, setAnimation_rgb ] = useState<boolean>(false)

    return (
        <SMain $animation_rgb={animation_rgb} >
            
        </SMain>
    )
}

export default Auth