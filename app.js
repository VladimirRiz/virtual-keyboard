const body = document.querySelector("body");
// const textarea = document.querySelector(".container__textarea");
// let text = "";

const keyLayout = {
  sound: "sound",
  voice: "voice",
  Backquote: "`",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Digit0: "0",
  Minus: "-",
  Equal: "+",
  Backspace: "backspace",
  CapsLock: "caps",
  KeyQ: "q",
  KeyW: "w",
  KeyE: "e",
  KeyR: "r",
  KeyT: "t",
  KeyY: "y",
  KeyU: "u",
  KeyI: "i",
  KeyO: "o",
  KeyP: "p",
  BracketLeft: "{",
  BracketRight: "}",
  Enter: "enter",
  ShiftLeft: "keyboard_arrow_up",
  KeyA: "a",
  KeyS: "s",
  KeyD: "d",
  KeyF: "f",
  KeyG: "g",
  KeyH: "h",
  KeyJ: "j",
  KeyK: "k",
  KeyL: "l",
  Semicolon: ":",
  Quote: "'",
  Backslash: "\\",
  Done: "done",
  en: "language",
  KeyZ: "z",
  KeyX: "x",
  KeyC: "c",
  KeyV: "v",
  KeyB: "b",
  KeyN: "n",
  KeyM: "m",
  Comma: ",",
  Period: ".",
  Slash: "/",
  Space: "space",
  ArrowLeft: "back",
  ArrowRight: "prev",
};
const arr_ru = {
  sound: "sound",
  voice: "voice",
  Backquote: "ё",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Digit0: "0",
  Minus: "-",
  Equal: "+",
  Backspace: "backspace",
  CapsLock: "caps",
  KeyQ: "й",
  KeyW: "ц",
  KeyE: "у",
  KeyR: "к",
  KeyT: "е",
  KeyY: "н",
  KeyU: "г",
  KeyI: "ш",
  KeyO: "щ",
  KeyP: "з",
  BracketLeft: "х",
  BracketRight: "ъ",
  Enter: "enter",
  ShiftLeft: "keyboard_arrow_up",
  KeyA: "ф",
  KeyS: "ы",
  KeyD: "в",
  KeyF: "а",
  KeyG: "п",
  KeyH: "р",
  KeyJ: "о",
  KeyK: "л",
  KeyL: "д",
  Semicolon: "ж",
  Quote: "э",
  Backslash: "\\",
  Done: "done",
  ru: "language",
  KeyZ: "я",
  KeyX: "ч",
  KeyC: "c",
  KeyV: "м",
  KeyB: "и",
  KeyN: "т",
  KeyM: "ь",
  Comma: "б",
  Period: "ю",
  Slash: "?",
  Space: "space",
  ArrowLeft: "back",
  ArrowRight: "prev",
};

const keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: "",
    capsLock: false,
    shiftBtn: false,
    language: false,
    volume: false,
    voice: false,
  },

  _drawKeyboard() {
    this.elements.keysContainer = document.createElement("div");
    this.elements.keysContainer.classList.add("keyboard__keys");
    //add buttons to the container
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll(
      ".keyboard__key"
    );

    // add to the DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    body.insertBefore(
      this.elements.main,
      body.childNodes[body.childNodes.length - 1]
    );
  },

  init() {
    //   create container for the keyboard
    this.elements.main = document.createElement("div");

    //add classes to the elements

    this.elements.main.classList.add("keyboard", "keyboard--hidden");

    this.recognition = new webkitSpeechRecognition();
    // add to the DOM
    this._drawKeyboard();
    //automatically use keyboard oninput with class .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach((el) => {
      el.addEventListener("focus", () => {
        this.open(el.value, (currentValue) => {
          el.value = currentValue;
        });
      });
      el.addEventListener("blur", () => el.focus());
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();

    //** check if text selected */

    const getSelectedText = () => {
      var text = "";
      if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
      } else if (
        typeof document.selection != "undefined" &&
        document.selection.type == "Text"
      ) {
        text = document.selection.createRange().text;
      }
      return text;
    };

    const and = (x, y, attr) => {
      return x == attr && y == attr;
    };

    const getKeyboard = (e) => {
      let arr = this.properties.language ? arr_ru : keyLayout;
      let code = e.code;
      document.querySelectorAll(".keyboard__key").forEach((el) => {
        if (el.attributes.data.value == code) {
          if (el.attributes.data.value == "Space" && code == "Space") {
            setSymbol(" ");
          } else if (
            and(el.attributes.data.value, code, "Backspace") ||
            and(el.attributes.data.value, code, "ArrowLeft") ||
            and(el.attributes.data.value, code, "ArrowRight") ||
            and(el.attributes.data.value, code, "Enter") ||
            and(el.attributes.data.value, code, "CapsLock") ||
            and(el.attributes.data.value, code, "ShiftLeft")
          ) {
          } else if (el.attributes.data.value == code) {
            let arr1 = [")", "!", "@", "#", "$", "%", "^", "&", "*", "("];
            let arr2 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            if (this.properties.capsLock && !this.properties.shiftBtn) {
              if (arr1[code] <= 9) {
                if (arr[code] == 0) {
                  this.properties.value = setSymbol("0");
                } else {
                  this.properties.value = setSymbol(arr2[arr[code]]);
                }
              } else this.properties.value = setSymbol(arr[code].toUpperCase());
            } else if (this.properties.shiftBtn && !this.properties.capsLock) {
              if (arr[code] <= 9) {
                if (arr[code] == 0) {
                  this.properties.value = setSymbol(")");
                } else {
                  this.properties.value = setSymbol(arr1[arr[code]]);
                }
              } else this.properties.value = setSymbol(arr[code].toUpperCase());
            } else if (this.properties.shiftBtn && this.properties.capsLock) {
              if (arr[code] <= 9) {
                if (arr[code] == 0) {
                  this.properties.value = setSymbol(")");
                } else this.properties.value = setSymbol(arr1[arr[code]]);
              } else this.properties.value = setSymbol(arr[code].toLowerCase());
            } else {
              if (arr[code] <= 9) {
                if (arr[code] == 0) {
                  this.properties.value = setSymbol("0");
                } else this.properties.value = setSymbol(arr2[arr[code]]);
              } else this.properties.value = setSymbol(arr[code].toLowerCase());
            }
            e.preventDefault();
            // setSymbol(arr[code]);
          }
          document
            .querySelector(`.keyboard__key[data=${e.code}] `)
            .classList.add("active");
        }
      });
    };

    const getSymbolsFromVirtualKeyboard = () => {
      body.addEventListener("keydown", getKeyboard);

      body.addEventListener("keyup", (e) => {
        document.querySelectorAll(".keyboard__key").forEach((el) => {
          el.classList.remove("active");
        });
      });
    };

    const setSymbol = (n) => {
      let txtarea = document.querySelector(".container__textarea"),
        start = txtarea.selectionStart,
        end = txtarea.selectionEnd;
      finText =
        txtarea.value.substring(0, start) + n + txtarea.value.substring(end);
      txtarea.value = finText;
      txtarea.selectionEnd = end + 1;
      return finText;
    };

    const writeResult = (srr) => {
      const transcript = Array.from(srr.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      if (srr.results[0].isFinal) {
        document.querySelector(
          ".container__textarea"
        ).value += `${transcript} `;
      }
    };

    const removeSymbol = () => {
      let txtarea = document.querySelector(".container__textarea"),
        start = txtarea.selectionStart,
        end = txtarea.selectionEnd;
      if (txtarea.value !== "") {
        if (start !== 0) {
          finText =
            txtarea.value.substring(0, start - 1) +
            "" +
            txtarea.value.substring(end);

          txtarea.value = finText;
          txtarea.selectionEnd = end - 1;
        }
        return finText;
      }
      return txtarea.value;
    };

    const removeText = () => {
      let txtarea = document.querySelector(".container__textarea"),
        start = txtarea.selectionStart,
        end = txtarea.selectionEnd;
      if (start !== 0) {
        finText =
          txtarea.value.substring(0, start) + txtarea.value.substring(end);
        txtarea.value = finText;
        txtarea.focus();
        txtarea.selectionEnd = start;
      }
      return finText;
    };

    // create icons

    const icons = (icon_name) => `<i class = "material-icons">${icon_name}</i>`;

    const setLanguage = () => {
      let n = this.properties.language ? arr_ru : keyLayout;
      Object.entries(n).forEach((entry) => {
        const [key, value] = entry;
        const button = document.createElement("button"),
          insertLineBreak =
            ["voice", "backspace", "enter", "prev", "?", "\\", "/"].indexOf(
              n[key]
            ) !== -1;

        button.setAttribute("type", "button");
        button.classList.add("keyboard__key");
        switch (n[key]) {
          case "backspace":
            button.classList.add("keyboard__key--wide");
            button.setAttribute("data", key);
            button.innerHTML = icons("backspace");

            button.addEventListener("click", () => {
              if (this.properties.volume) {
                new Audio("./audio/1.mp3").autoplay = true;
              }
              if (getSelectedText()) {
                this.properties.value = removeText();
              } else {
                console.log("this");
                this.properties.value = removeSymbol();
              }

              this._triggerEvent("oninput");
            });
            break;
          case "caps":
            button.classList.add(
              "keyboard__key--wide",
              "keyboard__key--activatable"
            );
            if (this.properties.capsLock) {
              button.classList.add(
                "keyboard__key--active",
                this.properties.capsLock
              );
            }
            button.setAttribute("data", key);
            button.innerHTML = icons("keyboard_capslock");
            body.addEventListener("keyup", (e) => {
              if (e.code == "CapsLock") {
                this._toggleCapsLock();
                button.classList.toggle(
                  "keyboard__key--active",
                  this.properties.capsLock
                );
              }
            });
            button.addEventListener("click", () => {
              if (this.properties.volume) {
                new Audio("./audio/5.mp3").autoplay = true;
              }

              this._toggleCapsLock();
              button.classList.toggle(
                "keyboard__key--active",
                this.properties.capsLock
              );
            });
            break;
          case "keyboard_arrow_up":
            button.classList.add(
              "keyboard__key--wide",
              "keyboard__key--activatable"
            );
            if (this.properties.shiftBtn) {
              button.classList.add(
                "keyboard__key--active",
                this.properties.capsLock
              );
            }
            button.setAttribute("data", key);
            button.innerHTML = icons("keyboard_arrow_up");
            body.addEventListener("keyup", (e) => {
              if (e.code == "ShiftLeft") {
                this._toggleShift();
                button.classList.toggle(
                  "keyboard__key--active",
                  this.properties.shiftBtn
                );
              }
            });
            button.addEventListener("click", () => {
              if (this.properties.volume) {
                new Audio("./audio/2.mp3").autoplay = true;
              }
              this._toggleShift();
              button.classList.toggle(
                "keyboard__key--active",
                this.properties.shiftBtn
              );
            });
            break;

          case "enter":
            button.classList.add("keyboard__key--wide");
            button.setAttribute("data", key);
            button.innerHTML = icons("keyboard_return");

            button.addEventListener("click", () => {
              if (this.properties.volume) {
                new Audio("./audio/4.mp3").autoplay = true;
              }
              this.properties.value = setSymbol("\n");
              this._triggerEvent("oninput");
            });

            break;
          case "space":
            button.classList.add("keyboard__key--extra-wide");
            button.innerHTML = icons("space_bar");
            button.setAttribute("data", key);
            button.addEventListener("click", () => {
              if (this.properties.volume) {
                new Audio("./audio/2.mp3").autoplay = true;
              }
              this.properties.value = setSymbol(" ");
              this._triggerEvent("oninput");
            });

            break;
          case "done":
            button.classList.add("keyboard__key--wide");
            button.innerHTML = icons("check_circle");
            button.setAttribute("data", key);
            button.addEventListener("click", () => {
              this.close();
              if (this.properties.volume) {
                new Audio("./audio/2.mp3").autoplay = true;
              }
              this._triggerEvent("onclose");
            });

            break;
          case "voice":
            button.classList.add("keyboard__key", "keyboard__key--dark");
            button.innerHTML = icons("mic_off");
            button.setAttribute("data", key);
            button.addEventListener("click", () => {
              this.properties.voice = !this.properties.voice;
              button.classList.toggle("keyboard__key--active");

              if (this.properties.voice) {
                button.innerHTML = icons("mic_none");
                let lang = this.properties.language ? "ru" : "en";
                this.recognition.lang = lang;
                this.recognition.interimResults = true;
                this.recognition.addEventListener("result", writeResult);
                this.recognition.addEventListener(
                  "end",
                  this.recognition.start
                );
                this.recognition.start();
              } else {
                button.innerHTML = icons("mic_off");
                this.recognition.removeEventListener("result", writeResult);
                this.recognition.removeEventListener(
                  "end",
                  this.recognition.start
                );
                this.recognition.stop();
              }
            });

            break;
          case "language":
            button.classList.add("keyboard__key--wide", "keyboard__key--dark");
            button.innerHTML = key;
            button.setAttribute("data", key);
            button.addEventListener("click", () => {
              this.properties.language = !this.properties.language;
              this.properties.volume = !this.properties.volume;
              let lang = this.properties.language ? "ru" : "en";
              this.recognition.lang = lang;
              if (this.properties.volume) {
                button.innerHTML = "ru";
                new Audio("./audio/2.mp3").autoplay = true;
              }
              document.querySelector(".keyboard__keys").remove();

              n = this.properties.language ? arr_ru : keyLayout;
              body.removeEventListener("keydown", getKeyboard);
              setLanguage();

              this._drawKeyboard();
            });

            break;
          case "sound":
            button.classList.add("keyboard__key", "keyboard__key--dark");
            button.innerHTML = icons("volume_off");
            button.setAttribute("data", key);
            button.addEventListener("click", () => {
              this.properties.volume = !this.properties.volume;
              if (this.properties.volume) {
                new Audio("./audio/2.mp3").autoplay = true;
              }
              if (this.properties.volume) {
                button.innerHTML = "";
                button.innerHTML = icons("volume_up");
              } else {
                button.innerHTML = icons("volume_off");
              }
            });

            break;
          case "back":
            button.classList.add("keyboard__key", "keyboard__key--dark");
            button.innerHTML = icons("arrow_back");
            button.setAttribute("data", key);
            button.addEventListener("click", () => {
              if (this.properties.volume) {
                new Audio("./audio/2.mp3").autoplay = true;
              }
              this._toggleBack();
            });

            break;

          case "prev":
            button.classList.add("keyboard__key", "keyboard__key--dark");
            button.innerHTML = icons("arrow_forward");
            button.setAttribute("data", key);
            button.addEventListener("click", () => {
              if (this.properties.volume) {
                new Audio("./audio/2.mp3").autoplay = true;
              }
              this._togglePrev();
            });

            break;

          default:
            this.properties.capsLock = false;
            this.properties.shiftBtn = false;
            button.textContent = n[key].toLowerCase();
            button.setAttribute("data", key);

            let arr = [")", "!", "@", "#", "$", "%", "^", "&", "*", "("];
            let arr2 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

            button.addEventListener("click", () => {
              if (this.properties.volume) {
                if (!this.properties.language) {
                  new Audio("./audio/6.mp3").autoplay = true;
                } else {
                  new Audio("./audio/3.mp3").autoplay = true;
                }
              }
              if (this.properties.capsLock && !this.properties.shiftBtn) {
                if (n[key] <= 9) {
                  if (n[key] == 0) {
                    this.properties.value = setSymbol("0");
                  } else {
                    this.properties.value = setSymbol(arr2[n[key]]);
                  }
                } else this.properties.value = setSymbol(n[key].toUpperCase());
              } else if (
                this.properties.shiftBtn &&
                !this.properties.capsLock
              ) {
                if (n[key] <= 9) {
                  if (n[key] == 0) {
                    this.properties.value = setSymbol(")");
                  } else {
                    this.properties.value = setSymbol(arr[n[key]]);
                  }
                } else this.properties.value = setSymbol(n[key].toUpperCase());
              } else if (this.properties.shiftBtn && this.properties.capsLock) {
                if (n[key] <= 9) {
                  if (n[key] == 0) {
                    this.properties.value = setSymbol(")");
                  } else this.properties.value = setSymbol(arr[n[key]]);
                } else this.properties.value = setSymbol(n[key].toLowerCase());
              } else {
                if (n[key] <= 9) {
                  if (n[key] == 0) {
                    this.properties.value = setSymbol("0");
                  } else this.properties.value = setSymbol(arr2[n[key]]);
                } else this.properties.value = setSymbol(n[key].toLowerCase());
              }

              this._triggerEvent("oninput");
            });
            break;
        }
        fragment.appendChild(button);
        if (insertLineBreak) fragment.appendChild(document.createElement("br"));
      });
    };
    getSymbolsFromVirtualKeyboard();
    setLanguage();

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    for (let key of this.elements.keys) {
      if (key.childElementCount === 0) {
        let text;

        if (this.properties.capsLock && !this.properties.shiftBtn) {
          text = key.textContent.toUpperCase();
        } else if (!this.properties.capsLock && this.properties.shiftBtn) {
          text = key.textContent.toUpperCase();
        } else text = key.textContent.toLowerCase();

        key.textContent = text;
      }
    }
  },

  _toggleShift() {
    this.properties.shiftBtn = !this.properties.shiftBtn;
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        let text;
        if (this.properties.shiftBtn && !this.properties.capsLock) {
          text = key.textContent.toUpperCase();
        } else if (!this.properties.shiftBtn && this.properties.capsLock) {
          text = key.textContent.toUpperCase();
        } else text = key.textContent.toLowerCase();

        key.textContent = text;
      }
    }

    let arr = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
    let arr2 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    for (let i = 3; i < 13; i++) {
      if (this.properties.shiftBtn) {
        this.elements.keys[i].textContent = arr[i - 3];
      } else {
        this.elements.keys[i].textContent = arr2[i - 3];
      }
    }
  },

  _toggleBack() {
    let txt = document.querySelector(".use-keyboard-input");
    let end = txt.selectionEnd;

    return (txt.selectionEnd = end - 1);
  },
  _togglePrev() {
    let txt = document.querySelector(".use-keyboard-input");
    let end = txt.selectionEnd;

    return (txt.selectionStart = end + 1);
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  },
};

keyboard.init();
