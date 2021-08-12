import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RoundButton } from "../../components/RoundButton/RoundButton";
import { ButtonType } from "../../typings";
import styles from "./GameNButtons.module.css";
import { reset, selectAvailableSteps, selectCurrentStep, getAvailableStatesAsync, selectState } from "./gameSlice";

export function Game4Buttons() {

  const dispatch = useAppDispatch();
  const buttonTypeSelected = useAppSelector(selectCurrentStep);
  const nextButtonTypes = useAppSelector(selectAvailableSteps);

  const buttons: ButtonType[] = ["blue", "green", "yellow"];

  useEffect(() => {
    dispatch(getAvailableStatesAsync(buttonTypeSelected));
  }, [dispatch, buttonTypeSelected]);

  const buttonClickHandler = (buttonType: ButtonType) => {
    dispatch(selectState(buttonType));
  }

  const resetClickHandler = () => dispatch(reset());

  return (
    <div>
      {buttons.map(btnType =>
        <RoundButton key={btnType} selected={buttonTypeSelected === btnType} type={btnType}
          disabled={nextButtonTypes.findIndex(nBtn => nBtn === btnType) === -1}
          onClick={buttonClickHandler} />
      )}
      <br />
      <button className={styles["reset-button"]} onClick={resetClickHandler}>Reset</button>
    </div>
  );
}
