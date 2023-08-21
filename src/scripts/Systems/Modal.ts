import MicroModal from "micromodal";

interface ModalOptions {
  openClass: string;
  disableScroll: boolean;
  awaitOpenAnimation: boolean;
  awaitCloseAnimation: boolean;
  onShow(modal: HTMLElement): void;
  onClose(modal: HTMLElement): void;
}

declare class MicroModal {
  static init(options: ModalOptions): void;
}

MicroModal.init({
  openClass: "is-open",
  disableScroll: true,
  awaitOpenAnimation: true,
  awaitCloseAnimation: true,
  onShow: (modal: HTMLElement) => {
    /* openに実行される処理 */
  },
  onClose: (modal: HTMLElement) => {
    /* closeに実行される処理 */
  },
});
