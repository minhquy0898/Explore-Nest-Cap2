import React from "react";
import Button from "../global/Button";
import { FaPhoneVolume } from "react-icons/fa";
import './TourBookingCard.css'
import { styles } from "../../styles/styles";
import { GiCheckMark } from "react-icons/gi";
import { formatCurrencyVND } from "../../utils";
const TourBookingCard = ({
  tourGuide,
  meal,
  insurance,
  price,
  promotional,
  departure_day,
  end_tour_day,
  handleBooking,
  managerData,
  staffData,
}) => {

  return (
    <div className="col-span-4 md:col-span-4 box_shadow rounded-xl flex flex-col gap-2 px-4 md:p-6 py-4 mt-8 md:mt-0 h-[480px]">
      <p className="text-base">
        Giá gốc:
        <span className="ml-2 font-medium line-through text-gray-600 italic">
          {formatCurrencyVND(parseInt(price))}
        </span>
      </p>
      <p className="text-base">
        Khuyến mãi:
        <span className={`${styles.orangeText} ml-2 font-semibold text-[24px]`}>
          {(promotional * 100).toFixed(0)} %
        </span>
      </p>
      <p className="text-base">
        Giá mới chỉ:
        <span className={`${styles.orangeText} ml-2 font-semibold text-[29px]`}>
          {formatCurrencyVND(price - price * promotional)}
        </span>
      </p>
      <p className="text-base">
        Cung cấp bởi:
        <span className={` ml-2 font-normal`}>
          {managerData?.company_name}
        </span>
      </p>
      <p className="text-base">
        Dẫn đoàn:
        <span className={` ml-2 font-normal`}>
          {staffData?.accountData?.username}
        </span>
      </p>
      {tourGuide || meal || insurance ? (
        <div>
          <p className="text-base font-medium">Quyền lợi</p>
          {tourGuide && (
            <div className="flex justify-between items-center pl-3 my-1">
              <div className="flex items-center gap-2">
                <GiCheckMark fill="#EB662B" />
                <label htmlFor="" className="text-sm">
                  Hướng dẫn viên nhiệt tình
                </label>
              </div>
            </div>
          )}
          {meal && (
            <div className="flex justify-between items-center pl-3 my-1">
              <div className="flex items-center gap-2">
                <GiCheckMark fill="#EB662B" />
                <label htmlFor="" className="text-sm">
                  Ăn uống trọn gói
                </label>
              </div>
            </div>
          )}
          {insurance && (
            <div className="flex justify-between items-center pl-3 my-1">
              <div className="flex items-center gap-2">
                <GiCheckMark fill="#EB662B" />
                <label htmlFor="" className="text-sm">
                  Bảo hiểm chuyến đi
                </label>
              </div>
            </div>
          )}
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <p className="text-sm">Ngày khởi hành: </p>
        <div className="text-sm flex items-center gap-2 md:gap-4">
          <p className="text-sm">{departure_day}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm">Ngày kết thúc: </p>
        <div className="text-sm flex items-center gap-2 md:gap-4">
          <p className="text-sm">{end_tour_day}</p>
        </div>
      </div>

      <Button
        title="Đặt Ngay"
        onclick={handleBooking}
        classes={`${styles.bgOrange} w-full py-2 text-base font-medium py-3 my-3 text-white rounded-xl`}
      />
      {/* Tổng đài tư vấn */}
      <div className=" mt-10 ">
        <div className="uppercase text-center  bg-blue-600 text-white p-3 ">
          Tổng đài tư vấn
        </div>
        <div className="border border-solid p-4">
          <p className="font-bold">Mọi thắc mắc của quý khách</p>
          <p>vui lòng gọi : <span className="text-blue-600 font-bold text-xl">1900 8181</span></p>
          <p>Chúng tôi hỗ trợ 24/7</p>
        </div>
      </div>

      {/* Liên hệ tư vấn viên */}
      <div className="mt-6 ">
        <div className="text-xl inline-block border-b-4 border-solid border-blue-500 mb-5">
          Liên hệ tư vấn viên
        </div>
        {/* ----1--- */}
        <div className="flex border border-solid rounded-lg mb-5">
          <div className="flex items-center text-4xl p-5 mr-5 ">
            <FaPhoneVolume fill="#00b874" />
          </div>
          <div className="mt-3">
            <p className=""> Mr. Quý ( Tour Đoàn ) </p>
            <p className="font-bold"> 0898 240 032 </p>
          </div>
        </div>
        {/* ---2--- */}
        <div className="flex border border-solid rounded-lg mb-5">
          <div className="flex items-center text-4xl p-5 mr-5 ">
            <FaPhoneVolume fill="#00b874" />
          </div>
          <div className="mt-3">
            <p className=""> Mr. Kiếm  </p>
            <p className="font-bold"> 0123 421 123 </p>
          </div>
        </div>
        {/* ---3---- */}
        <div className="flex border border-solid rounded-lg mb-5">
          <div className="flex items-center text-4xl p-5 mr-5 ">
            <FaPhoneVolume fill="#00b874" />
          </div>
          <div className="mt-3">
            <p className=""> Mrs. Chang Chang </p>
            <p className="font-bold"> 0789 123 123 </p>
          </div>
        </div>
        {/* ---4---- */}
        <div className="flex border border-solid rounded-lg mb-5">
          <div className="flex items-center text-4xl p-5 mr-5 ">
            <FaPhoneVolume fill="#00b874" />
          </div>
          <div className="mt-3">
            <p className=""> Mrs. Yến Nhi  </p>
            <p className="font-bold"> 0905 676 789 </p>
          </div>
        </div>
        {/* ---5---- */}
        <div className="flex border border-solid rounded-lg mb-5">
          <div className="flex items-center text-4xl p-5 mr-5 ">
            <FaPhoneVolume fill="#00b874" />
          </div>
          <div className="mt-3">
            <p className=""> Mrs. Hoàng Yến </p>
            <p className="font-bold"> 0905 987 654 </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default TourBookingCard;
