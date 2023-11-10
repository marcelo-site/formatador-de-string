const nome = document.querySelector("#name");
const prefix = document.querySelector("#prefix");
const format = document.querySelector("#format");
const copy = document.querySelector("#copy");
const empty = document.querySelector("#empty");
const radios = document.querySelectorAll('input[name="var"]');
const desc = document.querySelector("#desc");
const bodyInput = document.querySelector("#input");
const msg = document.querySelector("#msg");
const bodyOutput = document.querySelector("#output textarea");
const copyCheck = document.querySelector("#copy-check");

radios.forEach((radio) => {
  radio.addEventListener("change", (el) => {
    if (el.target.checked) {
      bodyInput.value =
        bodyInput.value.substring(0, bodyInput.selectionStart) +
        el.target.value +
        bodyInput.value.substring(bodyInput.selectionEnd);
      setTimeout(() => (el.target.checked = false), 1000);
    }
  });
});

const isnert = (param) => {
  bodyInput.value = param;
};

let str = "";
const formatsnippet = () => {
  if (!!nome && !!prefix && !!desc && !!bodyInput.value) {
    const value = bodyInput.value.split("\n");
    const nomeStr = '"' + nome.value + '": {\n';
    const prefixStr = '\t"prefix": "' + prefix.value + '",\n';
    const bodyStr =
      '\t"body" : [\n' + value.map((el) => "\t\t" + JSON.stringify(el) + ",\n");
    const descriptionStr =
      "\t]," + '\n\t"description": "' + desc.value + '",\n},';
    const newClip =
      nomeStr +
      prefixStr +
      bodyStr.split("\n").join("\n").replace(/\,\t/g, "\t") +
      descriptionStr;
    return newClip;
  } else {
    alert("Está faltando algo!");
  }
};

format.addEventListener("click", () => {
  const newClip = formatsnippet();
  bodyOutput.value = newClip;
});

// function clipboard
copy.addEventListener("click", () => {
  if (!!nome && !!prefix && !!desc && !!bodyInput.value) {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        const newClip = bodyOutput.value;
        navigator.clipboard.writeText(newClip);
      } else {
        alert(
          "Seu navegador não permite a ação de copiar, faça sua copia do quadro de texto!"
        );
      }
    });
  } else {
    alert("Está faltando alguma informacão!");
  }
  copyCheck.style.display = "block";
  msg.style.display = "block";

  setTimeout(() => {
    copyCheck.style.display = "none";
    msg.style.display = "none";
  }, 3000);
});

empty.addEventListener("click", () => {
  nome.value = "";
  prefix.value = "";
  desc.value = "";
  bodyInput.value = "";
  bodyOutput.value = "";
  radios.forEach((el) => (el.checked = false));
});
