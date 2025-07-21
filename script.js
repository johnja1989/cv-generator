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

  doc.setFontSize(16);
  doc.text("Currículum Vitae", 20, 20);
  doc.setFontSize(12);
  doc.text(`Nombre: ${nombre}`, 20, 35);
  doc.text(`Correo: ${correo}`, 20, 45);
  doc.text(`Profesión: ${profesion}`, 20, 55);
  doc.text("Resumen Profesional:", 20, 65);
  doc.text(doc.splitTextToSize(perfil, 170), 20, 73);

  let y = 73 + doc.getTextDimensions(doc.splitTextToSize(perfil, 170)).h + 10;
  doc.text("Experiencia Laboral:", 20, y);
  y += 8;
  doc.text(doc.splitTextToSize(experiencia, 170), 20, y);
  y += doc.getTextDimensions(doc.splitTextToSize(experiencia, 170)).h + 5;

  doc.text("Educación:", 20, y);
  y += 8;
  doc.text(doc.splitTextToSize(educacion, 170), 20, y);
  y += doc.getTextDimensions(doc.splitTextToSize(educacion, 170)).h + 5;

  doc.text(`LinkedIn: ${linkedin}`, 20, y + 10);

  // APLICAR MARCA DE AGUA REPETIDA EN TODAS LAS PÁGINAS
  const totalPages = doc.internal.getNumberOfPages();
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.06 }));
    doc.setFontSize(22);
    doc.setTextColor(150);
    doc.setFont("helvetica", "bold");

    // Repetir patrón diagonal
    for (let x = -50; x < width + 100; x += 80) {
      for (let y = -50; y < height + 100; y += 60) {
        doc.text("Marca de Agua", x, y, {
          angle: 45
        });
      }
    }

    doc.restoreGraphicsState();
  }

  doc.save(`${nombre.replace(/\s+/g, "_")}_CV.pdf`);
});
