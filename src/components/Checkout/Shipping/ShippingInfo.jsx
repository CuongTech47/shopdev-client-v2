import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import axios from "axios";
const ShippingInfo = ({
  user,
  province,
  setProvince,
  district,
  setDistrict,
  ward,
  setWard,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
}) => {
  const [listProvice, setListProvice] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
        {
          headers: {
            "Content-Type": "application/json",
            token: "d0ad9db7-dc8c-11ee-8868-1648922bf010",
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setListProvice(res.data.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${province}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: "d0ad9db7-dc8c-11ee-8868-1648922bf010",
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setListDistrict(res.data.data);
      });
  }, [province]);
  useEffect(() => {
    axios
      .get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: "d0ad9db7-dc8c-11ee-8868-1648922bf010",
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setListWard(res.data.data);
      });
  }, [district]);
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Địa chỉ giao hàng</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              value={user && user.name}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={user && user.email}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Tỉnh Thành</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <option className="block pb-2" value="" disabled>
                Vui lòng chọn tỉnh thành
              </option>
              {listProvice &&
                listProvice.map((item) => (
                  <option key={item.ProvinceID} value={item.ProvinceID}>
                    {item.ProvinceName}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-[50%]">
            <label className="block pb-2">Quận/Huyện</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option className="block pb-2" value="" disabled>
                Vui lòng chọn quận huyện
              </option>
              {listDistrict &&
                listDistrict.map((item) => (
                  <option key={item.DistrictID} value={item.DistrictID}>
                    {item.DistrictName}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-[50%]">
            <label className="block pb-2">Phường/Xã</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
            >
              <option className="block pb-2" value="" disabled>
                Vui lòng chọn Phường/Xã
              </option>
              {listWard &&
                listWard.map((item) => (
                  <option key={item.WardCode} value={item.WardCode}>
                    {item.WardName}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input
              type="address"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div></div>
        </div>
      </form>
      <h5
        className="text-[18px] cursor-pointer inline-block"
        onClick={() => setUserInfo(!userInfo)}
      >
        Chọn Từ địa chỉ đã lưu
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1">
                <input
                  type="radio"
                  className="mr-3"
                  value={item.addressType}
                  name="radio-address"
                  onClick={() =>
                    setAddress1(item.address1) ||
                    setWard(item.ward) ||
                    setDistrict(item.district) ||
                    setProvince(item.province)
                  }
                />
                <h2>{item.addressType}</h2>
                  
              </div>
            ))}
        </div>
      )}
      
    
     
    </div>
  );
};

export default ShippingInfo;
