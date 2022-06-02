const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

// Create a strong password
const passwordValidatorSchema = new passwordValidator();

passwordValidatorSchema
  .is()
  .min(5) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123", "Azerty123", "123Azerty"]); // Blacklist these values


// Email and Password validator
exports.validator = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (
    !emailValidator.validate(email) ||
    !passwordValidatorSchema.validate(password)
  ) {
    return res.status(400).json({ message: "Invalid Email or Password" });
  } else {
    next();
  }
};
