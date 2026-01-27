const supabase = require("../configs/supabase.config");

const createOrder = async (req, res) => {
    try {
        // Extract order details from request body
        const { product_name, quantity, price, customerId } = req.body;

        // Validate required fields
        if (!product_name || !quantity || !price || !customerId) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }

        // Check whether the customer exists
        const { data: customer, error: customerError } = await supabase
            .from("customers")          // Target customers table
            .select("id")               // Select only id
            .eq("id", customerId)       // Match customerId
            .maybeSingle();             // Return null if not found

        // Handle customer lookup error
        if (customerError) {
            return res.status(500).json({
                status: false,
                message: customerError.message
            });
        }

        // If customer does not exist
        if (!customer) {
            return res.status(404).json({
                status: false,
                message: "Customer not found"
            });
        }

        // Insert new order linked to customer
        const { data, error } = await supabase
            .from("orders")             // Target orders table
            .insert([{
                product_name,
                quantity,
                price,
                customer_id: customerId
            }])
            .select()                   // Return inserted order
            .single();                  // Expect exactly one row

        // Handle insert error
        if (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }

        // Success response
        res.status(201).json({
            status: true,
            message: "Order created successfully",
            data
        });

    } catch (err) {
        // Catch unexpected runtime errors
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};


const getOrders = async (req, res) => {
    try {
        // Extract optional customerId from query params
        const { customerId } = req.query;

        // Start base query
        let query = supabase
            .from("orders")
            .select("*");

        // If customerId is provided, filter orders
        if (customerId) {
            query = query.eq("customer_id", customerId);
        }

        // Execute query
        const { data, error } = await query;

        // Handle database error
        if (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }

        // Success response
        res.status(200).json({
            status: true,
            count: data.length,
            data
        });

    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};


const updateOrder = async (req, res) => {
    try {
        // Extract orderId from URL params
        const { orderId } = req.params;

        // Extract updatable fields from request body
        const { quantity, price, order_status } = req.body;

        // Validate orderId
        if (!orderId) {
            return res.status(400).json({
                status: false,
                message: "Order ID is required"
            });
        }

        // Check if order exists
        const { data: existingOrder } = await supabase
            .from("orders")
            .select("id")
            .eq("id", orderId)
            .maybeSingle();

        // If order does not exist
        if (!existingOrder) {
            return res.status(404).json({
                status: false,
                message: "Order not found"
            });
        }

        // Update order
        const { data, error } = await supabase
            .from("orders")
            .update({
                quantity,
                price,
                order_status
            })
            .eq("id", orderId)
            .select()
            .single();

        // Handle update error
        if (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }

        // Success response
        res.status(200).json({
            status: true,
            message: "Order updated successfully",
            data
        });

    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        // Extract orderId from URL params
        const { orderId } = req.params;

        // Validate orderId
        if (!orderId) {
            return res.status(400).json({
                status: false,
                message: "Order ID is required"
            });
        }

        // Delete order by ID
        const { data, error } = await supabase
            .from("orders")
            .delete()
            .eq("id", orderId)
            .select()
            .single();

        // Handle delete error
        if (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }

        // If no order was deleted
        if (!data) {
            return res.status(404).json({
                status: false,
                message: "Order not found"
            });
        }

        // Success response
        res.status(200).json({
            status: true,
            message: "Order deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder
}