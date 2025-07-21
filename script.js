document
  .getElementById("form-cv")
  .addEventListener("submit", async function (e) {
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

    // MARCA DE AGUA como texto diagonal en cada página
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setTextColor(150);
      doc.setFontSize(40);
      doc.setFont("helvetica", "bold");

      // Guardar estado antes de rotar
      doc.saveGraphicsState();
      doc.setGState(new doc.GState({ opacity: 0.08 })); // Transparencia

      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();

      doc.text("CV generado en JovaDev.com", width / 2, height / 2, {
        angle: 45,
        align: "center",
      });

      doc.restoreGraphicsState(); // Restaurar estado original
    }

    doc.save(`${nombre.replace(/\s+/g, "_")}_CV.pdf`);
  });
