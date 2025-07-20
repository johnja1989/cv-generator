document.getElementById("form-cv").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const profesion = document.getElementById("profesion").value;
  const perfil = document.getElementById("perfil").value;
  const experiencia = document.getElementById("experiencia").value;
  const educacion = document.getElementById("educacion").value;
  const linkedin = document.getElementById("linkedin").value;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(16);
  doc.text(`Nombre: ${nombre}`, 20, y); y += 10;
  doc.text(`Correo: ${correo}`, 20, y); y += 10;
  doc.text(`Profesión: ${profesion}`, 20, y); y += 10;
  doc.setFontSize(14);
  doc.text("Resumen Profesional:", 20, y); y += 8;
  doc.setFontSize(12);
  y = addMultilineText(doc, perfil, y);

  doc.setFontSize(14);
  doc.text("Experiencia Laboral:", 20, y); y += 8;
  doc.setFontSize(12);
  y = addMultilineText(doc, experiencia, y);

  doc.setFontSize(14);
  doc.text("Educación:", 20, y); y += 8;
  doc.setFontSize(12);
  y = addMultilineText(doc, educacion, y);

  doc.setFontSize(14);
  doc.text("LinkedIn:", 20, y); y += 8;
  doc.setFontSize(12);
  doc.text(linkedin, 20, y); y += 10;

  // Cargar imagen marca de agua
  const img = new Image();
  img.src = "img/watermark.png";
  img.onload = function () {
    doc.addImage(img, "PNG", 45, 130, 120, 120, "", "FAST");
    doc.save("curriculum_con_marca_de_agua.pdf");
  };
  img.onerror = function () {
    alert("No se pudo cargar la imagen de la marca de agua.");
  };
});

// Función para texto multilínea y control de salto vertical
function addMultilineText(doc, text, startY) {
  const lines = doc.splitTextToSize(text, 170);
  doc.text(lines, 20, startY);
  return startY + lines.length * 7;
}
