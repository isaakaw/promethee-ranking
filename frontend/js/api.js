async function sendData() {
  const savedListBody = document.getElementById("savedListsBody");
  if (savedListBody.rows.length === 0) {
    showMessage("Não há alternativas salvas para calcular o ranking.", "error");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/rank");
    ranking = await response.json();
    if (!response.ok)
      throw new Error(ranking.error || "Erro ao buscar ranking.");

    updateRanking(ranking);
    showMessage("Ranking calculado!", "success");


  } catch (error) {
    showMessage("Erro: " + error.message, "error");
  }
}

async function loadSavedLists() {
  try {
    const response = await fetch("http://127.0.0.1:5000/listas");
    if (!response.ok) throw new Error("Falha ao carregar listas.");

    const listas = await response.json();
    const savedListBody = document.getElementById("savedListsBody");
    savedListBody.innerHTML = "";

    let num = 0;

    listas.forEach(({ id, valores }) => {
      const row = savedListBody.insertRow();
      row.id = `list-row-${id}`;
      num++;

      row.insertCell(0).textContent = num;

      valores.forEach((valor, index) => {
        row.insertCell(index + 1).textContent = valor;
      });

      const actionCell = row.insertCell(valores.length + 1);
      const btn = document.createElement("button");
      btn.textContent = "Apagar";
      btn.className = "delete-btn";
      btn.type = "button";
      btn.onclick = () => deleteList(id);
      actionCell.appendChild(btn);
    });
    updateRankingButton()
  } catch (error) {
    showMessage(error.message, "error");
  }
}

async function deleteList(id) {
  const result = await Swal.fire({
    title: "Tem certeza?",
    text: `Você realmente deseja apagar a alternativa com ID ${id}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, apagar!",
    cancelButtonText: "Cancelar",
  });
  if (result.isConfirmed) {
    try {
      const response = await fetch(`http://127.0.0.1:5000/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Falha ao apagar a alternativa.");
      const rowToRemove = document.getElementById(`list-row-${id}`);

      await Swal.fire({
        title: "Apagado!",
        text: "A alternativa foi removida com sucesso.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });

      if (rowToRemove) {
        rowToRemove.remove();
      }

      clearRanking()

      loadSavedLists();
    } catch (error) {
      await Swal.fire("Erro!", error.message, "error");
    }
  }
}

async function deleteAllLists() {
  Swal.fire({
    title: "CUIDADO! AÇÃO IRREVERSÍVEL!",
    text: "Você tem certeza que deseja apagar TODAS as alternativas? Esta ação não pode ser desfeita.",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sim, apagar TUDO!",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch("http://127.0.0.1:5000/delete_all", {
          method: "DELETE",
        });
        if (!response.ok)
          throw new Error("Falha ao apagar todas as alternativas.");

        document.getElementById("savedListsBody").innerHTML = "";
        document.getElementById("rankingList").innerHTML = "";

        Swal.fire(
          "Tudo Apagado!",
          "Todas as alternativas foram removidas.",
          "success",
        );
        clearRanking()
        updateRankingButton();
      } catch (error) {
        Swal.fire("Erro!", error.message, "error");
      }
    }
  });
}

async function addList(event) {
  event.preventDefault();
  const numbers = [];
  for (let i = 1; i <= 5; i++) {
    const value = document.getElementById(`num${i}`).value;
    if (value === "") {
      showMessage("Preencha todos os campos!", "error");
      return;
    }
    const num = parseFloat(value);
    if (isNaN(num)) {
      showMessage(`Valor inválido no Critério ${i}.`, "error");
      return;
    }
    numbers.push(num);
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(numbers),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erro ao salvar.");

    document.getElementById("numberForm").reset();
    showMessage("Alternativa salva com sucesso!", "success");
    clearRanking()
    loadSavedLists();
  } catch (error) {
    showMessage(error.message, "error");
  }
}