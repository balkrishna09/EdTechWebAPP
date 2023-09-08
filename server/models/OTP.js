const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");


const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
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
        const mailResponse = await mailSender(email, "verification Email from studynotion", otpTemplate(otp));
        console.log("email sent sucessfully: ", mailResponse.response)
        
    } catch (error) {
        console.log("Error occured while sending mail", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next){
  console.log("new document saved to database");

  if(this.isNew){
    await sendVerificationEmail(this.email, this.otp);
  }
    next();
})

module.exports = mongoose.model("OTP",OTPSchema);
