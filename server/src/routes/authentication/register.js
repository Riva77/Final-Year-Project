const router = require("express").Router();
const { User, validate } = require("../../models/Users.js");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../services/email.service.js");

router.post("/", async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  try {
    const { error } = validate({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email,
      password: password,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // if (!body.role) body = { ...body, role: "user" };
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(409).send({ message: "User already registered" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));

    const hashPassword = await bcrypt.hash(password, salt);
    const otp = Math.floor(Math.random() * 9000 + 1000);
    await sendEmail(email, otp);

    await new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email,
      password: hashPassword,
      role: "user",
    }).save();
    res.status(201).send({ OTP: otp, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error." });
  }
});

module.exports = router;
