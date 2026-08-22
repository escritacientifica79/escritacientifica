document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => {
    document.getElementById('logerror').style.opacity = '0';
    document.getElementById('login-email').style.border = 'none'
    document.getElementById('login-password').style.border = 'none'
  });
});
(async () => {
  const { data: { user } } = await window.supabaseClient.auth.getUser();
  
  if (user) {
    window.location.href = 'hub.html';
  }
})();
const form = document.getElementById("login-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = "Entrando...";
  submitBtn.disabled = true;
  try {
    const { data, error } = await window.supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });
  if (error) {
    if (error.message === 'Invalid login credentials') {
      document.getElementById('logerror').style.opacity = '1';
      document.getElementById('login-email').style.border = 'solid 1px #D42B2B'
      document.getElementById('login-password').style.border = 'solid 1px #D42B2B'
    } else {
      alert('❌ Erro inesperado. Tente novamente.');
    }
    submitBtn.textContent = 'Entrar';
    submitBtn.disabled = false;
    return;
  }
    console.log("✅ Login bem-sucedido!");
    console.log("User ID:", data.user.id);
    console.log("Session:", data.session);
    const { data: debugData, error: debugError } = await window.supabaseClient.rpc('debug_auth');
    console.log("🔍 DEBUG AUTH:", debugData);
    console.log("🔍 DEBUG ERROR:", debugError);
    console.log("🔍 Tentando buscar profile...");
    const { data: profile, error: profileError } = await window.supabaseClient
      .from('profiles')
      .select('approved')
      .eq('id', data.user.id)
      .single();
    console.log("Profile:", profile);
    console.log("Erro:", profileError);
    if (profileError) {
      console.error("Erro completo:", profileError);
      alert("❌ Erro ao verificar aprovação.");
      await window.supabaseClient.auth.signOut();
      submitBtn.textContent = "Entrar";
      submitBtn.disabled = false;
      return;
    }
    if (!profile.approved) {
      window.location.href = "noperms.html";
      await window.supabaseClient.auth.signOut();
      submitBtn.textContent = "Entrar";
      submitBtn.disabled = false;
      return;
    }
    window.location.href = "hub.html";
  } catch (err) {
    console.error("Erro no try/catch:", err);
    alert("❌ Erro inesperado. Tente novamente.");
    submitBtn.textContent = "Entrar";
    submitBtn.disabled = false;
  }
});