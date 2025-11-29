import type { Slide } from "../slides/Slide";
import type { ContactFields, IconLink } from "../components/views/ContactSlideView";

export interface SlideConfig {
  id: string;
  type: string;
  title?: string;
  subtitle?: string;
  description?: string[];
  imageUrl?: string;
  imageLeft?: boolean;
  items?: any[];
  roles?: string[];
  contact? : ContactFields;
  icons? : IconLink[];
  instance: Slide;

  marginTop?: number | string;
  marginBottom?: number | string;
  paddingY?: number | string;
}
