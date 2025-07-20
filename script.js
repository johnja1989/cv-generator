document.getElementById("cv-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const profession = document.getElementById("profession").value;
  const about = document.getElementById("about").value;

  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text(name, 20, 30);
  doc.setFontSize(16);
  doc.text(profession, 20, 50);
  doc.setFontSize(12);
  doc.text("Sobre mí:", 20, 70);
  doc.text(about, 20, 80);

  // Marca de agua
  const img = new Image();
  img.src = "watermark.png";
  img.onload = function () {
    doc.addImage(img, "PNG", 50, 130, 100, 40);
    doc.save(`${name}_CV.pdf`);
  };
});
