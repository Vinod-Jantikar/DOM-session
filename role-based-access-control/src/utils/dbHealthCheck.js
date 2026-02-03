const supabase = require("../config/supabase.config");

const dbHealtCheck = async () => {
    try {
        const { error } = await supabase.from("users").select("id").limit(1);

        if (error) {
            console.log("Supabase connection failed.");
            process.exit(1);
        }
        console.log("Supabase connection successful.")
    } catch (error) {
        console.log("Error occured while connecting to database.");

    }
};

module.exports = dbHealtCheck