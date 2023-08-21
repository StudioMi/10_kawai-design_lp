import type { CountdownTimerConfig } from "@/types/countdownTimer";

export const useCountdownTimer = (config: CountdownTimerConfig) => {
  /* 以下は、変更したい場合だけ変更してください */
  const contorolId = "24"; // 任意の管理用IDを入力 e.g. "myCountDown"
  // 初回訪問日時を記録する際のkey名 (アンダーバーの後には管理用IDが入ります)
  const firstVisitKeyName = "FirstVisitDate_" + contorolId;
  // 終了時刻を記録する際のkey名
  const finishedKeyName = "FinishDate_" + contorolId;

  /* ここから先は実際の処理です */

  // カウントダウンタイマーを設置する要素
  const target = document.querySelectorAll(`[data-countdown="${config.targetElement}"]`);

  // ゼロパディング処理
  const addZero = (num: number | string, char: number = 2) => {
    const str = num.toString().padStart(char, "0");
    return str.slice(0, char);
  };

  // 終了時間を計算する
  const calcEndTime = (firstVisitTime: string | number | Date, endTime: number, timeUnit: string) => {
    let endDate = new Date(firstVisitTime);
    switch (timeUnit) {
      case "day":
        endDate.setDate(endDate.getDate() + endTime);
        break;
      case "hour":
        endDate.setHours(endDate.getHours() + endTime);
        break;
      case "minute":
      case "min":
        endDate.setMinutes(endDate.getMinutes() + endTime);
        break;
      case "second":
      case "sec":
        endDate.setSeconds(endDate.getSeconds() + endTime);
        break;
      case "millisecond":
      case "ms":
        endDate.setMilliseconds(endDate.getMilliseconds() + endTime);
        break;
      default:
        console.log("Invalid time unit");
    }
    return endDate;
  };

  // 初回データを保存する
  const saveFirstVisit = () => {
    const firstVisitTime = new Date();
    const endTime = calcEndTime(firstVisitTime, config.relativeEndTime, config.relativeTimeUnit);
    const saveStorage = (key: string, value: string) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, value);
      }
    };
    saveStorage(finishedKeyName, String(endTime));
  };

  // ローカルストレージから取り出す関数
  const getStorage = (key: string) => {
    const localItem = localStorage.getItem(key);
    if (localStorage.getItem(key)) {
      return localItem;
    } else {
      return;
    }
  };

  // ボタンを非表示にする
  const hiddenBtn = () => {
    const btns = document.querySelectorAll(config.btnElement);
    if (config.finishedHiddenBtn) {
      btns.forEach((el) => {
        el.setAttribute("style", "display:none;");
      });
    }
  };

  // 繰り返しタイマーが起動している場合
  const checkRepeat = () => {
    if (getStorage("CtRepeat")) {
      hiddenBtn();
    }
  };

  // 差分を計算する
  const calcDiffTime = () => {
    const nowTime = new Date();
    let endTime: Date;
    if (config.timerMode === "countdown") {
      endTime = new Date(getStorage(finishedKeyName));
    } else if (config.timerMode === "deadline") {
      const replaceFixedEndTime = config.fixedEndTime.replace(/-/g, "/") + "+09:00";
      endTime = new Date(replaceFixedEndTime);
    }
    const diffTime = endTime.getTime() - nowTime.getTime();

    if (diffTime <= 0) {
      return false;
    }

    const diffTimeInMS = diffTime;
    const diffTimeInS = diffTime / 1000;
    const diffTimeInM = diffTimeInS / 60;
    const diffTimeInH = diffTimeInM / 60;
    const diffTimeInD = diffTimeInH / 24;

    const ms = diffTimeInMS % 1000;
    const sec = Math.floor(diffTimeInS % 60);
    const min = Math.floor(diffTimeInM % 60);
    const hour = Math.floor(diffTimeInH % 24);
    const day = Math.floor(diffTimeInD);

    return {
      day: addZero(day, config.disits.days) as string,
      hour: addZero(hour, config.disits.hours) as string,
      min: addZero(min, config.disits.minutes) as string,
      sec: addZero(sec, config.disits.seconds) as string,
      ms: addZero(ms, config.disits.milliseconds) as string,
    };
  };

  // フォーマットする
  const timeFormat = (diffTime: typeof calcDiffTime extends () => infer R ? R : never) => {
    if (diffTime === false) return config.changeText;
    let timeString = config.timeFormat;
    const addTagAndPrefixTimer = (timeUnit: string, time: string, unit: string) => {
      const prefix = config.timeUnitClassPrefix ? config.timeUnitClassPrefix + "_" : "";
      return `<span class="${prefix}timer_time ${prefix}timer_${timeUnit}">${time}</span>${
        unit ? `<span class="timer_unit ${prefix}unit_${timeUnit}">${unit}</span>` : ""
      }`;
    };

    const replaceString = [
      { key: "day", unit: "日" },
      { key: "hour", unit: "時" },
      { key: "min", unit: "分" },
      { key: "sec", unit: "秒" },
      { key: "ms", unit: "" },
    ];

    let stringWithoutUnits = timeString;
    replaceString.forEach((item) => {
      stringWithoutUnits = stringWithoutUnits.replace(item.unit, "");
    });

    replaceString.forEach((item) => {
      const regex = new RegExp(`${item.key}`, "g");
      stringWithoutUnits = stringWithoutUnits.replace(
        regex,
        addTagAndPrefixTimer(item.key, diffTime[item.key], item.unit)
      );
    });

    return stringWithoutUnits;
  };

  // 終了時の処理
  const endMethods = (methods: CountdownTimerConfig["finishedBehavior"], timerEl: Element) => {
    // ボタンを非表示にする
    hiddenBtn();

    switch (methods) {
      // 終了ページに遷移させる
      case "redirect":
        window.location.href = config.redirectTo;
        break;
      // カウントダウンタイマーの文字を変更する
      case "changeText":
        // 文字を変更
        timerEl.innerHTML = config.changeText;
        break;
      // タイマーを復活させる
      case "repeat":
        localStorage.clear();
        saveFirstVisit();
        window.location.reload();
        break;
      case "none":
        break;
      default:
        break;
    }

    // 初回終了フラグ
    localStorage.setItem("CtRepeat", "true");
  };

  // タイマー速度の処理
  const intervalSpeed = (speed: CountdownTimerConfig["countSpeed"]) => {
    const minRate = 10;
    const maxRate = 60000;
    if (speed <= minRate) {
      return minRate;
    } else if (speed >= maxRate) {
      return maxRate;
    } else {
      return speed;
    }
  };

  // 初回訪問時の処理
  const firstVisit = () => {
    saveFirstVisit();
    checkRepeat();
    target.forEach((el) => {
      el.innerHTML = "";
      const p = document.createElement("span");
      const newElem = el.appendChild(p);
      const diffTime = calcDiffTime();
      if (!calcDiffTime()) {
        endMethods(config.finishedBehavior, el);
      } else {
        newElem.innerHTML = "";
        newElem.innerHTML = timeFormat(diffTime);
      }
    });
  };
  firstVisit();

  // 現在時刻を更新する
  const setTime = setInterval(() => {
    target.forEach((el) => {
      el.innerHTML = "";
      const p = document.createElement("span");
      const newElem = el.appendChild(p);
      const diffTime = calcDiffTime();
      if (!calcDiffTime()) {
        // タイマーを止める
        clearInterval(setTime);
        endMethods(config.finishedBehavior, el);
      } else {
        newElem.innerHTML = "";
        newElem.innerHTML = timeFormat(diffTime);
      }
    });
  }, intervalSpeed(config.countSpeed));
};
