import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import DirectionsTransitOutlinedIcon from '@mui/icons-material/DirectionsTransitOutlined';
import { State } from "country-state-city";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
    const navigate = useNavigate();
    
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, pinCode, phoneNo })
    );
    navigate("/process/payment");
  };

  return (
    <Fragment>

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeOutlinedIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityOutlinedIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
                <DirectionsTransitOutlinedIcon />

                <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                >
                    <option value="">State</option>
                    {State &&
                    State.getStatesOfCountry("IN").map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
              <PinDropOutlinedIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <LocalPhoneOutlinedIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
        {/* <div className="shippingBox2">
          <img src={locationImg} alt="rose_img" />
        </div> */}
      </div>
    </Fragment>
  );
};

export default Shipping;