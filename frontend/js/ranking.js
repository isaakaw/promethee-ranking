let ranking = null;
let chart = null;

function updateRanking(ranking) {
  const rankingList = document.getElementById("rankingList");
  rankingList.innerHTML = "";

  ranking.forEach(([alt, fluxo], index) => {
    const li = document.createElement("li");
    li.textContent = `${
      index + 1
    }º lugar - Alternativa ${alt} (Fluxo: ${fluxo.toFixed(4)})`;
    rankingList.appendChild(li);
  });

  document.getElementById("container-graphic").classList.remove("oculto");

  drawChart("bar");
}

function drawChart(type) {
  if (!ranking) return;

  const labels = ranking.map((item) => "Alternativa " + item[0]);
  const valores = ranking.map((item) => item[1]);

  const ctx = document.getElementById("rankingChart");

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: "Score PROMETHEE",
          data: valores,
          backgroundColor: '#004f4c80',
           borderColor: '#004f4cd8',
        },
      ],
    },
  });
}

function clearRanking() {
  ranking = null;

  const rankingList = document.getElementById("rankingList");
  rankingList.innerHTML = "";

  if (chart) {
    chart.destroy();
    chart = null;
  }

  document.getElementById("container-graphic").classList.add("oculto");
}