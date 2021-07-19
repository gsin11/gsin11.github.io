const COUNTER_BASE_URL = "https://api.gsin.in";
const url = window.location.pathname.split("/blog/");
const SLUG = url[1]?.replace(".html", "");

function getLoveCount(key) {
  return getSessionStorage(key);
}

function setLoveCount($loveCount) {
  if (SLUG) {
    const isAvailable = getLoveCount(SLUG);
    if (isAvailable) {
      $loveCount.innerText = isAvailable;
    } else {
      fetch(`${COUNTER_BASE_URL}/api/counter/${SLUG}`)
        .then((res) => res.json())
        .then((response) => {
          setSessionStorage(response.slug, response.count);
          $loveCount.innerText = response.count;
        })
        .catch((err) => console.log(err));
    }
  }
}

(() => {
  const loveCount = document.getElementById("loveCount");
  const toggleHeart = document.getElementById("toggle-heart");
  setLoveCount(loveCount);
  toggleHeart.addEventListener("change", (e) => {
    if (e.target.checked) {
      fetch(`${COUNTER_BASE_URL}/api/counter/${SLUG}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.ok) {
            const newCount = +getLoveCount(SLUG) + 1;
            setSessionStorage(SLUG, newCount);
            loveCount.innerText = newCount;
          } else {
            console.log(`error in fetch data`);
          }
        })
        .catch((err) => console.log(err));
    } else {
      // Uncheck is pending
    }
  });
})();
