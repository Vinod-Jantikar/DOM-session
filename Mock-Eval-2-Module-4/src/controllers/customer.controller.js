const supabase = require("../configs/supabase.config");

const registerUser = async (req, res) => {
    try {
        // Destructure required fields from request body
        const { full_name, email, phone } = req.body;

        // Check if a user already exists with the given email
        const { data: existing } = await supabase
            .from('customers')          // Target customers table
            .select()                   // Select all columns
            .eq("email", email)         // Filter where email matches
            .single();                  // Expect a single matching record

        // If user already exists, return conflict response
        if (existing) {
            return res.status(409).json({
                status: false,
                error: `User with the email: ${email} already exist.`
            });
        }

        // Insert new user data into customers table
        const { data, error } = await supabase
            .from('customers')          // Target customers table
            .insert([{                 // Insert new row
                full_name,
                email,
                phone
            }])
            .select()                   // Return inserted row
            .single();                  // Expect a single inserted record

        // Handle database insertion error
        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        // Send success response with newly created user data
        res.status(201).json({
            status: true,
            message: 'User created successfully.',
            data
        });

    } catch (error) {
        // Catch unexpected runtime errors
        res.status(500).json({
            status: false,
            error: error.message
        });
    }
};

const getUsers = async (req, res) => {
    try {
        // Extract userId from route query (may or may not exist)
        const { userId } = req.query;

        let query = supabase
            .from("customers")
            .select("*");

        // If userId exists → fetch single user
        if (userId) {
            query = query.eq("id", userId).single();
        }

        // Execute query
        const { data, error } = await query;

        // Handle DB error
        if (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }

        // If userId was provided but no user found
        if (userId && !data) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        // Success response
        res.status(200).json({
            status: true,
            message: "Users data fetched successfully.",
            count: Array.isArray(data) ? data.length : 1,
            data
        });

    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};

const getSingleUserData = async (req, res) => {
    try {
        // Extract userId from route params (Mandatory)
        const { userId } = req.params;

        // Validate userId
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "User ID is required"
            });
        }

        let query = supabase
            .from("customers")
            .select("*")
            .eq("id", userId)
            .single()

        // Execute query
        const { data, error } = await query;

        // Handle DB error
        if (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }


        // Success response
        res.status(200).json({
            status: true,
            message: "Users data fetched successfully.",
            count: Array.isArray(data) ? data.length : 1,
            data
        });

    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};

const updateUser = async (req, res) => {
    try {
        // Extract userId from URL params
        const { userId } = req.params;

        // Extract fields to update from request body
        const { full_name, phone } = req.body;

        // Validate userId
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "User ID is required"
            });
        }

        // Check if user exists before updating
        const { data: existingUser } = await supabase
            .from("customers")
            .select("id")
            .eq("id", userId)
            .single();

        // If user does not exist, return 404
        if (!existingUser) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        // Update user data
        const { data, error } = await supabase
            .from("customers")          // Target customers table
            .update({                  // Fields to update
                full_name,
                phone
            })
            .eq("id", userId)           // Update where id matches
            .select()                   // Return updated record
            .single();                  // Expect one updated row

        // Handle update error
        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        // Send success response with updated data
        res.status(200).json({
            status: true,
            message: "User updated successfully",
            data
        });

    } catch (error) {
        // Catch unexpected runtime errors
        res.status(500).json({
            status: false,
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        // Extract userId from URL params (/customers/:customerId)
        const { userId } = req.params;

        // Validate if userId is provided in request
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        // Send DELETE request to Supabase 'customers' table
        const { data, error } = await supabase
            .from("customers")        // Target the customers table
            .delete()                 // Perform DELETE operation
            .eq("id", userId)     // Delete only where id matches userId
            .select()                 // Return deleted row data
            .single();                // Expect exactly one deleted record

        // Handle database-level error (query failure, permission issue, etc.)
        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        // If no customer was found/deleted, data will be null
        if (!data) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        // Successful deletion response
        // Related orders are automatically deleted due to ON DELETE CASCADE
        res.status(200).json({
            message: "Customer deleted successfully (orders deleted via cascade)"
        });

    } catch (err) {
        // Catch unexpected runtime errors (crashes, unhandled promises, etc.)
        console.error("Delete customer error:", err);

        // Send generic error response to avoid exposing internals
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = { registerUser, getUsers, getSingleUserData, updateUser, deleteUser }