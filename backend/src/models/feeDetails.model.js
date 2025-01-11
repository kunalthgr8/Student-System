import mongoose, { Schema } from "mongoose";

const feeDetailsSchema = new Schema(
    {
        'S.N.': {
            type: Number,
            required: true
        },
        'Availing Hostel Facility': {
            type: String,
            enum: ['Yes', 'No'],
            required: true
        },
        'ID Number': {
            type: String,
            required: true,
            unique: true
        },
        'Name of the Candidate': {
            type: String,
            required: true
        },
        'Academic Session': {
            type: String,
            required: true
        },
        'Program': {
            type: String,
            required: true
        },
        'Semester': {
            type: Number,
            required: true
        },
        'Category': {
            type: String,
            required: true
        },
        'Admission Fee': {
            type: Number,
            required: true
        },
        'ID Card and Certificates Fee': {
            type: Number,
            required: true
        },
        'Library Fee': {
            type: Number,
            required: true
        },
        'Celebration Fee': {
            type: Number,
            required: true
        },
        'Training & Placement Fee': {
            type: Number,
            required: true
        },
        'Alumni Life Membership': {
            type: Number,
            required: true
        },
        'Caution Money Deposite': {
            type: Number,
            required: true
        },
        'Registration Fee': {
            type: Number,
            required: true
        },
        'Tuition Fee': {
            type: Number,
            required: true
        },
        'CoSA Fee': {
            type: Number,
            required: true
        },
        'Health Facility Charges': {
            type: Number,
            required: true
        },
        'Other Fee': {
            type: Number,
            required: true
        },
        'Student Welfare Fund (Not Fee)': {
            type: Number,
            required: true
        },
        'Insurance Premium': {
            type: Number,
            required: true
        },
        'Hostel Admission Fee': {
            type: Number,
            required: true
        },
        'Hostel License Fee': {
            type: Number,
            required: true
        },
        'Hostel and Mess Establishment Charges': {
            type: Number,
            required: true
        },
        'Dinning Charges': {
            type: Number,
            required: true
        },
        'Gross Total Fee': {
            type: Number,
            required: true
        },
        'Fee Waiver': {
            type: Number
        },
        'Seat Booking/ Dining Fee Adjustment': {
            type: Number
        },
        'Payable Fee': {
            type: Number,
            required: true
        }
    });

    const feeDetailsModel = mongoose.model("feeDetails", feeDetailsSchema);

    export default feeDetailsModel;