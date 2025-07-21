document.getElementById("form-cv").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const profesion = document.getElementById("profesion").value;
  const perfil = document.getElementById("perfil").value;
  const experiencia = document.getElementById("experiencia").value;
  const educacion = document.getElementById("educacion").value;
  const linkedin = document.getElementById("linkedin").value;

  const contenido = document.createElement("div");
  contenido.style.padding = "30px";
  contenido.innerHTML = `
    <h1>${nombre}</h1>
    <p><strong>Correo:</strong> ${correo}</p>
    <p><strong>Profesión:</strong> ${profesion}</p>
    <h2>Resumen Profesional</h2>
    <p>${perfil}</p>
    <h2>Experiencia Laboral</h2>
    <p>${experiencia}</p>
    <h2>Educación</h2>
    <p>${educacion}</p>
    <p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>
  `;

  // Marca de agua diagonal
  const watermarkCanvas = document.createElement("canvas");
  watermarkCanvas.width = 400;
  watermarkCanvas.height = 400;
  const ctx = watermarkCanvas.getContext("2d");
  ctx.translate(watermarkCanvas.width / 2, watermarkCanvas.height / 2);
  ctx.rotate(-Math.PI / 4);
  ctx.font = "30px Arial";
  ctx.fillStyle = "rgba(150, 150, 150, 0.2)";
  ctx.textAlign = "center";
  ctx.fillText("CV GENERADO GRATIS", 0, 0);
  const watermarkDataURL = watermarkCanvas.toDataURL("image/png");

  contenido.style.backgroundImage = `url(${watermarkDataURL})`;
  contenido.style.backgroundRepeat = "repeat";

  const opciones = {
    margin: 0,
    filename: "cv_generado.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opciones).from(contenido).save();
});
