import db from '~/models'
import emailService from '~/services/mailService'
import tourService from '~/services/tourService'
import ApiError from '~/utils/ApiError'
import { formatCurrencyVND, formatDate } from '~/utils/formatDate'
import { provinces } from '~/utils/provinces'

const getTour = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 1000,
      search = ''
    } = req.query

    if (search) {
      // validate search theo định dạng YYYY-MM-DD
      const date = new Date(search)
      if (date.toString() === 'Invalid Date') {
        return next(new ApiError(404, 'Định dạng ngày không hợp lệ'))
      }
    }

    let tours = []

    if (req.user.role === 'admin') {
      tours = await tourService.getTour(req.query)
    }

    else if (req.user.role === 'manager') {
      req.query.filters = {}
      req.query.filters.id_manager = req.user.id_manager
      tours = await tourService.getTour(req.query)
    }

    else if (req.user.role === 'staff') {
      req.query.filters = {}
      req.query.filters.id_staff = req.user.id_staff
      tours = await tourService.getTour(req.query)
    }


    // Trả về kết quả
    return res.status(200).json({
      statusCode: 200,
      page: parseInt(page),
      data: tours.rows,
      limit: parseInt(limit) == 1000 ? null : parseInt(limit),
      total: tours.count
    })
  } catch (error) {
    return next(new ApiError(404, error.message))
  }
}

const getTourDetail = async (req, res, next) => {
  try {
    const id = req.params.id
    const tour = await tourService.getTourDetail(id)
    return res.status(200).json({
      statusCode: 200,
      data: tour
    })
  } catch (error) {
    return next(new ApiError(404, error.message))
  }
}

