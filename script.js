document.getElementById("generate").addEventListener("click", () => {
  // Obtener los valores del formulario
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const profesion = document.getElementById("profesion").value;
  const perfil = document.getElementById("perfil").value;

  // Insertar los valores en la vista previa
  document.getElementById("cv-nombre").textContent = nombre;
  document.getElementById("cv-correo").textContent = correo;
  document.getElementById("cv-profesion").textContent = profesion;
  document.getElementById("cv-perfil").textContent = perfil;

  // Mostrar la vista previa (por si estaba oculta)
  const cv = document.getElementById("cv-preview");
  cv.style.display = "block";

  // Configurar y generar el PDF
  const opt = {
    margin: 0.5,
    filename: 'mi_curriculum.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(cv).save();

  // Ocultar la vista previa después de generar el PDF
  setTimeout(() => {
    cv.style.display = "none";
  }, 2000);
});
