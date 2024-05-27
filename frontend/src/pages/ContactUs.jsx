import React from "react";
import { BgIntro } from "../assets/export";
import { BgRetangle } from "../assets/export";
import { FaCheck } from "react-icons/fa";
import { Bg3Step } from "../assets/export";
import { BgLi1 } from "../assets/export";
import { BgLi2 } from "../assets/export";
import { BgLi3 } from "../assets/export";
import { BgLi4 } from "../assets/export";
import { BgBanner } from "../assets/export";
import './ContactUs.css'
const ContactUs = () => {
  return <div className="w-full mt-14">
    <div className="bg-white pt-12 pb-44 ">
      <div className="flex justify-center">
        <div className="pl-12 pt-24">
          <h1 className="text-6xl m-0 mb-7 text-customBlue box-text">
            <img src={BgRetangle} alt="" />
            Liên hệ với chúng tôi
          </h1>
          <h2 className="text-xl mb-7 text-customBlue ">
            Nâng tầm du lịch !
          </h2>
          <h3 className="text-xl flex "> <FaCheck className="mr-4 text-xl" /> Đăng kí nhanh và hoàn toàn miễn phí</h3>
          <h3 className="text-xl flex "> <FaCheck className="mr-4 text-xl" /> Tiếp cận được tệp khách hàng tiềm năng</h3>
          <h3 className="text-xl flex "> <FaCheck className="mr-4 text-xl" /> Hệ thống quản lý thông minh, tối ưu tốt</h3>
        </div>
        <div className="ml-20">
          <img src={BgIntro} alt="" />
        </div>
      </div>
    </div>
    {/* Đăng ký tour du lịch thật dễ dàng */}
    <div className="w-[1100px] ml-[13%] bg-white p-6 mt-4 rounded-md shadow-custom">
      <div className="flex">
        <div className="pr-10">
          <h3 className="text-customBlue text-lg leading-9">Đăng ký tour du lịch của bạn thật dễ dàng tại</h3>
          <h3 className="text-customBlue text-lg">Explore Nest</h3>
          <h4 className=" mt-5">Khu du lịch của bạn dù là trong nước, quốc tế,... hay bất kì đâu đều có thể được đăng ký.
          </h4>
          <h4>
            Đội ngũ marketing của chúng tôi sẽ giúp cho chỗ nghỉ của bạn được xuất hiện
          </h4>
          <h4>
            nhiều hơn trên các công cụ tìm kiếm như Google,
            nhờ đó cơ hội bán phòng cũng
          </h4>
          <h4>tăng lên.</h4>
          <div className=" flex items-center cursor-pointer mt-10 bg-[#EB662B] tex-sm font-normal text-white w-[130px] h-[40px] px-3 rounded-lg">
            Đăng ký ngay
          </div>
        </div>

      </div>
    </div>
    {/* 3 bước đơn giản nâng tầm doanh nghiệp */}
    <div className="flex justify-center mt-40 ml-[20px]">
      <div className="mr-4">
        <h2 className="text-5xl text-[#EB662B] mb-5">3 bước đơn giản</h2>
        <h3 className="text-customBlue text-2xl mb-10">Nâng tầm doanh nghiệp</h3>
        <ul>
          <li className="flex relative mb-20">
            <div>
              <span className="inline-block bg-orange-400 bg-opacity-72 w-[38px] h-[38px] rounded-full animate-customRipple text-white text-xl text-center leading-9">1</span>
            </div>
            <div className=" ml-9">
              <h4 className="m-0 text-customBlue text-base font-bold"> Điền form đăng ký</h4>
              <h5>Tour du lịch đều có thể đăng ký</h5>
            </div>
            <div className="absolute w-[2px] bg-orange-200 h-[40px] left-4 top-14 mt-2"></div>
          </li>
          <li className="flex relative mb-20">
            <div>
              <span className="inline-block bg-orange-400 bg-opacity-72 w-[38px] h-[38px] rounded-full animate-customRipple text-white text-xl text-center leading-9">2</span>
            </div>
            <div className=" ml-9">
              <h4 className="m-0 text-customBlue text-base font-bold">Liên hệ xác nhận và thiết lập tài khoản</h4>
              <h5>Chuyên viên của chúng tôi sẽ liên hệ để xác nhận và thiết lập tài khoản </h5>
            </div>
            <div className="absolute w-[2px] bg-orange-200 h-[40px] left-4 top-14 mt-2"></div>
          </li>
          <li className="flex relative mb-20">
            <div>
              <span className="inline-block bg-orange-400 bg-opacity-72 w-[38px] h-[38px] rounded-full animate-customRipple text-white text-xl text-center leading-9">3</span>
            </div>
            <div className=" ml-9">
              <h4 className="m-0 text-customBlue text-base font-bold">Hướng dẫn và bắt đầu sử dụng</h4>
              <h5>Đội ngũ kĩ thuật sẽ hướng dẫn và hỗ trợ trong suốt quá trình sử dụng</h5>
            </div>
            <div className="absolute w-[2px] bg-orange-200  h-[40px] left-4 top-14 mt-2"></div>
          </li>

        </ul>
      </div>
      <div className="pt-14 text-right ml-1">
        <img className="relative" src={Bg3Step} alt="" />
        <img className="absolute top-[1476px]" src={BgRetangle} alt="" />
      </div>
    </div>
    {/* Tại sao nên liên hệ , hợp tác với chúng tôi */}
    <div className="">
      <h3 className="text-customBlue text-4xl leading-10 m-0 mt-40 mb-12 ml-[152px]">Tại sao nên liên hệ với chúng tôi</h3>
      <ul className="flex justify-center">
        <li>
          <img className="relative h-[310px] w-[90%] inline-block mr-2 rounded-md" src={BgLi1} alt="" />
          <div className="text-white absolute top-[2457px] left-[190px]">
            <div className="text-3xl text-white">250.000+</div>
            <div className="text-xs text-white">Lượt người dùng truy cập hàng tháng</div>
          </div>
        </li>
        <li>
          <img className=" h-[310px] w-[90%] inline-block mr-2 rounded-md" src={BgLi2} alt="" />
          <div className="text-white absolute top-[2457px] left-[490px]">
            <div className="text-3xl text-white">200.000+</div>
            <div className="text-xs text-white">Booking hàng tháng</div>
          </div>
        </li>
        <li>
          <img className="relative h-[310px] w-[90%] inline-block mr-2 rounded-md" src={BgLi3} alt="" />
          <div className="text-white absolute top-[2457px] left-[790px]">
            <div className="text-3xl text-white">100.000+</div>
            <div className="text-xs text-white">Tải ứng dụng xuống (Android & Ios)</div>
          </div>
        </li>
        <li>
          <img className="relative h-[310px] w-[90%] inline-block mr-2 rounded-md" src={BgLi4} alt="" />
          <div className="text-white absolute top-[2457px] left-[1090px]">
            <div className="text-3xl text-white">35.000+</div>
            <div className="text-xs text-white">Đối tác trong và ngoài nước</div>
          </div>
        </li>
      </ul>
    </div>
    {/* Hãy để Explore Nest đồng hàng cùng bạn */}
    <div className="mt-44 pb-40 m-auto flex justify-center">
      <div>
        <img className="relative" src={BgBanner} alt="" />
        <div className="absolute text-5xl leading-9 pl-12 pb-36 top-[2892px]">
          <h1 className="mb-6 text-white">Hãy để Explore Nest</h1>
          <h1 className="text-white">đồng hành cùng bạn</h1>
        </div>
        <div className=" flex items-center absolute top-[3000px] ml-12 cursor-pointer mt-10 bg-[#EB662B] tex-sm font-normal text-white w-[130px] h-[40px] px-3 rounded-lg">
          Đăng ký ngay
        </div>
      </div>
    </div>
  </div>;
};

export default ContactUs;
