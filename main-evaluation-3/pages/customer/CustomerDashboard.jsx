import { useEffect, useState } from "react";

import { getRestaurants } from "../../utils/localStorage";
import Navbar from "../../components/Navbar";
import RestaurantCard from "../../components/ResturantCard";

const CustomerDashboard = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [parking, setParking] = useState("");

    useEffect(() => {
        setRestaurants(getRestaurants());
    }, []);

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

            <div className="content">
                {filtered.map(r => (
                    <RestaurantCard key={r.restaurantID} data={r} />
                ))}
            </div>
        </>
    );
};

export default CustomerDashboard;
