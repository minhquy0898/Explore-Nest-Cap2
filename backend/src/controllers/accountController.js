import accountService from '~/services/accountService'
import db from '~/models'
import env from '~/config/environment'
import bcrypt from 'bcryptjs'
import ApiError from '~/utils/ApiError'
import jwt from 'jsonwebtoken'
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth ,startOfYear, endOfYear} from 'date-fns';
import { Op } from 'sequelize';
const getAccount = async (req, res, next) => {
  try {
    const role = req.user.role
    let data = []
    if (role == 'admin') {
      data = await accountService.getAccount(req.query, 'admin')
    }

    if (role == 'manager') {
      data = await accountService.getAccount(req.query, 'manager', req.user.id_manager)
    }

    res.status(200).json({
      statusCode: 200,
      data: data.accounts,
      total: data.total,
      limit: data.limit,
      page: data.page
    })
  } catch (error) {
    res.status(404).json({
      statusCode: 404,
      message: error.message || 'Lỗi không xác định'
    })
  }
}

const createAccount = async (req, res, next) => {
  try {
    const account = await accountService.createAccount(req.body, req.user)
    res.status(200).json({
      statusCode: 200,
      data: account
    })
  } catch (error) {
    res.status(404).json({
      statusCode: 404,
      message: 'Email đã tồn tại trong hệ thống'
    })
  }
}

const createStaff = async (req, res, next) => {
  try {
    const staff = await accountService.createStaff(req.body)
    res.status(200).json({
      statusCode: 200,
      data: staff
    })
  } catch (error) {
    res.status(404).json({
      statusCode: 404,
      message: 'Email đã tồn tại trong hệ thống'
    })
  }
}

const createManager = async (req, res, next) => {
  try {
    const manager = await accountService.createManager(req.body)
    res.status(200).json({
      statusCode: 200,
      data: manager
    })
  } catch (error) {
    res.status(404).json({
      statusCode: 404,
      message: 'Email đã tồn tại trong hệ thống'
    })
  }
}

const updateAccount = async (req, res, next) => {
  try {
    const { avatar, username, phoneNumber, companyName, address, current_password, new_password } = req.body
    const role = req.user.role
    if (role === 'admin') {
      if (current_password && new_password) {
        const accountAdmin = await db.Account.findOne({
          where: {
            id: req.user.id
          }
        })

        if (!accountAdmin) {
          return next(new ApiError(403, 'Unauthorized'))
        }

        const match = await bcrypt.compare(current_password, accountAdmin.dataValues.password)

        if (!match) {
          return next(new ApiError(403, 'Mật khẩu cũ không đúng'))
        }

        const hashPassword = await bcrypt.hash(new_password, 10)

        await db.Account.update({ password: hashPassword }, {
          where: {
            id: req.user.id
          }
        })
      }

      if (phoneNumber || avatar || username) {
        const dataUpdate = {}
        if (phoneNumber) dataUpdate.phoneNumber = phoneNumber
        if (avatar) dataUpdate.avatar = avatar
        if (username) dataUpdate.username = username

        await db.Account.update(dataUpdate, {
          where: {
            id: req.user.id
          }
        })
      }
    }

    if (role === 'staff') {
      const id_staff = req.user.id_staff
      if (current_password && new_password) {
        const user = await db.Account.findOne({
          where: {
            id: req.user.id
          }
        })

        if (!user) {
          return next(new ApiError(403, 'Unauthorized'))
        }

        const match = await bcrypt.compare(current_password, user.dataValues.password)

        if (!match) {
          return next(new ApiError(403, 'Mật khẩu cũ không đúng'))
        }

        const hashPassword = await bcrypt.hash(new_password, 10)

        await db.Account.update({ password: hashPassword }, {
          where: {
            id: req.user.id
          }
        })
      }
      if (phoneNumber || avatar || username) {
        const dataUpdate = {}
        if (phoneNumber) dataUpdate.phoneNumber = phoneNumber
        if (avatar) dataUpdate.avatar = avatar
        if (username) dataUpdate.username = username

        await db.Account.update(dataUpdate, {
          where: {
            id: req.user.id
          }
        })
      }
      if (address) {
        await db.Staff.update({ address: address }, {
          where: {
            id: id_staff
          }
        })
      }
    }

    if (role === 'manager') {
      const id_manager = req.user.id_manager
      if (current_password && new_password) {
        const user = await db.Account.findOne({
          where: {
            id: req.user.id
          }
        })

        if (!user) {
          return next(new ApiError(403, 'Unauthorized'))
        }

        const match = await bcrypt.compare(current_password, user.dataValues.password)

        if (!match) {
          return next(new ApiError(403, 'Mật khẩu cũ không đúng'))
        }

        const hashPassword = await bcrypt.hash(new_password, 10)

        await db.Account.update({ password: hashPassword }, {
          where: {
            id: req.user.id
          }
        })
      }
      if (phoneNumber || avatar || username) {
        const dataUpdate = {}
        if (phoneNumber) dataUpdate.phoneNumber = phoneNumber
        if (avatar) dataUpdate.avatar = avatar
        if (username) dataUpdate.username = username

        await db.Account.update(dataUpdate, {
          where: {
            id: req.user.id
          }
        })
      }
      if (companyName) {
        await db.Manager.update({ company_name: companyName }, {
          where: {
            id: id_manager
          }
        })
      }
    }

    const user = await db.Account.findOne({
      where: { id: req.user.id },
      include: [
        {
          model: db.Staff,
          as: 'staffData',
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: db.Manager,
          as: 'managerData',
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ],
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    })

    const token = jwt.sign({
      id: user.dataValues.id,
      email: user.dataValues.email,
      username: user.dataValues.username,
      phoneNumber: user.dataValues.phone_number,
      avatar: user.dataValues.avatar,
      role: user.dataValues.role,
      id_staff: user.dataValues.staffData?.id,
      id_manager: user.dataValues.managerData?.id
    }, env.JWT_SECRETKEY)

    return res.status(200).json({
      statusCode: 200,
      token: token,
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        phoneNumber: user.phone_number,
        avatar: user.dataValues.avatar,
        role: user.dataValues.role,
        id_staff: user.dataValues.staffData?.id,
        id_manager: user.dataValues.managerData?.id,
        address: user.dataValues.staffData?.address,
        company_name: user.dataValues.managerData?.company_name
      }
    })


  } catch (error) {
    console.log(error)
    return res.status(404).json({
      statusCode: 404,
      message: 'cập nhật thất bại'
    })
  }
}

