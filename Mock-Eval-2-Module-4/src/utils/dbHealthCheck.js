const supabase = require('../configs/supabase.config');

async function checkDatabaseConnection() {
    try {
        const { error } = await supabase.from("consumers").select().limit(1);

        if (error) {
            throw error;
        }
        console.log("Database connected successfully");
        return true
    } catch (error) {
        console.log("Database connection failed", error.message);
        return false
    }
}

module.exports = checkDatabaseConnection