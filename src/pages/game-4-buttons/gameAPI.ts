import { ButtonType } from "../../typings";

// A mock function to mimic making an async request for data
export function getNextStates(buttonType: ButtonType, histories: ButtonType[]) {
  return new Promise<{ data: ButtonType[] }>((resolve) =>
    setTimeout(() => resolve({ data: getNextTransitions(buttonType) }), 500)
  );
}

function getNextTransitions(currentType: ButtonType): ButtonType[] {
  switch (currentType) {
    case "blue":
      return ["green", "yellow"];
    case "green":
    case "yellow":
      return ["blue"];
    default:
      return [];
  }
}