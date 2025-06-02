
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("taxiForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    calculate();
  });

  function calculate() {
    const name = document.getElementById("driverName").value.trim();
    const trzba = parseFloat(document.getElementById("trzba").value);
    const km = parseFloat(document.getElementById("km").value);
    const palivo = parseFloat(document.getElementById("palivo").value);
    const myti = parseFloat(document.getElementById("myti").value);
    const kartou = parseFloat(document.getElementById("kartou").value);
    const fakturou = parseFloat(document.getElementById("fakturou").value);
    const pristavne = parseFloat(document.getElementById("pristavne").value);
    const smena = document.getElementById("typSměny").value;

    if (!name || isNaN(trzba) || isNaN(km)) {
      alert("Zadejte prosím jméno řidiče, platnou tržbu a kilometry.");
      return;
    }

    let trzbaPoOdpoctech = trzba - palivo - myti - kartou - fakturou;
    let vyplata = 0;
    let doplatek = 0;
    let minimalni = smena === "pul" ? 500 : 1000;

    if (trzba >= 3330) {
      vyplata = 0.3 * (trzba - pristavne);
      if (smena === "pul" && vyplata < 500) vyplata = 500;
      if (smena !== "pul" && vyplata < 1000) vyplata = 1000;
    } else {
      vyplata = minimalni;
    }

    if (trzba < km * 15) {
      doplatek = parseFloat((km * 15 - trzba).toFixed(2));
    }

    let odevzdani = trzbaPoOdpoctech - vyplata;

    const result = {
      ridic: name,
      smena: smena,
      trzba: trzba.toFixed(2),
      palivo: palivo.toFixed(2),
      myti: myti.toFixed(2),
      kartou: kartou.toFixed(2),
      fakturou: fakturou.toFixed(2),
      pristavne: pristavne.toFixed(2),
      jine,
      vyplata: vyplata.toFixed(2),
      kOdevzdani: odevzdani.toFixed(2),
      doplatek: doplatek
    };

    localStorage.setItem("taxiResult", JSON.stringify(result));
    window.location.href = "vysledek.html";
  }
});
