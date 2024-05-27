import express from 'express'
import tokenValidation from '~/middlewares/jwtMiddleware'
import checkRule from '~/middlewares/checkRule'
import jwt from 'jsonwebtoken'
import db from '~/models'
import env from '~/config/environment'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcryptjs'
import authValidation from '~/validations/loginValidation'
import randomCatAvatar from '~/utils/randomCatAvatar'
import apifeature from '~/helpers/apifeature'
import generateStrongPassword from '~/utils/generateStrongPassword'
import emailService from '~/services/mailService'

const router = express.Router()

const loginFuc = async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(new ApiError(404, 'Email hoặc mật khẩu trống.'))
  }

  try {
    // Tìm người dùng dựa trên email
    const user = await db.User.findOne({ where: { email } })


    // Nếu không tìm thấy người dùng
    if (!user) {
      return next(new ApiError(403, 'Email hoặc mật khẩu không đúng!'))
    }

    const match = await bcrypt.compare(password, user.dataValues.password)

    if (!match) {
      return next(new ApiError(403, 'Email hoặc mật khẩu không đúng!'))
    }

    const token = jwt.sign({
      id: user.dataValues.id,
      email: user.dataValues.email,
      fullName: user.dataValues.fullName,
      avatar: user.dataValues.avatar,
      role: 'customer'
    }, env.JWT_SECRETKEY)

    return res.status(200).json({
      statusCode: 200,
      token: token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
        role: 'customer'
      }
    })
  } catch (error) {
    console.error(error)
    return next(new ApiError(403, 'Có lỗi xảy ra, hãy thử lại!'))
  }
}

const signInFuc = async (req, res, next) => {
  const { email, fullName, password, avatar = randomCatAvatar() } = req.body


  if (!email || !password || !fullName) {
    return next(new ApiError(404, 'Vui lòng điền đầy đủ thông tin.'))
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await apifeature(db.User, 'create', {
      email,
      password: hashedPassword,
      fullName,
      avatar
    })

    const userNew = await db.User.findOne({
      where: {
        email
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
    })

    const token = jwt.sign(
      {
        id: user.dataValues.id,
        email: user.dataValues.email,
        fullName: user.dataValues.fullName,
        avatar: user.dataValues.avatar,
        role: 'customer'
      },
      env.JWT_SECRETKEY
    )

    return res.status(200).json({
      statusCode: 200,
      token: token,
      user: userNew
    })
  } catch (error) {
    console.error(error)
    return next(new ApiError(403, 'Tài khoản đã tồn tại trong hệ thống.'))
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { fullName, avatar, current_password, new_password } = req.body
    if (current_password && new_password) {
      const user = await db.User.findOne({
        where: {
          id: req.user.id
        }
      })

      if (!user) {
        return next(new ApiError(403, 'Phiên đăng nhập hết hạn!'))
      }

      const match = await bcrypt.compare(current_password, user.dataValues.password)

      if (!match) {
        return next(new ApiError(403, 'Mật khẩu cũ không đúng'))
      }

      const hashPassword = await bcrypt.hash(new_password, 10)

      await db.User.update({ password: hashPassword }, {
        where: {
          id: req.user.id
        }
      })
    }

    // only update user's information
    if (fullName || avatar) {
      const dataInfoUpdate = {}
      if (fullName) dataInfoUpdate.fullName = fullName
      if (avatar) dataInfoUpdate.avatar = avatar

      await db.User.update(dataInfoUpdate, {
        where: {
          id: req.user.id
        }
      })
    }
    // only update user's password

    const userNew = await db.User.findOne({
      where: {
        id: req.user.id
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
    })

    const token = jwt.sign({
      id: userNew.dataValues.id,
      email: userNew.dataValues.email,
      fullName: userNew.dataValues.fullName,
      avatar: userNew.dataValues.avatar,
      role: 'customer'
    }, env.JWT_SECRETKEY)

    return res.status(200).json({
      statusCode: 200,
      message: 'Cập nhật thành công',
      token: token,
      data: userNew
    })

  } catch (error) {
    return next(new ApiError(403, 'Cập nhật thất bại!'))
  }
}

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const strongPassword = generateStrongPassword()
    const hashPassword = await bcrypt.hash(strongPassword, 10)

    await db.User.update({ password: hashPassword }, {
      where: {
        email: email
      }
    })

    const now = new Date()
    const dateTimeString = now.toLocaleString()
    ///send password
    const html = `
    <div 
    style=" 
    display: block; 
    text-align: center;
    "
    >
    <img style="width: 100px;" src="https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_1280.png"
        alt="">
    </div>
    <div>
      <h1 style="
      padding: 0px;
      margin: 0px;
      text-align: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      ">
      Thông báo đổi mật khẩu thành công !</h1>
    </div>
      <p style="color: gray; font-style: italic; padding: 0px; margin: 0px;text-align: center;">
      Vào lúc ${dateTimeString}
      </p>
      <p style="padding: 0px; margin: 0px;text-align: center;font-size: 19px;margin-top: 10px;color: #000;">
      Mật khẩu mới của bạn là :
      </p>
      <div style="background-color: orange; margin: 0 auto;padding: 10px;border-radius: 10px;margin-top: 10px; width: 130px;text-align: center;">
            <span style="font-weight: 500; color: #fff;font-size: 17px;">${strongPassword}</span>
        </div>
    `
    await emailService.sendMailForgotPassword(html, email)
    return res.status(200).json({
      statusCode: 200,
      message: 'Mật khẩu đã được gửi về gmail'
    })

  } catch (error) {
    console.log(error)
    return next(new ApiError(500, 'Co loi xay ra'))

  }
}

router.route('/signIn').post(signInFuc)
router.route('/login').post(authValidation.login, loginFuc)
router.route('/update').put(tokenValidation.authToken, checkRule(['customer']), updateUser)
router.route('/forgot-password').post(forgotPassword)


export const userRouterOnly = router