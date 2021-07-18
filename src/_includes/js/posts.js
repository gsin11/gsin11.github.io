const COUNTER_BASE_URL = "https://api.gsin.in";
const url = window.location.pathname.split("/blog/");
const SLUG = url[1]?.replace(".html", "");

function getLoveCount($loveCount) {
  if (SLUG) {
    const isAvailable = getSessionStorage(SLUG);
    if (isAvailable) {
      $loveCount.innerText = isAvailable;
    } else {
      fetch(`${COUNTER_BASE_URL}/api/counter/${SLUG}`)
        .then((res) => res.json())
        .then((response) => {
          setSessionStorage(response.slug, response.count);
        })
        .catch((err) => console.log(err));
    }
  }
}

(() => {
  const loveCount = document.getElementById("loveCount");
  const toggleHeart = document.getElementById("toggle-heart");
  getLoveCount(loveCount);
  toggleHeart.addEventListener("change", (e) => {
    if (e.target.checked) {
      fetch(`${COUNTER_BASE_URL}/api/counter/${SLUG}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          // setSessionStorage(response.slug, response.count);
        })
        .catch((err) => console.log(err));
    } else {
    }
  });
})();
