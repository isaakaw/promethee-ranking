document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("numberForm");
  const inputContainer = document.getElementById("inputs");

  document.getElementById("container-graphic").classList.add("oculto");

  for (let i = 1; i <= 5; i++) {
    const label = document.createElement("label");
    label.textContent = `Critério ${i}:`;

    const input = document.createElement("input");
    input.type = "number";
    input.step = "0.01";
    input.required = true;
    input.id = `num${i}`;
    input.placeholder = `Valor para o critério ${i}`;

    inputContainer.appendChild(label);
    inputContainer.appendChild(input);
  }

  form.addEventListener("submit", addList);

  loadSavedLists();

});