import { useState } from "react";
import { getRestaurants, saveRestaurants } from "../utils/localStorage";

const IMAGE_URL =
    "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg";

const TYPES = [
    "Rajasthani",
    "Gujarati",
    "Mughlai",
    "Jain",
    "Thai",
    "North Indian",
    "South Indian",
];

const Sidebar = ({ onAdd }) => {
    const [form, setForm] = useState({
        restaurantName: "",
        address: "",
        type: "Rajasthani",
        parkingLot: "true",
        image: IMAGE_URL,
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        const existing = getRestaurants();

        const newRestaurant = {
            restaurantID: existing.length
                ? existing[existing.length - 1].restaurantID + 1
                : 1,
            restaurantName: form.restaurantName,
            address: form.address,
            type: form.type,
            parkingLot: form.parkingLot === "true",
            image: form.image,
        };

        const updated = [...existing, newRestaurant];
        saveRestaurants(updated);
        onAdd(updated);

        setForm({ ...form, restaurantName: "", address: "" });
    };

    return (
        <div className="sidebar">
            <h3>Add Restaurant</h3>

            <input
                name="restaurantName"
                placeholder="Restaurant Name"
                value={form.restaurantName}
                onChange={handleChange}
            />

            <input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
            />

            <select name="type" value={form.type} onChange={handleChange}>
                {TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>

            <select
                name="parkingLot"
                value={form.parkingLot}
                onChange={handleChange}
            >
                <option value="true">Parking Available</option>
                <option value="false">No Parking</option>
            </select>

            <input
                name="image"
                value={form.image}
                onChange={handleChange}
            />

            <button onClick={handleAdd}>Add</button>
        </div>
    );
};

export default Sidebar;
