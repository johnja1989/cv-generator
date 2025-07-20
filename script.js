document.getElementById("generate").addEventListener("click", () => {
  // Obtener los datos
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const profesion = document.getElementById("profesion").value;
  const perfil = document.getElementById("perfil").value;
  const experiencia = document.getElementById("experiencia").value;
  const educacion = document.getElementById("educacion").value;
  const linkedin = document.getElementById("linkedin").value;

  // Rellenar plantilla
  document.getElementById("cv-nombre").textContent = nombre;
  document.getElementById("cv-correo").textContent = correo;
  document.getElementById("cv-profesion").textContent = profesion;
  document.getElementById("cv-perfil").textContent = perfil;
  document.getElementById("cv-experiencia").textContent = experiencia;
  document.getElementById("cv-educacion").textContent = educacion;
  document.getElementById("cv-linkedin").innerHTML = linkedin
    ? `<strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a>`
    : "";

  const cv = document.getElementById("cv-preview");
  cv.style.display = "block";

  const opt = {
    margin: 0.5,
    filename: 'mi_curriculum.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(cv).save();

  setTimeout(() => {
    cv.style.display = "none";
  }, 2000);
});
