// this is terrible dont look

const url = `https://api.ashcon.app/mojang/v2/user/`;
const root = document.querySelector("#root");
const btn = document.querySelector("button");
const inp = document.querySelector("input");

let usernames = JSON.parse(localStorage.getItem("usernames")) || ["erm"];

btn.addEventListener("click", () => {
  if (usernames.includes(inp.value)) alert("Username already added!");
  else if (confirm(`do you want to add name "${inp.value}"?`)) {
    localStorage.setItem(
      "usernames",
      JSON.stringify([...usernames, inp.value])
    );
    window.location.reload();
  }
});

const getNameData = async (name) => (res = await fetch(url + name));

const checkName = async (name) => {
  const response = await getNameData(name);
  if (response.status == 404) return "available";
  else {
    const data = await response.json();
    const timestamp = data.username_history.at(-1).changed_at || "";
    if (timestamp) {
      const date = timestamp.split("T")[0];
      const time = timestamp.split("T")[1].substr(0, 8);
      return date + " " + time;
    }
    return "unknown";
  }
};

const render = async () => {
  const promises = usernames.map(
    async (uname) =>
      `<tr><td>${uname}</td> <td class="info">${await checkName(
        uname
      )}</td></tr>`
  );
  const results = await Promise.all(promises);
  root.innerHTML = `<table><tr><th>Name</th><th>Last changed</th></tr>${results.join(
    ""
  )}</table>`;
  const rem = document.querySelectorAll("td.info");
  rem.forEach((el, i) => {
    if (el.innerHTML == "available") el.classList.add("available");
    else el.classList.add("unavailable");

    // remove util
    el.addEventListener("click", () => {
      let newNames = JSON.parse(localStorage.getItem("usernames")).filter(
        (_, j) => i !== j
      );
      localStorage.setItem("usernames", JSON.stringify([...newNames]));
      window.location.reload();
    });
  });
};

window.onload = render();
