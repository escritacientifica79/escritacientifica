document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => {
    document.getElementById('regerror').style.opacity = '0';
    document.getElementById('email').style.border = 'none'
    document.getElementById('shortpw').style.opacity = '0';
    document.getElementById('password').style.border = 'none'
  });
});
(async () => {
  const { data: { user } } = await window.supabaseClient.auth.getUser();
  
  if (user) {
    window.location.href = 'hub.html';
  }
})();

const form = document.getElementById("register-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await window.supabaseClient.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    if (error.message === 'User already registered') {
      document.getElementById('regerror').style.opacity = '1';
      document.getElementById('email').style.border = 'solid 1px #D42B2B';
    } else if (error.message.includes('Password should be at least')) {
      document.getElementById('shortpw').style.opacity = '1';
      document.getElementById('password').style.border = 'solid 1px #D42B2B';
    } else {
      alert('❌ Erro inesperado. Tente novamente mais tarde.');
    }
  } else {
    window.location.href = "login.html";
  }
});