
import classNames from 'classnames';
import styles from './RoundButton.module.css';
import { ButtonType } from '../../typings';

export type StateButtonProps = {
  selected: boolean;
  type: ButtonType;
  disabled: boolean;
  onClick: (buttonType: ButtonType) => void;
}

export function RoundButton({ selected, type, disabled, onClick }: StateButtonProps) {

  return (
    <button className={classNames(styles.button, "disabled:opacity-50",
      styles[`button-${type}`],
      {
        [styles["button-selected"]]: selected,
        [styles["button-disabled"]]: disabled,
      })}
      disabled={disabled}
      onClick={() => onClick(type)} />
  );
}
