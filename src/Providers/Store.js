import { createContext } from "react"
import { useState } from "react"

export const StoreContext = createContext()

export default function StoreProvider(props){
    const [modalRegister, setModalRegister] = useState(false)
    const [modalLogin, setModalLogin] = useState(false)

    return(
            <StoreContext.Provider value={{
                modalRegister,
                setModalRegister,
                modalLogin,
                setModalLogin  
                  }}>
                {props.children}
            </StoreContext.Provider>
        
    )
}