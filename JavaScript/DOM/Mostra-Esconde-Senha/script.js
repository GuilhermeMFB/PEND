document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('togglePassword');
    
    function validatePassword() {
        const length = passwordInput.value.length;
        
        if (length >= 6) {
            passwordInput.classList.remove('invalid');
            passwordInput.classList.add('valid');
        } else if (length > 0) {
            passwordInput.classList.remove('valid');
            passwordInput.classList.add('invalid');
        } else {
            passwordInput.classList.remove('invalid', 'valid');
        }
    }
    
    passwordInput.addEventListener('input', validatePassword);
    
    toggleIcon.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        this.classList.toggle('bi-eye-fill');
        this.classList.toggle('bi-eye-slash-fill');
    });
});