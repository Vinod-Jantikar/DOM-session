import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = ({ search, setSearch, type, setType, parking, setParking }) => {
    const inputRef = useRef();
    const { logout } = useAuth()

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleLogout = () => {
        logout()
    }
    
    return (
        <div className="navbar">
            <input
                ref={inputRef}
                placeholder="Search by name or address"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <select value={type} onChange={e => setType(e.target.value)}>
                <option value="">All Types</option>
                <option>Rajasthani</option>
                <option>Gujarati</option>
                <option>Mughlai</option>
                <option>Jain</option>
                <option>Thai</option>
                <option>North Indian</option>
                <option>South Indian</option>
            </select>

            <select value={parking} onChange={e => setParking(e.target.value)}>
                <option value="">All Parking</option>
                <option value="true">Parking</option>
                <option value="false">No Parking</option>
            </select>


            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Navbar;
