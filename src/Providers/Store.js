import { createContext } from "react"
import { useState } from "react"

export const StoreContext = createContext()

export default function StoreProvider(props){
    const [modalRegister, setModalRegister] = useState(false)
    const [modalLogin, setModalLogin] = useState(false)
    const [token, setToken] = useState([])

    return(
            <StoreContext.Provider value={{
                modalRegister,
                setModalRegister,
                modalLogin,
                setModalLogin,
                token,
                setToken 
                  }}>
                {props.children}
            </StoreContext.Provider>
        
    )
}