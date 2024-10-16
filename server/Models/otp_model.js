const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {generate} = require('otp-generator');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresIn: { // Time in minutes
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

otpSchema.statics.generateOTP = async function (email, purpose) {
    const otp = await this.findOne({email, purpose});
    if(otp) {
        await otp.remove();
    }
    const new_otp = generate(6, {upperCase: false, specialChars: false});
    const hashedOTP = await bcrypt.hash(new_otp, 10);
    const expiresIn = 5;
    await this.create({email, otp: hashedOTP, purpose, expiresIn});
    return new_otp;
};

otpSchema.statics.verifyOTP = async function (email, otp, purpose) {
    const _otp = await this.findOne({email, purpose});
    if(!_otp) {
        throw new Error("OTP not found");
    }
    const isValid = await bcrypt.compare(otp, _otp.otp);
    if(!isValid) {
        throw new Error("Invalid OTP");
    }

    await this.deleteOne({ _id: _otp._id });
    return true;
}

const OTP = mongoose.model('OTP', otpSchema);
module.exports = OTP;