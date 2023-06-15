import cls from "./NotFound.module.css";

export const NotFound = () => {
  return (
    <div className={cls["notfound-page"]}>
      <div className={cls["notfound-page-container"]}>
        <h1>Page not found =( </h1>
      </div>
    </div>
  );
};
