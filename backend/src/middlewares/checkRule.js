const checkRule = (permission) => {
  return (req, res, next) => {
    const role = req.user.role
    if (!role) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Bạn không có quyền truy cập'
      })
    }
    if (!permission.includes(role)) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Bạn không có quyền truy cập'
      })
    }
    next()
  }
}
// // const generateToken = (payload) => {
//   return jwt.sign(payload, env.JWT_SECRETKEY, { expiresIn: 60 })
// }

export default checkRule


