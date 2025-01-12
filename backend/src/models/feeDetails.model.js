import mongoose, { Schema } from "mongoose";

const feeDetailsSchema = new Schema(
    {
        serialNumber: {
            type: Number,
            required: true
        },
        availingHostel: {
            type: String,
            enum: ['Yes', 'No'],
            required: true
        },
        idNumber: {
            type: String,
            required: true,
            unique: true
        },
        candidateName: {
            type: String,
            required: true
        },
        academicSession: {
            type: String,
            required: true
        },
        program: {
            type: String,
            required: true
        },
        semester: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        admissionFee: {
            type: Number,
            required: true
        },
        idCardFee: {
            type: Number,
            required: true
        },
        libraryFee: {
            type: Number,
            required: true
        },
        celebrationFee: {
            type: Number,
            required: true
        },
        placementFee: {
            type: Number,
            required: true
        },
        alumniMembership: {
            type: Number,
            required: true
        },
        cautionMoneyDeposit: {
            type: Number,
            required: true
        },
        registrationFee: {
            type: Number,
            required: true
        },
        tuitionFee: {
            type: Number,
            required: true
        },
        coSAFee: {
            type: Number,
            required: true
        },
        healthFacility: {
            type: Number,
            required: true
        },
        otherFee: {
            type: Number,
            required: true
        },
        studentWelfareFund: {
            type: Number,
            required: true
        },
        insurancePremium: {
            type: Number,
            required: true
        },
        hostelAdmissionFee: {
            type: Number,
            required: true
        },
        hostelLicenseFee: {
            type: Number,
            required: true
        },
        establishmentCharges: {
            type: Number,
            required: true
        },
        diningCharges: {
            type: Number,
            required: true
        },
        grossTotalFee: {
            type: Number,
            required: true
        },
        feeWaiver: {
            type: Number
        },
        feeAdjustment: {
            type: Number
        },
        payableFee: {
            type: Number,
            required: true
        }
    });

    const feeDetailsModel = mongoose.model("feeDetails", feeDetailsSchema);

    export default feeDetailsModel;