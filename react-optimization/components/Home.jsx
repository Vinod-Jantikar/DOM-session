import React, { Suspense, useState } from 'react'
import Header from './Header';
import ProductList from './ProductList';
import Analytics from './Analytics'

// const Analytics = React.lazy(() => import("./Analytics"));

const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" },
    { id: 3, name: "Tablet" }
];


const Home = () => {
    const [orders, setOrders] = useState(0);
    const [showAnalytics, setShowAnalytics] = useState(false);

    return (
        <div style={{ padding: "20px" }}>
            <Header title="Admin Dashboard" />

            <h2>Orders Today: {orders}</h2>

            <button onClick={() => setOrders(orders + 1)}>
                Increase Orders
            </button>

            <ProductList products={products} />

            <br />

            <button onClick={() => setShowAnalytics(true)}>
                View Analytics
            </button>

            <Suspense fallback={<h3>Loading Analytics...</h3>}>
                {showAnalytics && <Analytics />}
            </Suspense>
        </div>
    )
}

export default Home
