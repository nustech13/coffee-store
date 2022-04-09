import jwt from 'jsonwebtoken';

const configCommon = {
  generateAccessToken: (staff) => {
    return jwt.sign(
      {
        id: staff.id,
        is_admin: staff.is_admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1d" }
    );
  },
  generateRefreshToken: (staff) => {
    return jwt.sign(
      {
        id: staff.id,
        is_admin: staff.is_admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  }
}

export default configCommon;