const createTour = async (req, res, next) => {
  try {
    const newTour = await tourService.createTour(req.body)
    const users = await db.User.findAll()

    const mailList = users.map((user) => {
      return user.email
    })

    const destination = provinces.find((p) => p.slug === newTour.destination)

    const tour = await db.Tour.findOne({
      where: { id: newTour.id },
      include: [
        {
          model: db.Staff,
          as: 'staffData',
          include: [
            {
              model: db.Account,
              as: 'accountData',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            }
          ]
        },
        {
          model: db.Manager,
          as: 'managerData',
          include: [
            {
              model: db.Account,
              as: 'accountData',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            }
          ]
        }
      ]
    })
    // console.log("====================")
    console.log(tour)
    // console.log("====================")
    console.log(newTour.photos)

    // const html = `
    // <div style="background-color: #eaeaea; margin-top: 0px;">
    //   <div>
    //     <img src=${newTour.photos.split(',')[0]} alt="">
    //     <p> Tên tour: ${newTour.tour_name}</p>
    //     <p> Giá: ${formatCurrencyVND(newTour.initial_price - (newTour.initial_price * newTour.promotional))}</p>
    //     <p> Điểm đi: ${destination.name}</p>
    //     <p>  Bắt đầu ngày ${formatDate(tour.departure_day)}</p>
    //     <p> Ngày về: ${formatDate(tour.end_tour_day)}</p>
    //     <p>Công ty: ${tour.managerData?.company_name}</p>
    //     <a href="http://localhost:5173/tours/${newTour.tour_name.replace(/[^\w\s]/gi, '').toLowerCase().replace(/\s+/g, '-')}?id=${newTour.id}">button</a>
    //   </div>
    // </div>
    // `


    const htmll = `
    <table style="display : block; width: 100%; font-family:NetflixSans-Regular,Helvetica,Roboto,Segoe UI,sans-serif;" border="0">
    <tbody>
        <tr>
            <td align="center" style="background-color:#eaeaea;margin-top:0">
                <table align="center" style="background-color:#ffffff;width:500px">
                    <tbody>
                        <!-- TR 1 b -->
                        <tr></tr>
                        <!-- tr 2 -->
                        <tr>
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style="padding-left:20px;padding-right:20px;padding-top:20px">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <!-- td 1 -->
                                                            <td>
                                                                <a href="">
                                                                    <table>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>
                                                                                    <img src="https://res.cloudinary.com/dlpyr7oaa/image/upload/fl_preserve_transparency/v1716711409/pngegg_1_aojhwa.jpg?_s=public-apps"
                                                                                        alt="">
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="color: orange;
                                                                            font-weight: 800;">Bạn có một tour mới
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table align="center" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center"
                                                style="padding-left:20px;padding-right:20px;padding-top:20px">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <!-- table 1 -->
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding-top: 0px;"
                                                                                align="center">
                                                                                <a style="color: inherit;" href="">
                                                                                    <!-- ảnh tour -->
                                                                                    <img style="
                                                                                    border:none;
                                                                                    outline:none;
                                                                                    border-collapse:collapse;
                                                                                    display:block;
                                                                                    border-style:none;
                                                                                    border-radius:8px 8px 0px 0px";
                                                                                    margin-bottom: -3px;
                                                                                        width="460" border="0"
                                                                                        src="${newTour.photos.split(',')[0]}"
                                                                                        alt="">
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <!-- table 2 -->
                                                                <table align="center" width="100%" bgcolor="#000"
                                                                    style="border-radius:0px 0px 8px 8px ;     width: 99%; margin-top : -3px ;">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style="padding-left:20px;padding-right:20px;padding-bottom:20px;padding-top:20px">
                                                                                <!-- table 1 -->
                                                                                <table width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="left" style="
                                                                                                font-family:NetflixSans-Bold,Helvetica,Roboto,Segoe UI,sans-serif;
                                                                                                font-weight:700;
                                                                                                font-size:18px;
                                                                                                color:#ffffff;
                                                                                                padding-top:0">
                                                                                                ${newTour.tour_name}</td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <!-- table 2 -->
                                                                                <table width="100%"
                                                                                    style="color: #fff;">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style="
                                                                                            font-family:NetflixSans-Bold,Helvetica,Roboto,Segoe UI,sans-serif;
                                                                                            font-size:14px;
                                                                                            color:#ffffff;
                                                                                            padding-top:0">Điểm đi: <span style="color : #FFFF00 ; font-style: italic;">${destination.name}</span>
                                                                                            </td>
                                                                                            <td style="
                                                                                            font-family:NetflixSans-Bold,Helvetica,Roboto,Segoe UI,sans-serif;
                                                                                            font-size:14px;
                                                                                            color:#ffffff;
                                                                                            padding-top:0">Công ty: <span style="color : #FFFF00 ; font-style: italic;">${tour.managerData?.company_name}</span>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td style="
                                                                                            font-family:NetflixSans-Bold,Helvetica,Roboto,Segoe UI,sans-serif;
                                                                                            font-size:14px;
                                                                                            color:#ffffff;
                                                                                            padding-top:0">Ngày bắt
                                                                                                đầu: ${formatDate(tour.departure_day)}</td>
                                                                                            <td style="
                                                                                            font-family:NetflixSans-Bold,Helvetica,Roboto,Segoe UI,sans-serif;
                                                                                            font-size:14px;
                                                                                            color:#ffffff;
                                                                                            padding-top:0">Ngày kết
                                                                                                thúc: ${formatDate(tour.end_tour_day)}</td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <!-- table 3 -->
                                                                                <table align="center" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center"
                                                                                                style="padding-top: 20px;">
                                                                                                <table
                                                                                                    style="background-color:#e50914;border-radius:4px;width:100%"
                                                                                                    width="100%"
                                                                                                    bgcolor="#e50914">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td align="center"
                                                                                                                style="font-family:NetflixSans-Bold,Helvetica,Roboto,Segoe UI,sans-serif;font-weight:700;font-size:14px;line-height:17px;letter-spacing:-0.2px;padding-top:20px;padding:14px 40px;color:#ffffff">
                                                                                                                <a style="font-family:NetflixSans-Bold,Helvetica,Roboto,Segoe UI,sans-serif;font-weight:700;font-size:14px;line-height:17px;letter-spacing:-0.2px;text-align:center;text-decoration:none;display:block;color:#ffffff"
                                                                                                                    href="http://localhost:5173/tours/${newTour.tour_name.replace(/[^\w\s]/gi, '').toLowerCase().replace(/\s+/g, '-')}?id=${newTour.id}">Bấm
                                                                                                                    vào
                                                                                                                    đây
                                                                                                                    để
                                                                                                                    xem
                                                                                                                    chi
                                                                                                                    tiết</a>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <!-- tr 3 -->
                        <tr>
                            <td align="center" style="background-color: #fff;">
                                <table width="100%" border="0">
                                    <tbody>
                                        <tr>
                                            <td align="center" valign="top"
                                                style="padding-left:20px;padding-right:20px;background-color:#ffffff">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <!-- td 1 -->
                                                            <td style="padding:0 20px 0 0" valign="top">
                                                                <table width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="center"
                                                                                style="padding-top:0">
                                                                                <img width="50" border="0"
                                                                                    style="border:none;outline:none;border-collapse:collapse;display:block"
                                                                                    src="https://res.cloudinary.com/dlpyr7oaa/image/upload/fl_preserve_transparency/v1716711409/pngegg_1_aojhwa.jpg?_s=public-apps"
                                                                                    alt="">
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                            <!-- td 2 -->
                                                            <td valign="top">
                                                                <table width="100%" valign="top">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <!-- table 1 -->
                                                                                <table align="left" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="left"
                                                                                                style="font-family:NetflixSans-Regular,Helvetica,Roboto,Segoe UI,sans-serif;font-weight:400;font-size:14px;line-height:18px;letter-spacing:-0.25px;color:#a4a4a4;padding-top:0">
                                                                                                <span>
                                                                                                    Bạn có câu hỏi
                                                                                                    ?Hãy truy cập
                                                                                                    trung tâm
                                                                                                    <a style="text-decoration:underline;color:#a4a4a4"
                                                                                                        href="http://localhost:5173/contact"><span
                                                                                                            style="color: orange;">liên
                                                                                                            hệ</span></a>
                                                                                                </span>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <!-- table 2 -->
                                                                                <table align="left" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="left"
                                                                                                style="font-family:NetflixSans-Regular,Helvetica,Roboto,Segoe UI,sans-serif;font-weight:400;font-size:11px;line-height:14px;letter-spacing:-0.1px;color:#a4a4a4;padding-top:0">
                                                                                                <span
                                                                                                    style="text-decoration:none">
                                                                                                    <a style="color:#a4a4a4;text-decoration:none"
                                                                                                        href="">
                                                                                                        <span
                                                                                                            style="color: orange;">Explore
                                                                                                            Nest</span>
                                                                                                    </a>
                                                                                                </span>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <!-- table 3 -->
                                                                                <table align="left" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="left"
                                                                                                style="font-family:NetflixSans-Regular,Helvetica,Roboto,Segoe UI,sans-serif;font-weight:400;font-size:12px;line-height:15px;letter-spacing:-0.12px;padding-top:20px;color:#a9a6a6">
                                                                                                <span>
                                                                                                    <a style="text-decoration:underline;line-height:20px;color:#a4a4a4"
                                                                                                        href="http://localhost:5173/">
                                                                                                        Trang chủ
                                                                                                    </a>
                                                                                                </span>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <!-- talbe 4 -->
                                                                                <table align="left" width="100%">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="left"
                                                                                                style="font-family:NetflixSans-Regular,Helvetica,Roboto,Segoe UI,sans-serif;font-weight:400;font-size:11px;line-height:14px;letter-spacing:-0.1px;padding-top:20px;color:#a4a4a4">
                                                                                                <span>Thông báo này
                                                                                                    được gửi đến từ
                                                                                                    <span
                                                                                                        style="color: orange;">Explore
                                                                                                        Nest</span>
                                                                                                    <span>vì bạn đã
                                                                                                        từng là
                                                                                                        khách hàng
                                                                                                        của <span
                                                                                                            style="color: orange;">Explore
                                                                                                            Nest.</span></span>
                                                                                                </span>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
    `



    try {
      await emailService.spamMail(htmll, mailList)
    } catch (error) {
      // return account_info
    }
    return res.status(200).json({
      statusCode: 200,
      message: 'Thêm tour thành công',
      data: newTour
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Thêm tour thất bại ${error.message}`
    })
  }
}

const updateTour = async (req, res, next) => {
  try {
    const id = req.params.id
    // check id_tour in table book


    const { ...updateData } = req.body
    updateData.id = id
    const updatedTour = await tourService.updateTour(updateData)
    return res.status(200).json({
      statusCode: 200,
      message: 'Cập nhật tour thành công',
      data: updatedTour
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Cập nhật tour thất bại ${error.message}`
    })
  }
}

const deleteTour = async (req, res, next) => {
  try {
    const id = req.params.id
    const book = await db.Book.findOne({
      where: {
        id_tour: id
      }
    })

    if (book) {
      return res.status(402).json({
        statusCode: 402,
        message: 'Không thể xóa tour đã có người đặt tour'
      })
    }
    const deletedTour = await tourService.deleteTour(id)
    return res.status(200).json({
      statusCode: 200,
      message: 'Xóa tour thành công',
      data: deletedTour
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Xóa tour thất bại ${error.message}`
    })
  }
}

const tourController = {
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTourDetail
}

export default tourController
