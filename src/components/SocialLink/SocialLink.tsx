import cls from "./SocialLink.module.css";
import { ReactComponent as FolderLogo } from "../../assets/Folder.svg";

interface SocialLinkProps {
  name: string;
  url: string;
}

export const SocialLink = (props: SocialLinkProps) => {
  const { name, url } = props;
  return (
    <div className={cls["social-container"]}>
      <FolderLogo />
      <a className={cls["social-link"]} href={url}>
        {name}
      </a>
    </div>
  );
};
