import React, { useState } from "react";
import styles from "../../styles/styles";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import ShippingInfo from "./Shipping/ShippingInfo";
import CartData from "./Shipping/CartData";
import { formatPriceToVND } from "../../utils/formatPrice";
const Checkout = () => {
  const { user } = useSelector((state) => state.user);

  const { cart } = useSelector((state) => state.cart);
  const [userInfo, setUserInfo] = useState(false);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address1, setAddress1] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [shipping, setShippingGHN] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if(address1 === "" || district === "" || ward === null || province === "" ){
       toast.error("Vui lòng chọn địa chỉ giao hàng của bạn!")
    } else{
     const shippingAddress = {
       address1,
       district,
       ward,
       province
     };
 
     const orderData = {
       cart,
       totalPrice,
       subTotalPrice,
       shipping,
       discountPrice,
       shippingAddress,
       user,
     }
 
     // update local storage with the updated orders array
     localStorage.setItem("latestOrder", JSON.stringify(orderData));
     navigate("/payment");
    }
   };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // this is shipping cost variable
  // const shipping = subTotalPrice * 0.1;

  useEffect(() => {
    axios
      .post(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
        {
          service_type_id: 2,
          to_district_id: parseInt(district),
          to_ward_code: ward,
          height: 20,
          length: 30,
          weight: 3000,
          width: 40,
          insurance_value: subTotalPrice,
          item: [],
        },
        {
          headers: {
            token: "d0ad9db7-dc8c-11ee-8868-1648922bf010",
            shopid: "4941423",
          },
        }
      )
      .then((res) => {
        // console.log(res.data.data.total);
        setShippingGHN(res.data.data.total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [district, ward, subTotalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.metadata.couponCode?.shopId;

      const couponCodeValue = res.data.metadata.couponCode?.value;
      console.log(couponCodeValue);
      if (res.data.metadata.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );

          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.metadata.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.metadata.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode("");
      }
    });
  };
  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? subTotalPrice + shipping - discountPercentenge
    : subTotalPrice + shipping;

  //   console.log(discountPercentenge);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            province={province}
            setProvince={setProvince}
            district={district}
            setDistrict={setDistrict}
            ward={ward}
            setWard={setWard}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Đi tới Thanh toán</h5>
      </div>
    </div>
  );
};

export default Checkout;
