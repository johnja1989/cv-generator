document.getElementById("form-cv").addEventListener("submit", async function (e) {
  e.preventDefault();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const profesion = document.getElementById("profesion").value;
  const perfil = document.getElementById("perfil").value;
  const experiencia = document.getElementById("experiencia").value;
  const educacion = document.getElementById("educacion").value;
  const linkedin = document.getElementById("linkedin").value;
  const codigo = document.getElementById("codigoAcceso").value.trim();

  const esPremium = codigo === "CVVIP2025"; // Código de acceso

  // Marca de agua si no es premium
  if (!esPremium) {
    doc.setTextColor(180);
    doc.setFontSize(40);
    doc.text("Generado por CV-GENERATOR", 105, 150, {
      angle: 45,
      align: 'center',
    });
  }

  doc.setFontSize(12);
  doc.setTextColor(0);
  let y = 30;
  doc.text(`Nombre: ${nombre}`, 20, y); y += 10;
  doc.text(`Correo: ${correo}`, 20, y); y += 10;
  doc.text(`Profesión: ${profesion}`, 20, y); y += 10;
  doc.text("Resumen Profesional:", 20, y); y += 10;
  const perfilLines = doc.splitTextToSize(perfil, 160);
  doc.text(perfilLines, 20, y); y += perfilLines.length * 10;

  doc.text("Experiencia Laboral:", 20, y); y += 10;
  const expLines = doc.splitTextToSize(experiencia, 160);
  doc.text(expLines, 20, y); y += expLines.length * 10;

  doc.text("Educación:", 20, y); y += 10;
  const eduLines = doc.splitTextToSize(educacion, 160);
  doc.text(eduLines, 20, y); y += eduLines.length * 10;

  doc.text(`LinkedIn: ${linkedin}`, 20, y);

  doc.save("mi_curriculum.pdf");
});
