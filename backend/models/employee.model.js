const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    id_instantsi: {
        required: true,
        type: String,
    },
    nik: {
        required: true,
        type: String,
    },
    role: [{
        required: true,
        type: String,
        role: String
    }]
})
const Employee = mongoose.model("employee", employeeSchema);
module.exports = Employee;