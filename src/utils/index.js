import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

export const generatePasswordHash = (password) => {
  return bcrypt.hashSync(password, salt);
}