const getAccountInfo = async (req, res, next) => {
  try {
    let data = {}
    if (req.user.role === 'admin') {
      data = await accountService.getAccountInfo(req.user.id, 'admin')
    }

    if (req.user.role === 'manager') {
      data = await accountService.getAccountInfo(req.user.id, 'manager')
    }

    if (req.user.role === 'staff') {
      data = await accountService.getAccountInfo(req.user.id, 'staff')
    }

    res.status(200).json({
      statusCode: 200,
      data: data
    })
  } catch (error) {
    res.status(404).json({
      statusCode: 404,
      message: error.message || 'Lỗi không xác định'
    })
  }
}

const getAnalytics = async (req, res, next) => {
  try {
    const now = new Date();

    // Tính toán thời gian bắt đầu và kết thúc của tuần và tháng hiện tại
    const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 });  // tuần bắt đầu từ thứ 2
    const endOfCurrentWeek = endOfWeek(now, { weekStartsOn: 1 });
    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);

    const startOfCurrentYear = startOfYear(now);
    const endOfCurrentYear = endOfYear(now);

    const analytics = {
      week: {
        totalTourPost: '',
        totalBooking: '',
        totalManager: '',
        totalStaff: '',
        revenue: ''
      },
      month: {
        totalTourPost: '',
        totalBooking: '',
        totalManager: '',
        totalStaff: '',
        revenue: ''
      },
      year: {
        totalTourPost: '',
        totalBooking: '',
        totalManager: '',
        totalStaff: '',
        revenue: ''
      },
      totalUser: '',

    };

    // Truy vấn dữ liệu trong tuần này
    const totalTourPostWeek = await db.Tour.count({
      where: {
        createdAt: {
          [Op.gte]: startOfCurrentWeek,
          [Op.lte]: endOfCurrentWeek
        }
      }
    });

    const totalBookingWeek = await db.Book.count({
      where: {
        status: 'success',
        isCheckout: true,
        createdAt: {
          [Op.gte]: startOfCurrentWeek,
          [Op.lte]: endOfCurrentWeek
        }
      }
    });

    const totalUser = await await db.User.count()

    const totalManagerWeek = await db.Manager.count({
      where: {
        createdAt: {
          [Op.gte]: startOfCurrentWeek,
          [Op.lte]: endOfCurrentWeek
        }
      }
    });

    const totalStaffWeek = await db.Staff.count({
      where: {
        createdAt: {
          [Op.gte]: startOfCurrentWeek,
          [Op.lte]: endOfCurrentWeek
        }
      }
    });

    const revenueWeek = await db.Book.sum('total_price', {
      where: {
        status: 'success',
        isCheckout: true,
        createdAt: {
          [Op.gte]: startOfCurrentWeek,
          [Op.lte]: endOfCurrentWeek
        }
      }
    });

    analytics.week.totalTourPost = totalTourPostWeek;
    analytics.week.totalBooking = totalBookingWeek;
    analytics.week.totalManager = totalManagerWeek;
    analytics.week.totalStaff = totalStaffWeek;
    analytics.week.revenue = revenueWeek;

    // Truy vấn dữ liệu trong tháng này
    const totalTourPostMonth = await db.Tour.count({
      where: {
        createdAt: {
          [Op.gte]: startOfCurrentMonth,
          [Op.lte]: endOfCurrentMonth
        }
      }
    });

    const totalBookingMonth = await db.Book.count({
      where: {
        status: 'success',
        isCheckout: true,
        createdAt: {
          [Op.gte]: startOfCurrentMonth,
          [Op.lte]: endOfCurrentMonth
        }
      }
    });

 

    const totalManagerMonth = await db.Manager.count({
      where: {
        createdAt: {
          [Op.gte]: startOfCurrentMonth,
          [Op.lte]: endOfCurrentMonth
        }
      }
    });

    const totalStaffMonth = await db.Staff.count({
      where: {
        createdAt: {
          [Op.gte]: startOfCurrentMonth,
          [Op.lte]: endOfCurrentMonth
        }
      }
    });

    const revenueMonth = await db.Book.sum('total_price', {
      where: {
        status: 'success',
        isCheckout: true,
        createdAt: {
          [Op.gte]: startOfCurrentMonth,
          [Op.lte]: endOfCurrentMonth
        }
      }
    });

    analytics.month.totalTourPost = totalTourPostMonth;
    analytics.month.totalBooking = totalBookingMonth;
    analytics.month.totalManager = totalManagerMonth;
    analytics.month.totalStaff = totalStaffMonth;
    analytics.month.revenue = revenueMonth;

     // Truy vấn dữ liệu trong năm  này
     const totalTourPostYear = await db.Tour.count({
      where: {
        createdAt: {
          [Op.gte]: startOfCurrentYear,
          [Op.lte]: endOfCurrentYear
        }
      }
    });

    const totalBookingYear = await db.Book.count({
      where: {
        status: 'success',
        isCheckout: true,
        createdAt: {
          [Op.gte]: startOfCurrentYear,
          [Op.lte]: endOfCurrentYear
        }
      }
    });


    const totalManagerYear = await db.Manager.count({
      where: {
        createdAt: {
          [Op.gte]: startOfCurrentYear,
          [Op.lte]: endOfCurrentYear
        }
      }
    });

    const totalStaffYear = await db.Staff.count({
      where: {
        createdAt: {
          [Op.gte]: startOfCurrentYear,
          [Op.lte]: endOfCurrentYear
        }
      }
    });

    const revenueYear = await db.Book.sum('total_price', {
      where: {
        status: 'success',
        isCheckout: true,
        createdAt: {
          [Op.gte]: startOfCurrentYear,
          [Op.lte]: endOfCurrentYear
        }
      }
    });

    analytics.year.totalTourPost = totalTourPostYear;
    analytics.year.totalBooking = totalBookingYear;
    analytics.year.totalManager = totalManagerYear;
    analytics.year.totalStaff = totalStaffYear;
    analytics.year.revenue = revenueYear;

    analytics.totalUser=totalUser

    res.status(200).json({
      statusCode: 200,
      data: analytics
    });
  } catch (error) {
    res.status(404).json({
      statusCode: 404,
      message: error.message || 'Lỗi không xác định'
    });
  }
}


const accountController = {
  getAccount,
  createAccount,
  createStaff,
  createManager,
  updateAccount,
  getAccountInfo,
  getAnalytics

}

export default accountController
