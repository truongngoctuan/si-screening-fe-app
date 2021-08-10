import { useState } from "react";
import { RoundButton } from "../../components/RoundButton/RoundButton";
import { ButtonType } from "../../components/typings";
import { getNextTransitions } from "./fake-api";
import styles from "./GameNButtons.module.css";

export function Game4Buttons() {

  const buttons: ButtonType[] = ["blue", "green", "yellow"];
  const initButtonType: ButtonType = "blue";

  const [buttonTypeSelected, setButtonTypeSelected] = useState<ButtonType>(initButtonType);

  // data returned from API
  const nextButtonTypes = getNextTransitions(buttonTypeSelected);

  const buttonClickHandler = (buttonType: ButtonType) => {
    console.log("hello")
    setButtonTypeSelected(buttonType);
  }

  const resetClickHandler = () => setButtonTypeSelected(initButtonType)

  return (
    <div>
      {buttons.map(btnType =>
        <RoundButton key={btnType} selected={buttonTypeSelected === btnType} type={btnType}
          disabled={nextButtonTypes.findIndex(nBtn => nBtn === btnType) === -1}
          onClick={buttonClickHandler} />
      )}
      <button className={styles["reset-button"]} onClick={resetClickHandler}>Reset</button>
    </div>
  );
}
