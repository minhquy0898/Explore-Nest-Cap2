import { Link, useSearchParams } from "react-router-dom";
import { styles } from "../styles/styles";
import { FaCircleCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { useEffect, useState } from "react";

const PaymentStatusPage = () => {
  const params = useSearchParams()

  const [status, setStatus] = useState("")

  useEffect(() => {

    if (params[0].get("status")) setStatus(params[0].get("status"))
  }, [status])

  return (
    <>
      <div
        className={`${styles.horizontalPadding}  px-2 mb-10 text-center w-full h-[400px] flex items-center`}
      >
        <div className="w-full ">
          <div className="w-full flex justify-center">
            {status == "success" && <FaCircleCheck fill="green" size={100} />}
            {status == "failed" && <MdError fill="red" size={100} />}
          </div>
          <div className="w-full text-center">
            <p className="text-4xl my-3">
              {
                status == "success" && 'Bạn đã thanh toán thành công!'
              }
              {
                status == "failed" && 'Có lỗi xảy ra, thanh toán thất bại!'
              }
            </p>
            <p className="text-sm">
              Hãy click vào đây để trở về
              <Link to="/" className="text-blue-600 mx-1 underline">
                trang chủ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentStatusPage;
