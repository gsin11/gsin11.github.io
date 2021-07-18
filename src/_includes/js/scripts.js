function setLocalStorage(name, value, doStringify) {
  if (window.localStorage) {
    window.localStorage.setItem(
      name,
      doStringify ? JSON.stringify(value) : value
    );
  }
}

function getLocalStorage(name) {
  if (window.localStorage) {
    return window.localStorage.getItem(name);
  }
  return undefined;
}

function setSessionStorage(name, value, doStringify) {
  if (window.sessionStorage) {
    window.sessionStorage.setItem(
      name,
      doStringify ? JSON.stringify(value) : value
    );
  }
}

function getSessionStorage(name) {
  if (window.sessionStorage) {
    return window.sessionStorage.getItem(name);
  }
  return undefined;
}

function bootstrapTheme() {
  let defaultMode = "light";
  let mode = getLocalStorage("mode");

  if (!mode) {
    setLocalStorage("mode", defaultMode);
    mode = defaultMode;
  }

  const modeBtn = document.getElementsByClassName("toggleMode")[0];
  modeBtn.dataset.theme = mode;
  document.body.classList.add(mode);

  modeBtn.addEventListener("click", (event) => {
    const currentTheme = event.target.dataset.theme;
    event.target.dataset.theme = currentTheme === "dark" ? "light" : "dark";

    setLocalStorage("mode", event.target.dataset.theme);
    document.body.classList.remove(currentTheme);
    document.body.classList.add(event.target.dataset.theme);
  });
}

(() => {
  bootstrapTheme();
})();
