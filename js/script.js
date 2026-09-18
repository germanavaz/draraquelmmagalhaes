// =====================================================
// Dra. Raquel Magalhães – Advogada Empresarial
// JavaScript puro (sem dependências)
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     1) Carrossel contínuo de depoimentos (efeito "esteira")
     Duplicamos os cards uma vez para o loop ficar contínuo,
     sem precisar de mais depoimentos reais.
  --------------------------------------------------- */
  const marqueeTrack = document.getElementById('depoimentos-track');

  if (marqueeTrack) {
    const originalCards = Array.from(marqueeTrack.children);
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      marqueeTrack.appendChild(clone);
    });
  }

  /* ---------------------------------------------------
     2) Formulário de contato (hero)
     Envio real via Web3Forms (https://web3forms.com) — sem
     precisar de servidor próprio. Pegue sua "access key"
     gratuita no site deles e cole no input hidden
     name="access_key" lá no index.html.
  --------------------------------------------------- */
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Honeypot: se esse campo escondido veio preenchido, é bot — ignora silenciosamente
      if (form.botcheck && form.botcheck.checked) {
        form.reset();
        return;
      }

      if (!form.checkValidity()) {
        feedback.textContent = 'Preencha todos os campos antes de enviar.';
        feedback.style.color = '#d64545';
        return;
      }

      const accessKey = form.access_key.value.trim();
      if (!accessKey || accessKey === 'COLE_SUA_ACCESS_KEY_AQUI') {
        feedback.textContent = 'Formulário ainda não configurado: falta colar a access key do Web3Forms no index.html.';
        feedback.style.color = '#d64545';
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const textoOriginal = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      feedback.textContent = '';

      try {
        const resposta = await fetch(WEB3FORMS_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });
        const resultado = await resposta.json();

        if (resultado.success) {
          feedback.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
          feedback.style.color = '#29c988';
          form.reset();
        } else {
          feedback.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
          feedback.style.color = '#d64545';
        }
      } catch (erro) {
        feedback.textContent = 'Falha de conexão. Verifique sua internet e tente novamente.';
        feedback.style.color = '#d64545';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = textoOriginal;
      }
    });
  }

});