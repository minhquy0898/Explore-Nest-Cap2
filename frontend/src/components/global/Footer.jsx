import React from "react";
import { FaPhoneVolume } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import imgFooter1 from '../../assets/img-footer-1.png'
import imgFooter2 from '../../assets/img-footer-2.png'
import imgFoote3 from '../../assets/img-footer-3.png'
import imgFooter4 from '../../assets/img-footer-4.png'
import { FaFacebookF } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { styles } from "../../styles/styles";
import { IoIosSend } from "react-icons/io";
import { CiMail, CiLocationOn, CiGlobe } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    // <div
    //   className={`pt4 md:pt-16 mt-16 md:mt-0 pb-6 bg-[#F5F5F5] ${styles.horizontalPadding} flex flex-col shadow-2xl gap-y-6 relative `}
    // >
    //   <div className="w-full bg-[#F5F5F5] h-full  py-12 rounded-xl flex flex-col gap-y-8 px-4 md:px-8 lg:px-16">
    //     <div className="w-full grid grid-cols-1 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 gap-y-10 md:gap-y-0">
    //       <div className="col-span-7 px-1 md:px-3 flex flex-col items-start gap-y-3 md:gap-y-4">
    //         <h6 className={`text-xl ${styles.blueText} font-medium `}>
    //           Thông tin liên hệ
    //         </h6>
    //         <p className={`${styles.blueText} text-sm flex items-center`}>
    //           <CiMail className=" text-[20px] mr-1" /> Email:
    //           minhquy0898240032@gmail.com
    //         </p>
    //         <p className={`${styles.blueText} text-sm flex items-center`}>
    //           <FiPhone className=" text-[20px] mr-1" /> Số điện thoại:
    //           0898240032
    //         </p>
    //         <p className={`${styles.blueText} text-sm flex items-center`}>
    //           <CiLocationOn className=" text-[20px] mr-1" /> Địa chỉ: 254 Đ
    //           Nguyễn Văn Linh, Thạc Gián, Thanh Khê, Đà Nẵng, Việt Nam
    //         </p>
    //         <p className={`${styles.blueText} text-sm flex items-center`}>
    //           <CiGlobe className=" text-[20px] mr-1" /> Website:
    //           <Link to="https://www.touz.com"> https://www.touz.com</Link>
    //         </p>
    //       </div>
    //       <div className="col-span-3 px-1 md:px-3 flex flex-col items-start gap-y-3 md:gap-y-4">
    //         <h6 className={`text-xl ${styles.blueText} font-medium`}>
    //           Tin mới nhất
    //         </h6>
    //         <p className={`text-sm ${styles.blueText}`}>
    //           Đăng ký nhận bản tin miễn phí và luôn cập nhật
    //         </p>
    //         <div className="w-full h-[48px] flex items-center">
    //           <input
    //             type="email"
    //             className={`w-11/12 h-full rounded-l-xl outline-none text-sm ${styles.blueText} px-3`}
    //             placeholder="Nhập email của bạn"
    //           />
    //           <button className="bg-white h-full pr-3 rounded-r-xl text-sm">
    //             <IoIosSend className="text-[24px]" />
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className=" bg-black">
      <div className="flex justify-around">
        {/* Liên hệ với chúng tôi */}
        <div>
          <p className="mb-6 text-white mt-6">Liên hệ với chúng tôi <span className="text-gray-400">( Hỗ trợ  24/7 )</span></p>
          <div className="flex">
            <FaPhoneVolume fill="#fff" className="text-2xl mr-3 mb-3" /> <span className="text-white"> Đặt tour du lịch : <span className="text-yellow-300">1900 6789</span></span>
          </div>
          <div className="flex">
            <FaPhoneVolume fill="#fff" className="text-2xl mr-3 mb-3" /> <span className="text-white"> Tư vấn xin Visa : <span className="text-yellow-300">1900 1234</span></span>
          </div>
          <div className="flex">
            <FaPhoneVolume fill="#fff" className="text-2xl mr-3 mb-3" /> <span className="text-white"> Tư vấn chăm sóc khách hàng : <span className="text-yellow-300">1900 4567</span></span>
          </div>
          <div className="flex">
            <FaPhoneVolume fill="#fff" className="text-2xl mr-3 mb-3" /> <span className="text-white"> Đặt tour du lịch : <span className="text-yellow-300">1900 6789</span></span>
          </div>
        </div>
        {/* Về chúng tôi */}
        <div className="mt-6 ">
          <p className="text-white mb-6">Về chúng tôi</p>
          <p className="text-white mb-3">Giới thiệu</p>
          <p className="text-white mb-3">Liên hệ</p>
          <p className="text-white mb-3">Truyền thông</p>
          <p className="text-white mb-3">Các đơn vị hợp tác</p>
          <p className="text-white mb-3">Chính sách bảo mật</p>
          <p className="text-white mb-3">Điều khoản sử dụng</p>
        </div>
        {/* Sản phẩm */}
        <div className="mt-6">
          <p className="text-white mb-6 ">Sản phẩm</p>
          <p className="text-white mb-3">Tour Du lịch</p>
          <p className="text-white mb-3">Visa</p>
        </div>
        {/* Khác */}
        <div className="mt-6 ">
          <p className="text-white mb-6">Tuyển dụng</p>
          <p className="text-white mb-3">Xem lại đơn hàng</p>
          <p className="text-white mb-3">Hướng dẫn thanh toán</p>
          <p className="text-white mb-3">Chăm sóc khách hàng</p>
          <p className="text-white mb-3">Đăng ký nhận bảng tin</p>
          <p className="text-white mb-3">Đăng ký đối tác</p>
        </div>
      </div>
      {/* Explore Nest */}
      <div className="flex mt-9 ">
        <div className="text-orange-500 text-5xl w-[70%] ml-24 flex items-center">Explore Nest</div>
        <div className="flex flex-wrap">
          <div className="flex justify-center items-center mb-4">
            <CiLocationOn className="items-center text-2xl mr-3" fill="#fff" />
            <span className="text-white flex items-center mr-6">Hồ Chí Minh</span>
            <span className="text-white flex justify-center items-center"><FaCircle fill="#fff" className="text-8px mr-2" /> <span className="text-white"> 54 Phạm Hồng Thái, Bến Thành, Quận 1, Tp. Hồ Chí Minh</span></span>
          </div>
          <div className="flex justify-center items-center mb-4">
            <CiLocationOn className="items-center text-2xl mr-3" fill="#fff" />
            <span className="text-white flex items-center mr-12">Đà Nẵng</span>
            <span className="text-white flex justify-center items-center"><FaCircle fill="#fff" className="text-8px mr-2 ml-[2px]" /> <span className="text-white"> 12 Phạm Phú Thứ, Hải Châu 1, Quận Hải Châu, TP. Đà Nẵng</span></span>
          </div>
          <div className="flex justify-center items-center">
            <CiLocationOn className="items-center text-2xl mr-3" fill="#fff" />
            <span className="text-white flex items-center mr-16">Hà Nội</span>
            <span className="text-white flex justify-center items-center"><FaCircle fill="#fff" className="text-8px mr-2" /> <span className="text-white"> 530 Phan Chu Trinh, Quận Hoàn Kiếm, TP. Hà Nội  </span></span>
          </div>
        </div>
      </div>
      {/* Social mạng xã hội tải app */}
      <div className="flex mt-10 mb-10">
        <div className="text-white text-xl w-[30%] ml-[100px]">
          Tải app Explore Nest
        </div>
        <div className="flex ml-20">
          <img src={imgFooter1} alt="" />
          <img src={imgFooter2} alt="" />
        </div>
        <div className="flex ml-80 ">
          <FaFacebookF fill="#fff" className="text-2xl mr-4" />
          <IoLogoYoutube fill="#fff" className="text-2xl mr-4" />
          <FaInstagram fill="#fff" className="text-2xl" />
        </div>
      </div>
      <div className="bg-customBlue p-3">
        <div className="text-center text-12px text-white">
          © 2024 ExploreNest. All rights reserved - Công Ty Cổ Phần Việt Nam Booking Tour - Mã số thuế: 0308042348
        </div>
        <div>
          <p className="text-center text-12px text-white mt-2">
            Người phụ trách nội dung: Dương Minh Quý - Trưởng Ban Biên Tập - Email: minhquy0898240032@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
