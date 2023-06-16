import cls from "./PersonalData.module.css";
import photo from "../../assets/photo.jpg";

import { SocialLink } from "../SocialLink/SocialLink";

export const UserData = () => {
  return (
    <div className={cls["user-container"]}>
      <img className={cls["user-photo"]} src={photo} alt="user photo" />
      <div className={cls["user-info"]}>
        <p className={cls["user-name"]}>Дима Карвонен</p>
        <div className={cls["user-social"]}>
          <SocialLink name="Telegram" url="https://t.me/DKarvonen" />
          <SocialLink name="GitHub" url="https://github.com/the-bearded-nerd" />
        </div>
      </div>
    </div>
  );
};
