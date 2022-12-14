
const formulario = document.getElementById("formulario")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirmation = document.getElementById("password-confirmation")
const celular = document.getElementById('celular')

function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
};

formulario.addEventListener('submit',(e) =>{
    e.preventDefault()
    //vamos chamar a função checkInputs que criamos aqui
    checkInputs()

})
function checkInputs(){
    const usernameValue = username.value
    const emailValue = email.value
    const passwordValue = password.value
    const passwordConfirmationValue = passwordConfirmation.value
    const celularValue = celular.value

    if (usernameValue === "") {
        setErrorFor(username, "O nome de usuário é obrigatório")
      } else {
        setSuccessFor(username);
    }
    if (emailValue === "") {
        setErrorFor(email, "O email é obrigatório.")
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, "Por favor, insira um email válido.")
    }else {
        setSuccessFor(email)
    }
    if (passwordValue === "") {
        setErrorFor(password, "A senha é obrigatória.")
    }else if (passwordValue.length < 7) {
        setErrorFor(password, "A senha precisa ter no mínimo 7 caracteres.")
    }else {
        setSuccessFor(password);
    }
    
    if (passwordConfirmationValue === "") {
        setErrorFor(passwordConfirmation, "A confirmação de senha é obrigatória.")
    }else if (passwordConfirmationValue !== passwordValue) {
        setErrorFor(passwordConfirmation, "As senhas não conferem.")
    }else {
        setSuccessFor(passwordConfirmation);
    }
    if (celularValue === "") {
        setErrorFor(celular, "O número de celular é obrigatório.")
    }else if (celularValue.length != 15 ) {
        setErrorFor(celular, "O seu telefone precisa ter 11 números.")
    }else {
        setSuccessFor(celular);
    }
}
const $input = document.querySelector('[data-js="input"]')
$input.addEventListener('input', handleInput, false)

function handleInput (e) {
  e.target.value = phoneMask(e.target.value)
}

function phoneMask (celular) {
  return celular.replace(/\D/g, '')
    .replace(/^(\d)/, '($1')
    .replace(/^(\(\d{2})(\d)/, '$1) $2')
    .replace(/(\d{5})(\d{1,4})/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}
function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
}

function setErrorFor(input, message) {
    const formControl = input.parentElement
    const small = formControl.querySelector("small")
    small.innerText = message
    formControl.className = "form-control error"
}
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

