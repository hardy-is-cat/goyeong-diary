import "styled-components";
import {
  DarkColorTypes,
  LightColorTypes,
  FontSizeTypes,
  MediaQueryTypes,
} from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: LightColorTypes | DarkColorTypes;
    fontSize: FontSizeTypes;
    media: MediaQueryTypes;
  }
}
