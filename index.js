const input = document.querySelector("#input");
const format = document.querySelector("#format");
const copy = document.querySelector("#copy");
format.addEventListener("click", (el) => {
  const value = input.value.split("\n");
  input.value = "";
  value.map((el) => (input.value += JSON.stringify(el) + "\n"));
});
// permission clipboard
navigator.permissions
  .query({ name: "clipboard-write" })
  .then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
      copy.addEventListener("click", () => {
        const newClip = input.value;
        navigator.clipboard.writeText(newClip);
        alert("Seu texto foi copiado!");
      });
    } else {
      alert("Seu navegador não permite a ação de copiar!");
    }
  });