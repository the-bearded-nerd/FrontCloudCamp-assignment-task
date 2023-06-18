import { useNavigate } from "react-router-dom";

import { ReactComponent as Success } from "../../assets/RequestSucces.svg";
import { ReactComponent as Fail } from "../../assets/RequestFail.svg";
import { Button, ThemeButton } from "../Button/Button";

import cls from "./ResponseModalContent.module.css";

export interface ResponseModalContentProps {
  ok: boolean;
  status?: number;
  statusText?: string;
  handleClose?: () => void;
}

interface BadResponseProps {
  statusText: string;
  status?: number;
  handleClose?: () => void;
}

export const ResponseModalContent = (props: ResponseModalContentProps) => {
  const { ok, status, statusText, handleClose } = props;
  if (ok) return <GoodResponse />;
  else
    return (
      <BadResponse
        statusText={
          statusText ? statusText : "Ошибка выполнения запроса на сервер"
        }
        status={status}
        handleClose={handleClose}
      />
    );
};

const GoodResponse = () => {
  const navigate = useNavigate();
  return (
    <div className={cls["response"]}>
      <p className={cls["response-text"]}>Форма успешно оправлена</p>
      <Success />
      <Button
        id="button-to-main"
        type="button"
        theme={ThemeButton.PRIMARY}
        onClick={() => navigate("/")}
      >
        На главную
      </Button>
    </div>
  );
};

const BadResponse = (props: BadResponseProps) => {
  const { statusText, status, handleClose } = props;
  return (
    <div className={cls["response"]}>
      <p className={cls["response-text"]}>При отправке формы возникла ошибка</p>
      {status && (
        <p className={cls["response-text"]}>{`Статус запроса: ${status}`}</p>
      )}
      <p className={cls["response-text"]}>{`Ошибка: ${statusText}`}</p>
      <Fail />
      <Button
        id="button-close"
        type="button"
        theme={ThemeButton.PRIMARY}
        onClick={handleClose}
      >
        Закрыть
      </Button>
    </div>
  );
};
