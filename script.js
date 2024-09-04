const studentNameInput = document.getElementById('studentName');
const addStudentBtn = document.getElementById('addStudentBtn');
const studentList = document.getElementById('studentList');
const filterInput = document.getElementById('filter');
const sortBtn = document.getElementById('sortBtn');

let students = JSON.parse(localStorage.getItem('students')) || [];

// Para mostrar estudiantes
function displayStudents(filteredStudents = students) {
    studentList.innerHTML = '';
    filteredStudents.forEach((student, index) => {
        const li = document.createElement('li');
        li.textContent = student;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.onclick = () => deleteStudent(index);
        li.appendChild(deleteBtn);
        studentList.appendChild(li);
    });
}

// Agregar un estudiante
addStudentBtn.addEventListener('click', () => {
    const studentName = studentNameInput.value.trim();
    if (studentName) {
        students.push(studentName);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
        studentNameInput.value = '';
    }
});

// Eliminar un estudiante
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

// Para poder filtrarlos
filterInput.addEventListener('input', () => {
    const filterText = filterInput.value.toLowerCase();
    const filteredStudents = students.filter(student => student.toLowerCase().includes(filterText));
    displayStudents(filteredStudents);
});

// Ordenar a los estudiantes
sortBtn.addEventListener('click', () => {
    students.sort();
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
});

let isAscending = true; 

sortBtn.addEventListener('click', () => {
    students.sort((a, b) => {
        if (isAscending) {
            return a.localeCompare(b);
        } else {
            return b.localeCompare(a);
        }
    });
    isAscending = !isAscending; // Esto es para que cambie el sentido del orden
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
});

displayStudents();
