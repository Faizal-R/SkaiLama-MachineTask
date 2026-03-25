import { DI_TOKENS } from "./types.js";
import { Container } from "inversify";

const container = new Container();

export const resolve = <T>(
  identifier: typeof DI_TOKENS.CONTROLLERS[keyof typeof DI_TOKENS.CONTROLLERS]
): T => {
  return container.get<T>(identifier);
};

export default container;