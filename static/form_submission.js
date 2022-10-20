const password_regex = /[a-zA-Z0-9]{5,}/
const name_regex = /[a-zA-Z]{5,}/
const email_regex = /^([_\-\.a-zA-Z0-9]+)@([_\-\.a-zA-Z0-9]+)\.([a-zA-Z]{3,8})/
const email = document.getElementById('userEmail');
const password = document.getElementById('userPassword')
const Name = document.getElementById('userName')

document.getElementById('Submit-link').addEventListener('click', e => {
    e.preventDefault();
    if (Name != null && !name_regex.test(Name.value)) {
        Name.style.borderColor = 'red'
        return;
    }
    if (!email_regex.test(email.value)) {

        email.style.borderColor = 'red';
        return;
    }
    if (!password_regex.test(password.value) || password.value.length > 12) {
        password.style.borderColor = 'red';
        return;
    }
    document.getElementById('myform').submit();
    document.getElementById('myform').reset();
})

