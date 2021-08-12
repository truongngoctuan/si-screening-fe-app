import { ButtonType } from "../../typings";

export function getNextStates(buttonType: ButtonType, histories: ButtonType[]) {

  let queryString = histories.length > 0 ? `?` : '';

  for (let index = 0; index < histories.length; index++) {
    const element = histories[index];
    if (index > 0) queryString += '&';
    queryString += `histories=${element}`
  }

  return fetch(`http://localhost:3100/api/transition/${buttonType}${queryString}`)
    .then(response => response.json())
    .then(data => ({ data }));
}