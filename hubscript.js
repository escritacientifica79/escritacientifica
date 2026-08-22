const BUNNY_LIBRARY_ID = '729487';

const logoutButton = document.getElementById('logout');
const logoutWindow = document.getElementById('logoutwindow');
const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');

logoutWindow.style.display = 'none';

logoutButton.addEventListener('click', function() {
  logoutWindow.style.display = 'block';
});

noButton.addEventListener('click', function() {
  logoutWindow.style.display = 'none';
});

yesButton.addEventListener('click', async function() {
  await window.supabaseClient.auth.signOut();
  window.location.href = 'index.html';
});

document.addEventListener('click', function(event) {
  if (!logoutWindow.contains(event.target) && event.target !== logoutButton) {
    logoutWindow.style.display = 'none';
  }
});

document.querySelectorAll('.sub').forEach(card => {
  card.addEventListener('click', async (e) => {
    e.preventDefault();

    const titulo = card.dataset.titulo;
    const videoId = card.dataset.videoId;
    const pdfPath = card.dataset.pdf;

    document.getElementById('content-titulo').textContent = titulo;

    document.getElementById('content-video').src = videoId
      ? `https://iframe.mediadelivery.net/embed/${BUNNY_LIBRARY_ID}/${videoId}`
      : '';

    const pdfViewer = document.getElementById('content-pdf');
    if (pdfPath) {
      const { data } = await window.supabaseClient
        .storage
        .from('materials')
        .createSignedUrl(pdfPath, 600);

      pdfViewer.src = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(data.signedUrl)}`;
      pdfViewer.style.display = 'block';
    } else {
      pdfViewer.style.display = 'none';
    }

    const content = document.getElementById('content');
    content.style.display = 'flex';
    content.scrollIntoView({ behavior: 'smooth' });
  });
});