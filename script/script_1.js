const fechaObjetivo = new Date("Dec 25, 2024 00:00:00").getTime();

const actualizarContador = setInterval(function () {
    const ahora = new Date().getTime();

    const distancia = fechaObjetivo - ahora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("dias").innerHTML = dias;
    document.getElementById("horas").innerHTML = horas;
    document.getElementById("minutos").innerHTML = minutos;
    document.getElementById("segundos").innerHTML = segundos;

}, 1000);

var logInModal = document.getElementById("logInModal");
var logInBtn = document.getElementById("logInBtn");
var closeLogInBtn = logInModal.getElementsByClassName("cerrar")[0];
var cancelLogInBtn = document.getElementById("cancelLogInBtn");

logInBtn.addEventListener("click", openLogInModal);
closeLogInBtn.addEventListener("click", closeLogInModal);
cancelLogInBtn.addEventListener("click", closeLogInModal);

function openLogInModal() {
    logInModal.style.display = "block";
}

function closeLogInModal() {
    logInModal.style.display = "none";
}

window.onclick = function (e) {
    if (e.target == logInModal) {
        closeLogInModal();
    }
};

var signUpModal = document.getElementById("signUpModal");
var signUpBtn = document.getElementById("signUpBtn");
var closeSignUpBtn = signUpModal.getElementsByClassName("cerrar")[0];
var cancelSignUpBtn = document.getElementById("cancelSignUpBtn");

signUpBtn.addEventListener("click", openSignUpModal);
closeSignUpBtn.addEventListener("click", closeSignUpModal);
cancelSignUpBtn.addEventListener("click", closeSignUpModal);

function openSignUpModal() {
    signUpModal.style.display = "block";
}

function closeSignUpModal() {
    signUpModal.style.display = "none";
}

window.onclick = function (e) {
    if (e.target == signUpModal) {
        closeSignUpModal();
    }
};

const signUpForm = document.getElementById('signUpForm');

// Sign-Up Form Submission
signUpForm.onsubmit = function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("passwordSignUp").value;
    const repetirPassword = document.getElementById("repetirPassword").value;
    const email = document.getElementById("email").value;
    const ciudad = document.getElementById("ciudad").value;
    const pais = document.getElementById("pais").value;

    if (!username || !password || !repetirPassword || !email || !ciudad || !pais) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }

    if (username.length < 3) {
        alert("El nombre de usuario debe tener al menos 3 caracteres.");
        return false;
    }

    if (password !== repetirPassword) {
        alert("Las contraseñas no coinciden.");
        return false;
    }

    if (password.length < 12) {
        alert("La contraseña debe tener al menos 12 caracteres. 2 números, 1 carácter especial, 1 letra mayúscula y 1 letra minúscula");
        return false;
    }

    if (ciudad.length < 3) {
        alert("La ciudad debe tener al menos 3 caracteres.");
        return false;
    }

    if (pais.length < 3) {
        alert("El país debe tener al menos 3 caracteres.");
        return false;
    }

    if (!validarCorreo(email)) {
        alert("El correo electrónico no es válido.");
        return false;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({
        username,
        password,
        email,
        ciudad,
        pais
    });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Registro correcto");
    signUpForm.reset();
};

function validarCorreo(correo) {
    const partes = correo.split("@");
    if (partes.length !== 2) return false;

    const dominioPartes = partes[1].split(".");
    if (dominioPartes.length < 2) return false;

    return true;
}

// Login Form Submission
document.getElementById("logInForm").onsubmit = function (event) {
    event.preventDefault();

    const username = document.getElementById("logInUsername").value;
    const password = document.getElementById("passwordLogIn").value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Inicio de sesión exitoso!');
        updateNavBar(user.username);
        closeLogInModal();
    } else {
        alert('Error: nombre de usuario o contraseña incorrectos.');
    }
};

function updateNavBar(username) {
    const botonesDiv = document.querySelector('.botones');
    const perfilDiv = document.querySelector('.perfil');

    botonesDiv.style.display = 'none';
    perfilDiv.style.display = 'block';

    document.getElementById("logoutBtn").addEventListener("click", function() {
        localStorage.removeItem('loggedInUser');
        location.reload();
    });

    localStorage.setItem('loggedInUser', username);
}

function closeLogInModal() {
    const logInModal = document.getElementById("logInModal");
    logInModal.style.display = "none";
}

window.onload = function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        updateNavBar(loggedInUser);
    }

    const hijosInput = document.getElementById('hijos');
    const detallesHijos = document.getElementById('detallesHijos');
    const hijoTemplate = document.querySelector('.hijoTemplate');

    hijosInput.onchange = function () {
        const numHijos = parseInt(hijosInput.value);
        detallesHijos.innerHTML = '';

        if (numHijos > 0) {
            for (let i = 0; i < numHijos; i++) {
                const hijoClone = hijoTemplate.cloneNode(true);
                hijoClone.style.display = 'block';
                hijoClone.querySelector('.nombreHijo').setAttribute('name', 'nombreHijo_' + i);
                hijoClone.querySelector('.edadHijo').setAttribute('name', 'edadHijo_' + i);
                hijoClone.querySelector('.juguetesFavoritos').setAttribute('name', 'juguetesFavoritos_' + i);

                detallesHijos.appendChild(hijoClone);
            }
        }
    };
// Manejo del dropdown de perfil
const profileIcon = document.getElementById("profileIcon");
const profileDropdown = document.getElementById("profileDropdown");
const miPerfil = document.getElementById("miPerfil");
const profileModal = document.getElementById("profileModal");
const closeProfileBtn = profileModal.getElementsByClassName("cerrar")[0];
const cancelProfileBtn = document.getElementById("cancelProfileBtn");

profileIcon.addEventListener("click", function() {
    profileDropdown.style.display = profileDropdown.style.display === "block" ? "none" : "block";
});

miPerfil.addEventListener("click", function() {
    openProfileModal();
    profileDropdown.style.display = "none";
});

closeProfileBtn.addEventListener("click", closeProfileModal);
cancelProfileBtn.addEventListener("click", closeProfileModal);

function openProfileModal() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === loggedInUser);

    if (user) {
        document.getElementById("editUsername").value = user.username;
        document.getElementById("editEmail").value = user.email;
        document.getElementById("editCiudad").value = user.ciudad;
        document.getElementById("editPais").value = user.pais;
    }

    profileModal.style.display = "block";
}

function closeProfileModal() {
    profileModal.style.display = "none";
}

window.onclick = function (e) {
    if (e.target == profileModal) {
        closeProfileModal();
    }
};

document.getElementById("profileForm").onsubmit = function (event) {
    event.preventDefault();

    const username = document.getElementById("editUsername").value;
    const email = document.getElementById("editEmail").value;
    const ciudad = document.getElementById("editCiudad").value;
    const pais = document.getElementById("editPais").value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.username === localStorage.getItem('loggedInUser'));

    if (userIndex !== -1) {
        users[userIndex] = { username, email, ciudad, pais, password: users[userIndex].password };
        localStorage.setItem('users', JSON.stringify(users));
        alert('Datos actualizados correctamente');
        closeProfileModal();
    } else {
        alert('Error al actualizar los datos');
    }
};
};