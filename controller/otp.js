const otpStore = new Map();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const sendOtp = (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber)
    return res.status(400).json({ message: "Phone number required" });

  const otp = generateOTP();
  otpStore.set(phoneNumber, otp);

  console.log(`OTP for ${phoneNumber}: ${otp}`); 

  res.json({ message: "OTP sent successfully" });
};

export const verifyOtp = (req, res) => {
  const { phoneNumber, otp } = req.body;
  if (!phoneNumber || !otp)
    return res.status(400).json({ message: "Phone and OTP required" });

  const storedOtp = otpStore.get(phoneNumber);
  if (storedOtp === otp) {
    otpStore.delete(phoneNumber);
    return res.json({ message: "OTP verified successfully" });
  }

  res.status(401).json({ message: "Invalid OTP" });
};
