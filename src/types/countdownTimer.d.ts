export interface CountdownTimerConfig {
  targetElement: string;
  // タイマーの種類
  timerMode: "countdown" | "deadline";
  // 終了後の挙動
  finishedBehavior: "redirect" | "changeText" | "repeat" | "none";
  // ボタンを非表示にするかどうか
  finishedHiddenBtn: boolean;
  btnElement?: string;

  // タイマーのフォーマット
  timeFormat?: string;
  // タイマーの更新スピード
  countSpeed?: number;
  // タイマー部分につくクラス名の接頭詞
  timerClassPrefix?: string;
  // 時間単位部分につくクラス名の接頭詞
  timeUnitClassPrefix?: string;

  // 桁数の指定
  disits?: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
  };

  // リダイレクト先
  redirectTo?: string;
  // テキストを変更する場合のテキスト
  changeText?: string;

  // アクセス後の経過時間
  relativeEndTime?: number;
  relativeTimeUnit?: string;

  // 固定の終了時間
  fixedEndTime?: string;
}