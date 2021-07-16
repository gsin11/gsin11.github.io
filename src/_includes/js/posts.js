const COUNTER_BASE_URL = "https://api-gsin-in.vercel.app";

function getLoveCount() {
  const url = window.location.pathname.split("/blog/");
  const slug = url[1]?.replace(".html", "");

  if (slug) {
    fetch(`${COUNTER_BASE_URL}/api/counter/${slug}`, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    })
      .then((res) => res.json())
      .then((response) => {
        setSessionStorage(response.slug, response.count);
      })
      .catch((err) => console.log(err));
  }
}

(() => {
  getLoveCount();
})();
