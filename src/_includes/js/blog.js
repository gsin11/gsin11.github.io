const SESSION_VAR = "gsin_in_love_count";

function updateCount(data) {
  const parsed = JSON.parse(data);
  parsed.map((obj) => {
    document.getElementById(obj.slug).innerText = `${obj.count} Lovers`;
  });
}

function setLoveCount() {
  const isAvailable = getSessionStorage(SESSION_VAR);

  if (isAvailable) {
    updateCount(isAvailable);
  } else {
    fetch(`${COUNTER_BASE_URL}/api/counters`)
      .then((res) => res.json())
      .then((response) => {
        setSessionStorage(SESSION_VAR, response, true);
        setTimeout(() => {
          updateCount(getSessionStorage(SESSION_VAR));
        }, 1000);
      })
      .catch((err) => console.log(err));
  }
}

(() => {
  setLoveCount();
})();
