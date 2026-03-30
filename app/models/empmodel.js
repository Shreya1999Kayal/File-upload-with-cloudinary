const mongoose = require("mongoose")


const Schema = mongoose.Schema



const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    empid: {
        type: Number,
        default: () => Math.ceil(Math.random() * (999999 - 100000 + 1) + 100000),

    },
    contact: {
        phno: {
            type: String,
            required: true,
            match: /^[0-9]{10}$/
            //min: 1000000000,
            //max: 9999999999
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String,
            required: true,
        },
        full_address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
    },
    department: {
        departname: {
            type: String,
            required: true
        }
    },
    salary: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        url: {
            type: String,
            default: ''
        },
        public_id: {
            type: String,
            default: ''
        }
    },

    isdeleted: {
        type: Boolean,
        default: false,
        index: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Employee', employeeSchema)