import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRestaurants, saveRestaurants } from "../../utils/localStorage";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RestaurantCard from "../../components/ResturantCard";


const AdminDashboard = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [parking, setParking] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setRestaurants(getRestaurants());
    }, []);

    const handleDelete = id => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        const updated = restaurants.filter(r => r.restaurantID !== id);
        saveRestaurants(updated);
        setRestaurants(updated);
        alert("Restaurant deleted successfully");
    };

    const filtered = restaurants.filter(r => {
        return (
            (r.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
                r.address.toLowerCase().includes(search.toLowerCase())) &&
            (type ? r.type === type : true) &&
            (parking ? String(r.parkingLot) === parking : true)
        );
    });

    return (
        <>
            <Navbar
                search={search}
                setSearch={setSearch}
                type={type}
                setType={setType}
                parking={parking}
                setParking={setParking}
            />

            <div className="admin-container">
                <Sidebar onAdd={setRestaurants} />

                <div className="content">
                    {filtered.map(r => (
                        <RestaurantCard
                            key={r.restaurantID}
                            data={r}
                            isAdmin
                            onDelete={handleDelete}
                            onUpdate={id => navigate(`/admin/restaurants/update/${id}`)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
