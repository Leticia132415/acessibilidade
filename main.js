document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CONTROLE DE ALTO CONTRASTE
     ========================================================================== */
  const contrastBtn = document.querySelector('header button[aria-pressed]');

  if (contrastBtn) {
    contrastBtn.addEventListener('click', () => {
      const isHighContrast = document.body.classList.toggle('high-contrast');
      
      // Atualiza o estado acessível do botão
      contrastBtn.setAttribute('aria-pressed', isHighContrast ? 'true' : 'false');
      
      // Atualiza o texto do botão para o leitor de tela
      contrastBtn.textContent = isHighContrast 
        ? 'Alto Contraste: Ativado' 
        : 'Alto Contraste: Desativado';
    });
  }

  /* ==========================================================================
     2. CONTROLE DE TAMANHO DA FONTE
     ========================================================================== */
  const fontDecreaseBtn = document.querySelector('button[aria-label="Diminuir tamanho da fonte"]');
  const fontResetBtn = document.querySelector('button[aria-label="Tamanho de fonte normal"]');
  const fontIncreaseBtn = document.querySelector('button[aria-label="Aumentar tamanho da fonte"]');

  let currentFontSize = 100; // Porcentagem do tamanho original

  const updateFontSize = (newSize) => {
    currentFontSize = Math.min(Math.max(newSize, 80), 150); // Limita entre 80% e 150%
    document.documentElement.style.fontSize = `${currentFontSize}%`;
  };

  if (fontDecreaseBtn) {
    fontDecreaseBtn.addEventListener('click', () => updateFontSize(currentFontSize - 10));
  }
  if (fontResetBtn) {
    fontResetBtn.addEventListener('click', () => updateFontSize(100));
  }
  if (fontIncreaseBtn) {
    fontIncreaseBtn.addEventListener('click', () => updateFontSize(currentFontSize + 10));
  }

  /* ==========================================================================
     3. VALIDAÇÃO ACESSÍVEL DO FORMULÁRIO (LIVE REGION)
     ========================================================================== */
  const form = document.querySelector('form');
  const selectProvincia = document.getElementById('select-provincia');
  const errorContainer = document.getElementById('erro-formulario');

  // Garante que o container de erro comece limpo
  if (errorContainer) {
    errorContainer.style.display = 'none';
    errorContainer.textContent = '';
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      // Validação: Exige a seleção de uma província
      if (!selectProvincia.value) {
        event.preventDefault(); // Impede o envio do formulário

        if (errorContainer) {
          errorContainer.style.display = 'block';
          // O leitor de tela anunciará imediatamente este conteúdo devido ao role="alert"
          errorContainer.innerHTML = '<p>⚠️ Erro: Por favor, selecione ao menos uma província.</p>';
        }

        // Move o foco diretamente para o campo com erro para facilitar a navegação por teclado
        selectProvincia.focus();
      } else {
        // Limpa a mensagem de erro caso o formulário esteja correto
        if (errorContainer) {
          errorContainer.style.display = 'none';
          errorContainer.textContent = '';
        }
      }
    });
  }

});