window.supabaseClient = window.supabase.createClient(
  "https://qpbxanqpcqmwhhdfyydf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwYnhhbnFwY3Ftd2hoZGZ5eWRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNDUxMjQsImV4cCI6MjA5MjcyMTEyNH0.BVPcDZSEuhBwPnLt4atZPMgrgSMlShdASK75IliAx_I"
);
console.log("Supabase inicializado:", window.supabaseClient);