const { createContext, useState, useContext } = require("react");

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signUp = (email, password) => {
        setUser({ email })
    }

    const login = (email, password) => {
        setUser({ email })
    }

    const logout = () => setUser(null)

    return (
        <AuthContext.Provider value={{ user, signUp, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);