const supabase = require("../config/supabase.config");

const getProducts = async (req, res) => {
    try {
        const { data, error, status, statusText } = await supabase.from("products").select();

        res.status(status).send({
            status: true,
            statusText: statusText,
            message: "Products data fetched successfully",
            data
        })
    } catch (error) {
        console.log("Error occured while fetching the products data", error.message);

    }
}

module.exports = getProducts