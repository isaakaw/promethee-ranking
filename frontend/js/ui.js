function updateRankingButton() {
  const btn = document.getElementById("calculateRanking");
  const rows = document.getElementById("savedListsBody").rows.length;

  btn.disabled = rows < 2;
}

function showMessage(text, type = "success") {
  const message = document.getElementById("message");
  message.textContent = text;
  message.className = `show ${type}`;
  setTimeout(() => {
    message.className = "";
  }, 3000);
}