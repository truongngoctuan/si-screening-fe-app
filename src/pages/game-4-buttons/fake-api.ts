import { ButtonType } from "../../components/typings";

export function getNextTransitions(currentType: ButtonType): ButtonType[] {
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