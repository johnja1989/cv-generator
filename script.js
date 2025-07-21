document.getElementById('form-cv').addEventListener('submit', function (e) {
  e.preventDefault();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const profesion = document.getElementById('profesion').value;
  const perfil = document.getElementById('perfil').value;
  const experiencia = document.getElementById('experiencia').value;
  const educacion = document.getElementById('educacion').value;
  const linkedin = document.getElementById('linkedin').value;

  const texto = `
Nombre: ${nombre}
Correo: ${correo}
Profesión: ${profesion}

Resumen Profesional:
${perfil}

Experiencia Laboral:
${experiencia}

Educación:
${educacion}

LinkedIn: ${linkedin}
`;

  const lineas = doc.splitTextToSize(texto, 180);
  let y = 20;
  doc.setFontSize(12);
  lineas.forEach(linea => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text(linea, 15, y);
    y += 7;
  });

  const img = new Image();
  img.src = 'img/watermark.png';
  img.onload = () => {
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      for (let x = -50; x < 250; x += 100) {
        for (let y = -50; y < 350; y += 100) {
          doc.saveGraphicsState();
          doc.setGState(new doc.GState({ opacity: 0.1 }));
          doc.addImage(img, 'PNG', x, y, 100, 100, undefined, 'FAST', 45);
          doc.restoreGraphicsState();
        }
      }
    }

    doc.save(`${nombre.replace(/ /g, '_')}_CV.pdf`);
  };
});
