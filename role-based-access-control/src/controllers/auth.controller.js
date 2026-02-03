const supabase = require("../config/supabase.config");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({
                status: false,
                error: "Name, email and password fields are required."
            })
        };

        if (role && !["ADMIN", "MANAGER", "USER"].includes(role)) {
            return res.status(400).send({
                status: false,
                error: "Role field can have ADMIN , USER or MANAGER values."
            })
        }

        const { data: existing } = await supabase.from("users").select().eq("email", email).maybeSingle();

        if (existing) {
            return res.status(409).send({
                status: false,
                error: `User with the email ${email} already exists.`
            })
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const payload = {
            email,
            name,
            password: hashedPassword
        }

        if (role) payload.role = role

        const { data, error } = await supabase.from("users").insert(payload).select("name, email, role")

        if (error) throw error;

        res.status(201).send({
            status: true,
            message: `User created successfully.`,
            data
        })
    } catch (error) {
        console.log("Error occured while registering a new user is", error.message)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                status: false,
                error: "Email and password fields are required."
            })
        };

        const { data: existing } = await supabase.from("users").select().eq("email", email).maybeSingle();

        if (!existing) {
            return res.status(404).send({
                status: false,
                error: `User not found`
            })
        };

        const isMatch = await bcrypt.compare(password, existing.password);

        if (!isMatch) {
            return res.status(400).send({
                status: false,
                error: `Invalid Credentials.`
            })
        }

        const token = jwt.sign(
            { id: existing.id, role: existing.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        const response = {
            id: existing.id,
            name: existing?.name,
            email: existing?.email,
            role: existing?.role,
            token
        }

        res.status(200).send({
            status: true,
            message: `User logged in successfully.`,
            response
        })
    } catch (error) {
        console.log("Error occured while signing in is", error.message);
    }
}


module.exports = {
    signup,
    login
}