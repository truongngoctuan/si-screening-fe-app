import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RoundButton } from "../../components/RoundButton/RoundButton";
import { ButtonType } from "../../typings";
import styles from "./GameNButtons.module.css";
import { reset, selectAvailableSteps, selectCurrentStep, getAvailableStatesAsync, selectState, selectHistories, selectIsLoading } from "./gameSlice";

export function Game4Buttons() {

  const dispatch = useAppDispatch();
  const buttonTypeSelected = useAppSelector(selectCurrentStep);
  const nextButtonTypes = useAppSelector(selectAvailableSteps);
  const buttonHistories = useAppSelector(selectHistories);

  const isLoading = useAppSelector(selectIsLoading);

  const buttons: ButtonType[] = ["blue", "green", "yellow"];

  useEffect(() => {
    dispatch(getAvailableStatesAsync({ step: buttonTypeSelected, histories: buttonHistories }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <br />
      <span className="text-blue-400 text-sm">{isLoading ? 'Loading' : 'Loaded Success'}</span>
    </div>
  );
}
