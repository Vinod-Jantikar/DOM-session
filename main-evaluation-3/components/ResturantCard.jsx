const RestaurantCard = ({ data, isAdmin, onDelete, onUpdate }) => {
    return (
        <div className="card">
            <img src={data.image} alt={data.restaurantName} />

            <div>
                <h3>{data.restaurantName}</h3>
                <p>{data.address}</p>
                <p><b>Type:</b> {data.type}</p>
                <p><b>Parking:</b> {data.parkingLot ? "Yes" : "No"}</p>

                {isAdmin && (
                    <div style={{ marginTop: "10px" }}>
                        <button onClick={() => onUpdate(data.restaurantID)}>
                            Update
                        </button>
                        <button
                            onClick={() => onDelete(data.restaurantID)}
                            style={{ marginLeft: "10px", background: "red", color: "white" }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantCard;
