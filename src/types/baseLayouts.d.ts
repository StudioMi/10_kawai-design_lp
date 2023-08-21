export interface HeadTags {
  title?: string;
  description?: string;
  robots?: boolean;
  googlebot?: boolean;
  favicon?: string;
  appleTouchIcon?: string;
  canonical?: string;
  keywords?: string;
  ogp?: Record<string, string>;
  ogpTwitter?: Record<string, string>;
  customHeadTags?: string;
  customBodyStartTags?: string;
  customBodyEndTags?: string;
}

export interface MetaTag {
  tagName: string;
  [key: string]: string | undefined;
}

export interface BaseLayoutProps {
  lightModeThemeColor?: string;
  darkModeThemeColor?: string;
}

export interface Attributes {
  attr?: {
    htmlAttr?: { [key: string]: string | boolean | number };
    bodyAttr?: { [key: string]: string | boolean | number };
  };
}
