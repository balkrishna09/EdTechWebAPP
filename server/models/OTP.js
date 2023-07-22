const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: ture,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires:5*60,
  },
});


//function to send otp mail

async function sendVerificationEmail(email,otp) {
    try {
        const mailResponse = await mailSender(email, "verification Email from studynotion", otp);
        console.log("email sent sucessfully: ", mailResponse)
        
    } catch (error) {
        console.log("Error occured while sending mail", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP",OTPSchema);
