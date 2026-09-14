// =====================================================
// Dra. Raquel Magalhães – Advogada Empresarial
// JavaScript puro (sem dependências)
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     1) Carrossel de serviços (setas próximo/anterior)
  --------------------------------------------------- */
  const track = document.getElementById('servicos-track');
  const prevBtn = document.getElementById('servicos-prev');
  const nextBtn = document.getElementById('servicos-next');

  if (track && prevBtn && nextBtn) {
    const scrollByCard = (direction) => {
      const card = track.querySelector('.service-card');
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap || 20);
      const amount = card.getBoundingClientRect().width + gap;
      track.scrollBy({ left: direction * amount, behavior: 'smooth' });
    };

    prevBtn.addEventListener('click', () => scrollByCard(-1));
    nextBtn.addEventListener('click', () => scrollByCard(1));
  }

  /* ---------------------------------------------------
     2) Carrossel contínuo de depoimentos (efeito "esteira")
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
     3) Formulário de contato (hero)
     O envio para um backend/CRM será ligado depois em
     outro serviço. Por enquanto só validamos e mostramos
     uma mensagem de confirmação.
  --------------------------------------------------- */
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        feedback.textContent = 'Preencha todos os campos antes de enviar.';
        feedback.style.color = '#d64545';
        return;
      }

      const dados = {
        nome: form.nome.value.trim(),
        email: form.email.value.trim(),
        whatsapp: form.whatsapp.value.trim(),
        mensagem: form.mensagem.value.trim(),
      };

      // TODO: integrar com o backend/CRM escolhido.
      // Exemplo futuro:
      // fetch('URL_DO_SEU_BACKEND', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(dados),
      // });

      console.log('Dados do formulário prontos para envio:', dados);

      feedback.textContent = 'Mensagem pronta para envio! (conecte o backend para concluir o envio real)';
      feedback.style.color = '#29c988';
      form.reset();
    });
  }

});
