const cursos = {
  "Biologia General II": ["Biologia General"],
  "Bioestadística y Demografía I": ["Matematica Basica"],
  "Inglés Introductorio De Ciencias De La Salud II": ["Inglés Introductorio De Ciencias De La Salud I"],
  "Quimica General II": ["Quimica General I"],
  "Bioestadística y Demografía II": ["Bioestadística y Demografía I"],
  "Biologia Molecular": ["Biologia General II"],
  "Fisica Basica II": ["Fisica Basica I"],
  "Informática Para Ciencias De La Salud": ["Informatica Basica y Cultural"],
  "Raíces Griegas y Latinas": ["Lengua Española y Tecnica de la Expresión II"],
  "Química Orgánica I": ["Quimica General II"],
  "Biofisica": ["Fisica Basica II"],
  "Inglés Técnico De Ciencias De La Salud II": ["Inglés Técnico De Ciencias De La Salud"],
  "Química Orgánica II": ["Química Orgánica I"],
  "Anatomía Integrada II": ["Anatomía Integrada I"],
  "Ciencias del Comportamiento": ["Bioética Médica"],
  "Introducción a las Ciencias Básicas II": ["Introducción a las Ciencias Básicas I"],
  "Microbiologia y Parasitologia": ["Bioquimica y Genetica"],
  "Ciencias Básicas por Sistemas I": ["Anatomía Integrada II", "Ciencias del Comportamiento", "Introducción a las Ciencias Básicas II", "Microbiologia y Parasitologia"],
  "Epidemiología": ["Ciencias Básicas por Sistemas I"],
  "Semiología I": ["Ciencias Básicas por Sistemas I"],
  "Ciencias Básicas por Sistemas II": ["Ciencias Básicas por Sistemas I"],
  "Medicina Preventiva": ["Epidemiología"],
  "Semiología II": ["Semiología I"],
  "Administracion y Legislacion Sanitaria": ["Medicina Preventiva"],
  "Ciencias Básicas por Sistemas III": ["Ciencias Básicas por Sistemas II"],
  "Revisión Integrada y Preparación Para Los Exámenes de Reválida Y el Ciclo Clínico": ["Ciencias Básicas por Sistemas II", "Medicina Preventiva", "Semiología II"],
  "Soporte Básico De Vida": ["Semiología II"],
  "Patología Médica I": ["Administracion y Legislacion Sanitaria","Ciencias Básicas por Sistemas III","Revisión Integrada y Preparación Para Los Exámenes de Reválida Y el Ciclo Clínico","Soporte Básico De Vida","Anatomía Integrada II","Ciencias del Comportamiento","Introducción a las Ciencias Básicas II","Microbiologia y Parasitologia","Epidemiología","Semiología I"],
  "Patología Médica II": ["Patología Médica I"],
  "Patología Quirúrgica": ["Patología Médica II"],
  "Ginecología y Obstetricia": ["Patología Quirúrgica"],
  "Neonatología": ["Patología Quirúrgica"],
  "Pediatría": ["Patología Quirúrgica"],
  "Psiquiatría": ["Patología Quirúrgica"],
  "Clinica Medica": ["Ginecología y Obstetricia","Neonatología","Pediatría","Psiquiatría"],
  "Clinica Pediatrica": ["Ginecología y Obstetricia","Neonatología","Pediatría","Psiquiatría"],
  "Clinica Psiquiatrica": ["Clinica Medica","Clinica Pediatrica"],
  "Clinica Quirurgica": ["Clinica Medica","Clinica Pediatrica"],
  "Electiva VI": ["Clinica Medica","Clinica Pediatrica"],
  "Clinica Gineco-Obtetrica": ["Clinica Quirurgica"],
  "Medicina Social o Familiar": ["Clinica Quirurgica"],
  "Trabajo de Grado": ["Clinica Quirurgica"]
};

const aulas = [
  "Educacion Constitucional","Biologia General","Electiva I","Historia Ciencias De La Salud y Sociología Médica",
  "Historia De La Cultura Universal","Lengua Española y Tecnica de la Expresión II","Matematica Basica","Orientación Universitaria","Orientación Médica",
  "Inglés Introductorio De Ciencias De La Salud I","Quimica General I","Bioestadística y Demografía I","Biologia General II","Electiva II",
  "Fisica Basica I","Informatica Basica y Cultural","Inglés Introductorio De Ciencias De La Salud II","Raíces Griegas y Latinas",
  "Quimica General II","Bioestadística y Demografía II","Biologia Molecular","Electiva III","Electiva IV","Fisica Basica II",
  "Inglés Técnico De Ciencias De La Salud","Psicologia General","Química Orgánica I","Biofisica","Electiva V","Historia Dominicana",
  "Informática Para Ciencias De La Salud","Inglés Técnico De Ciencias De La Salud II","Psicologia Aplicada","Química Orgánica II",
  "Anatomía Integrada I","Bioética Médica","Bioquimica y Genetica","Introducción a las Ciencias Básicas I",
  "Anatomía Integrada II","Ciencias del Comportamiento","Introducción a las Ciencias Básicas II","Microbiologia y Parasitologia",
  "Ciencias Básicas por Sistemas I","Epidemiología","Semiología I","Ciencias Básicas por Sistemas II","Medicina Preventiva",
  "Semiología II","Administracion y Legislacion Sanitaria","Ciencias Básicas por Sistemas III",
  "Revisión Integrada y Preparación Para Los Exámenes de Reválida Y el Ciclo Clínico",
  "Soporte Básico De Vida","Patología Médica I","Patología Médica II","Patología Quirúrgica",
  "Ginecología y Obstetricia","Neonatología","Pediatría","Psiquiatría","Clinica Medica","Clinica Pediatrica",
  "Clinica Psiquiatrica","Clinica Quirurgica","Electiva VI","Clinica Gineco-Obtetrica","Medicina Social o Familiar","Trabajo de Grado"
];

const grid = document.getElementById('grid');

let aprobados = JSON.parse(localStorage.getItem('aprobados')) || {};

function puedeAprobar(curso) {
  const reqs = cursos[curso];
  if (!reqs) return true;
  return reqs.every(r => aprobados[r]);
}

function render() {
  grid.innerHTML = '';
  aulas.forEach(curso => {
    const div = document.createElement('div');
    div.textContent = curso;
    div.className = 'cell';
    if (aprobados[curso]) {
      div.classList.add('approved');
    } else if (!puedeAprobar(curso)) {
      div.classList.add('locked');
    }
    div.addEventListener('click', () => {
      if (!puedeAprobar(curso)) return;
      aprobados[curso] = !aprobados[curso];
      localStorage.setItem('aprobados', JSON.stringify(aprobados));
      render();
    });
    grid.appendChild(div);
  });
}

render();

