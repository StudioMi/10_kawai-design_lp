// Vimeoの動画を読み込んで指定IDの要素に配置する
import Player from "@vimeo/player";

export type VimeoOptions = {
  id?: string;
  url?: string;
  width?: number;
  maxwidth?: number;
  height?: number;
  maxheight?: number;
  autoplay?: boolean;
  dnt?: boolean;
  byline?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsinline?: boolean;
  controls?: boolean;
  pip?: boolean;
  autopip?: boolean;
  background?: boolean;
  keyborad?: boolean;
  title?: boolean;
  portrait?: boolean;
  speed?: boolean;
  transparent?: boolean;
  responsive?: boolean;
};

export const insertVimeo = async (
  id: string | HTMLElement | NodeListOf<HTMLElement>,
  options?: VimeoOptions
): Promise<Player | Error> => {
  let elements: HTMLElement[];
  if (typeof id === "string") {
    // 引数が文字列の場合はQuerySelectorAllで要素を取得する
    elements = Array.from(document.querySelectorAll(id));
  } else if (id instanceof HTMLElement) {
    // HTMLElementの場合はNodeListに変換する
    elements = [id];
  } else {
    // NodeListの場合はそのまま
    elements = Array.from(id);
  }

  // 要素が取得できなかった場合は処理を終了する
  if (elements.length === 0) {
    return new Error("指定された要素が存在しません。");
  }

  // elementsの全てにプレイヤーを配置する
  let player: Player;
  elements.forEach((element: HTMLElement) => {
    player = new Player(element, options);
  });
  return player;
};

type VimeoUrlAndId = {
  "data-vimeo-url"?: string;
  "data-vimeo-id"?: string;
};
export const insertUrlOrId = (id?: string, url?: string): VimeoUrlAndId => {
  let UrlOrId: VimeoUrlAndId = {};
  if (id) {
    UrlOrId["data-vimeo-id"] = id;
  } else if (url) {
    UrlOrId["data-vimeo-url"] = url;
  }
  return { ...UrlOrId };
};
