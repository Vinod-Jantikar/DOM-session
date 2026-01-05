import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRestaurants, saveRestaurants } from "../../utils/localStorage";

const UpdateRestaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);

    useEffect(() => {
        const data = getRestaurants().find(
            r => r.restaurantID === Number(id)
        );
        setForm(data);
    }, [id]);

    if (!form) return null;

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        if (!window.confirm("Update this restaurant?")) return;

        const updated = getRestaurants().map(r =>
            r.restaurantID === form.restaurantID ? form : r
        );

        saveRestaurants(updated);
        alert("Restaurant updated successfully");
        navigate("/admin/dashboard");
    };

    return (
        <div className="sidebar">
            <h3>Update Restaurant</h3>

            <input
                name="restaurantName"
                value={form.restaurantName}
                onChange={handleChange}
            />

            <input
                name="address"
                value={form.address}
                onChange={handleChange}
            />

            <select name="type" value={form.type} onChange={handleChange}>
                <option>Rajasthani</option>
                <option>Gujarati</option>
                <option>Mughlai</option>
                <option>Jain</option>
                <option>Thai</option>
                <option>North Indian</option>
                <option>South Indian</option>
            </select>

            <select
                name="parkingLot"
                value={form.parkingLot}
                onChange={e =>
                    setForm({ ...form, parkingLot: e.target.value === "true" })
                }
            >
                <option value="true">Parking</option>
                <option value="false">No Parking</option>
            </select>

            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default UpdateRestaurant;
