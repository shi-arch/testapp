"use client";

import React, { useState } from "react";

import VibeZonePlans from "../VibeZonePlans";
import {
  AtSvg,
  BadgesSvg,
  BillingSvg,
  CallSvg,
  CameraSvg,
  InfoSvg,
  LeftArrowSvg,
  NotificationSvg,
  PenSvg,
  PreferenceSvg,
  PrivacySvg,
} from "../svgComponents/svgComponents";

import "./sidebar.css";
import { SideBarSelections } from "../commonComponents/commonComponents";
import { useDispatch } from "react-redux";
import {
  setBadgesModal,
  setPreferenceModal,
  setProfileModal,
} from "../../Context/features/modalSlice";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  //redux-tool kit
  const dispatch = useDispatch();

  const handleSelection = () => {
    console.log("Selection");
  };

  const handleEditSelection = () => {
    console.log("Edit Selection");
    dispatch(setProfileModal());
  };

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const onClickPreferences = () => {
    //updating the preferences modal selection
    dispatch(setPreferenceModal());
  };

  const handleBadgeSelection = () => {
    dispatch(setBadgesModal());
  };
  return (
    <div className={`sidebar-bg-container ${isOpen ? "open" : "closed"}`}>
      <div className="side-bar-top-container">
        <div className="profile-container">
          <div className="sidebar-profile"></div>
          <div className="img-icon-container">
            <CameraSvg />
          </div>
        </div>
        <h5 className="user-name-head">Gattu Pavan Kumar</h5>
        <p className="side-bar-user-prof-text">Software Developer</p>
      </div>

      <div>
        <div className="side-bar-icon-text-container">
          <CallSvg />
          <div>
            <p className="mobile-number-text">+91 9182263486</p>
            <p className="phone-text">Phone</p>
          </div>
        </div>

        <div className="side-bar-icon-text-container">
          <AtSvg />

          <div>
            <p className="mobile-number-text">pavankumar</p>
            <p className="phone-text">Username</p>
          </div>
        </div>

        <div className="side-bar-icon-text-container">
          <InfoSvg />
          <div>
            <p className="mobile-number-text">Product Designer</p>
            <p className="phone-text">status</p>
          </div>
          <button
            type="button"
            className="edit-button"
            onClick={handleEditSelection}
          >
            <PenSvg />
          </button>
        </div>
      </div>

      <hr className="hr-line" />

      <div>
        <div
          className="side-bar-icon-text-container pointer"
          onClick={onClickPreferences}
        >
          <PreferenceSvg />

          <p className="mobile-number-text">Preferences</p>
        </div>
        <div className="side-bar-icon-text-container pointer">
          <NotificationSvg />

          <p className="mobile-number-text">Notifications</p>
        </div>
        <div className="side-bar-icon-text-container pointer">
          <PrivacySvg />

          <p className="mobile-number-text">Privacy and Security</p>
        </div>
        <div className="side-bar-icon-text-container pointer">
          <BillingSvg />
          <p className="mobile-number-text ">Billing</p>
        </div>
        <div
          className="side-bar-icon-text-container pointer "
          onClick={handleBadgeSelection}
        >
          <BadgesSvg />
          <p className="mobile-number-text">Badges</p>
        </div>

        {/* <SideBarSelections
          name={BsTrophy}
          label="Badges"
          color="#fff"
          size={16}
          onClick={handleSelection}
        /> */}
      </div>

      <VibeZonePlans />

      <button className="close-left-side-bar-button" onClick={handleSideBar}>
        <LeftArrowSvg />
      </button>
    </div>
  );
};

export default SideBar;
