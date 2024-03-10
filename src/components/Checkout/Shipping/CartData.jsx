import React from "react";
import styles from "../../../styles/styles";
import { formatPriceToVND } from "../../../utils/formatPrice";
const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Tổng phụ:</h3>
        <h5 className="text-[18px] font-[600]">
          {formatPriceToVND(subTotalPrice)}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">
          Phí vận chuyển bởi GHN:
        </h3>
        <h5 className="text-[18px] font-[600]">{formatPriceToVND(shipping)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Giảm giá:</h3>
        <h5 className="text-[18px] font-[600]">
          -{" "}
          {formatPriceToVND(discountPercentenge)
            ? formatPriceToVND(discountPercentenge)
            : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        {formatPriceToVND(totalPrice)}
      </h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default CartData;
