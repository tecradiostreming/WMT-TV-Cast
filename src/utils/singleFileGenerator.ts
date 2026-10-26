import { CanalTV } from '../data/channels';

/**
 * Gera um arquivo HTML único, 100% autônomo e sem dependências de build,
 * perfeito para publicar no Blogger, GitHub Pages ou abrir localmente com duplo clique.
 */
export function generateSingleFileHtml(canais: CanalTV[]): string {
  const jsonCanais = JSON.stringify(canais, null, 2);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>WMT-TV Cast - Catálogo Web TV & Espelhamento</title>
  <meta name="description" content="Catálogo completo de TVs web do blog com ferramenta de espelhamento e transmissão para Chromecast, AirPlay e Smart TVs.">
  <meta name="theme-color" content="#080c15">
  
  <!-- Fontes & Estilos -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- HLS.js para reprodução de streams .m3u8 -->
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
  
  <!-- Google Cast SDK -->
  <script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>
  
  <!-- QRCode.js para gerar QR Codes na Smart TV -->
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
  
  <!-- Tailwind via CDN para versão standalone de 1 arquivo -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
          },
          colors: {
            brand: {
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
            }
          }
        }
      }
    }
  </script>

  <style>
    body {
      background-color: #080c15;
      color: #f1f5f9;
      font-family: 'Plus Jakarta Sans', sans-serif;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .custom-scroll::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background: #232d42;
      border-radius: 9999px;
    }
    .custom-scroll::-webkit-scrollbar-track {
      background: #0d1322;
    }
    /* Efeito de foco para controle remoto de Smart TV */
    :focus-visible, .tv-focused {
      outline: 3px solid #818cf8 !important;
      outline-offset: 3px !important;
      transform: scale(1.03) !important;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
      z-index: 10;
    }
  </style>
</head>
<body class="min-h-screen bg-[#080c15] text-slate-100 flex flex-col">

  <!-- CABEÇALHO -->
  <header class="sticky top-0 z-30 bg-[#0c1220]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 sm:px-6">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2" stroke-width="2"></rect>
            <polyline points="17 2 12 7 7 2" stroke-width="2"></polyline>
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">WMT-TV Cast</h1>
          <p class="text-xs text-indigo-400 font-medium">Web TVs & Espelhamento para Smart TV</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button id="btnModoTv" class="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 flex items-center gap-1.5 transition">
          <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          Modo TV (Controle)
        </button>
        <button id="btnAjuda" class="px-3 py-2 text-xs font-semibold rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 transition">
          Como Usar
        </button>
      </div>
    </div>
  </header>

  <!-- ÁREA PRINCIPAL -->
  <main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
    
    <!-- PLAYER DE VÍDEO (AO VIVO) -->
    <section id="playerContainer" class="hidden rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
      <div class="relative bg-black aspect-video w-full flex items-center justify-center">
        <!-- Vídeo HLS -->
        <video id="hlsVideo" class="w-full h-full object-contain hidden" controls playsinline></video>
        
        <!-- Iframe Embed -->
        <iframe id="embedIframe" class="w-full h-full border-0 hidden" allow="autoplay; fullscreen; encrypted-media; picture-in-picture"></iframe>
        
        <!-- Estado de Carregamento & Erro -->
        <div id="playerLoading" class="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-3 hidden">
          <div class="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-sm text-slate-300">Conectando ao sinal de transmissão...</span>
        </div>

        <div id="playerError" class="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/95 p-6 text-center gap-4 hidden">
          <div class="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <div>
            <h3 class="text-base font-bold text-white">Sinal indisponível ou bloqueado</h3>
            <p class="text-xs text-slate-400 max-w-md mt-1">Este canal pode estar fora do ar, requerer conexão direta ou bloqueado por política CORS/HTTP no navegador.</p>
          </div>
          <div class="flex flex-wrap gap-2 justify-center">
            <button id="btnRetryPlayer" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition">Tentar novamente</button>
            <a id="btnLinkDireto" href="#" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition">Abrir link do sinal</a>
          </div>
        </div>
      </div>

      <!-- Barra de Controle do Canal Ativo -->
      <div class="p-4 sm:p-5 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
        <div class="flex items-center gap-3">
          <img id="playerCanalImg" src="" alt="" class="w-12 h-12 rounded-xl object-cover bg-slate-800 border border-slate-700">
          <div>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">AO VIVO</span>
              <h2 id="playerCanalNome" class="text-lg font-bold text-white">Nome do Canal</h2>
            </div>
            <p id="playerCanalEstilo" class="text-xs text-slate-400 mt-0.5">Estilo / Categoria</p>
          </div>
        </div>

        <div class="flex items-center flex-wrap gap-2">
          <!-- Botão Transmitir para TV -->
          <button id="btnTransmitirModal" class="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition active:scale-95">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
            Transmitir para TV
          </button>
          <button id="btnFecharPlayer" class="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition" title="Fechar player">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- BARRA DE PESQUISA E FILTROS -->
    <section class="space-y-4">
      <div class="relative">
        <svg class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input type="text" id="inputBusca" placeholder="Pesquisar canais por nome ou categoria (ex: Desenhos, SBT, Clássicos, Fé)..." class="w-full pl-12 pr-10 py-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-inner">
        <button id="btnClearBusca" class="hidden absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Etiquetas de Estilo (Filtros dinâmicos) -->
      <div id="filtrosEstilo" class="flex items-center gap-2 overflow-x-auto pb-2 custom-scroll text-xs">
        <!-- Renderizado dinamicamente -->
      </div>
    </section>

    <!-- GRADE DE CANAIS -->
    <section>
      <div class="flex items-center justify-between mb-4">
        <h3 id="contadorCanais" class="text-sm font-semibold text-slate-300">Exibindo canais</h3>
      </div>
      <div id="gridCanais" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
        <!-- Cards gerados via JS -->
      </div>
      <div id="emptyState" class="hidden text-center py-16 text-slate-400">
        Nenhum canal encontrado com os filtros selecionados.
      </div>
    </section>
  </main>

  <!-- MODAL DE TRANSMISSÃO PARA TV -->
  <div id="modalCast" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 hidden">
    <div class="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <div>
            <h3 class="text-base font-bold text-white">Transmitir para a TV</h3>
            <p id="castModalCanalNome" class="text-xs text-slate-400">Canal Selecionado</p>
          </div>
        </div>
        <button id="btnFecharCastModal" class="p-1.5 text-slate-400 hover:text-white rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div class="space-y-3">
        <!-- 1. Google Cast / Chromecast -->
        <button id="btnCastGoogle" class="w-full p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 flex items-center justify-between text-left transition group">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
            </div>
            <div>
              <div class="text-xs font-bold text-white">Chromecast / Google TV</div>
              <div id="castGoogleStatus" class="text-[11px] text-slate-400">Google Cast SDK ativo</div>
            </div>
          </div>
          <span class="text-xs font-semibold text-cyan-400 group-hover:translate-x-0.5 transition">Conectar &rarr;</span>
        </button>

        <!-- 2. AirPlay (Apple TV & Safari) -->
        <button id="btnCastAirplay" class="w-full p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 flex items-center justify-between text-left transition group hidden">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19h14"></path></svg>
            </div>
            <div>
              <div class="text-xs font-bold text-white">AirPlay (Apple TV)</div>
              <div class="text-[11px] text-slate-400">Dispositivos Apple / Safari</div>
            </div>
          </div>
          <span class="text-xs font-semibold text-purple-400 group-hover:translate-x-0.5 transition">Abrir &rarr;</span>
        </button>

        <!-- 3. Abrir direto na Smart TV (QR Code & Link) -->
        <div class="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs font-bold text-white">Abrir no Navegador da Smart TV</div>
              <div class="text-[11px] text-slate-400">Aponte a câmera ou digite o link na TV</div>
            </div>
          </div>
          <div class="flex items-center justify-center p-3 bg-white rounded-xl">
            <canvas id="qrCodeCanvas"></canvas>
          </div>
          <div class="flex items-center gap-2">
            <input type="text" id="inputLinkTv" readonly class="flex-1 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs text-slate-300 truncate">
            <button id="btnCopiarLinkTv" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition">Copiar</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- DADOS EMBUTIDOS DOS CANAIS -->
  <script>
    window.CATALOGO_CANAIS = ${jsonCanais};
  </script>

  <!-- LÓGICA COMPLETA DO APLICATIVO -->
  <script>
    let canais = window.CATALOGO_CANAIS || [];
    let canalAtivo = null;
    let hlsInstance = null;
    let categoriaAtiva = 'Todos';
    let buscaTexto = '';
    let favoritos = JSON.parse(localStorage.getItem('wmt_favs') || '[]');

    // Elementos DOM
    const gridCanais = document.getElementById('gridCanais');
    const inputBusca = document.getElementById('inputBusca');
    const btnClearBusca = document.getElementById('btnClearBusca');
    const filtrosEstilo = document.getElementById('filtrosEstilo');
    const contadorCanais = document.getElementById('contadorCanais');
    const playerContainer = document.getElementById('playerContainer');
    const hlsVideo = document.getElementById('hlsVideo');
    const embedIframe = document.getElementById('embedIframe');
    const playerLoading = document.getElementById('playerLoading');
    const playerError = document.getElementById('playerError');
    const playerCanalImg = document.getElementById('playerCanalImg');
    const playerCanalNome = document.getElementById('playerCanalNome');
    const playerCanalEstilo = document.getElementById('playerCanalEstilo');
    const btnFecharPlayer = document.getElementById('btnFecharPlayer');
    const btnRetryPlayer = document.getElementById('btnRetryPlayer');
    const btnLinkDireto = document.getElementById('btnLinkDireto');
    const btnTransmitirModal = document.getElementById('btnTransmitirModal');
    const modalCast = document.getElementById('modalCast');
    const btnFecharCastModal = document.getElementById('btnFecharCastModal');
    const castModalCanalNome = document.getElementById('castModalCanalNome');
    const btnCastGoogle = document.getElementById('btnCastGoogle');
    const btnCastAirplay = document.getElementById('btnCastAirplay');
    const qrCodeCanvas = document.getElementById('qrCodeCanvas');
    const inputLinkTv = document.getElementById('inputLinkTv');
    const btnCopiarLinkTv = document.getElementById('btnCopiarLinkTv');
    const btnModoTv = document.getElementById('btnModoTv');

    // Inicialização
    function init() {
      gerarFiltros();
      renderizarGrade();
      verificarHashUrl();
      verificarSuporteAirplay();

      // Busca
      inputBusca.addEventListener('input', (e) => {
        buscaTexto = e.target.value.toLowerCase();
        btnClearBusca.classList.toggle('hidden', !buscaTexto);
        renderizarGrade();
      });

      btnClearBusca.addEventListener('click', () => {
        inputBusca.value = '';
        buscaTexto = '';
        btnClearBusca.classList.add('hidden');
        renderizarGrade();
      });

      btnFecharPlayer.addEventListener('click', pararPlayer);
      btnRetryPlayer.addEventListener('click', () => canalAtivo && tocarCanal(canalAtivo));
      btnTransmitirModal.addEventListener('click', abrirModalCast);
      btnFecharCastModal.addEventListener('click', fecharModalCast);
      btnCopiarLinkTv.addEventListener('click', copiarLink);
      btnCastGoogle.addEventListener('click', transmitirChromecast);
      btnModoTv.addEventListener('click', alternarModoTv);

      window.addEventListener('hashchange', verificarHashUrl);
    }

    // Extrair categorias únicas dos canais
    function extrairCategorias() {
      const set = new Set();
      canais.forEach(c => {
        if (c.estilo) {
          c.estilo.split(',').forEach(item => {
            const limpo = item.trim();
            if (limpo) set.add(limpo);
          });
        }
      });
      return ['Todos', '⭐ Favoritos', ...Array.from(set).sort()];
    }

    // Gerar botões de filtro
    function gerarFiltros() {
      const categorias = extrairCategorias();
      filtrosEstilo.innerHTML = '';
      categorias.forEach(cat => {
        const btn = document.createElement('button');
        const isActive = categoriaAtiva === cat;
        btn.className = \`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition \${
          isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        }\`;
        btn.textContent = cat;
        btn.onclick = () => {
          categoriaAtiva = cat;
          gerarFiltros();
          renderizarGrade();
        };
        filtrosEstilo.appendChild(btn);
      });
    }

    // Renderizar cards na grade
    function renderizarGrade() {
      const filtrados = canais.filter(c => {
        const matchBusca = !buscaTexto || c.nome.toLowerCase().includes(buscaTexto) || (c.estilo && c.estilo.toLowerCase().includes(buscaTexto));
        if (!matchBusca) return false;

        if (categoriaAtiva === 'Todos') return true;
        if (categoriaAtiva === '⭐ Favoritos') return favoritos.includes(c.id);
        return c.estilo && c.estilo.toLowerCase().includes(categoriaAtiva.toLowerCase());
      });

      contadorCanais.textContent = \`Exibindo \${filtrados.length} canais\`;
      gridCanais.innerHTML = '';

      if (filtrados.length === 0) {
        document.getElementById('emptyState').classList.remove('hidden');
        return;
      }
      document.getElementById('emptyState').classList.add('hidden');

      filtrados.forEach(canal => {
        const isFav = favoritos.includes(canal.id);
        const card = document.createElement('div');
        card.className = 'group relative rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition cursor-pointer flex flex-col focus:outline-none';
        card.tabIndex = 0;
        
        card.innerHTML = \`
          <div class="relative aspect-video w-full bg-slate-800 overflow-hidden">
            <img src="\${canal.imagem}" alt="\${canal.nome}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&auto=format&fit=crop&q=80';">
            <span class="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-bold \${
              canal.tipo_link === 'HLS' ? 'bg-indigo-600/90 text-white' : 'bg-amber-600/90 text-white'
            }">\${canal.tipo_link}</span>
            <button class="btn-fav absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition" title="Favoritar">
              <svg class="w-4 h-4 \${isFav ? 'fill-red-500 text-red-500' : 'text-slate-300'}" viewBox="0 0 24 24" stroke="currentColor" fill="none"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </button>
          </div>
          <div class="p-3 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold text-white line-clamp-1 group-hover:text-indigo-400 transition">\${canal.nome}</h4>
              <p class="text-[11px] text-slate-400 line-clamp-1 mt-0.5">\${canal.estilo || 'Geral'}</p>
            </div>
            <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span class="text-indigo-400 font-semibold group-hover:underline">Assistir agora</span>
              <span class="text-slate-500">&rarr;</span>
            </div>
          </div>
        \`;

        // Clique no card
        card.onclick = (e) => {
          if (e.target.closest('.btn-fav')) {
            e.stopPropagation();
            alternarFavorito(canal.id);
            return;
          }
          tocarCanal(canal);
        };

        // Suporte tecla Enter para Smart TV
        card.onkeydown = (e) => {
          if (e.key === 'Enter') {
            tocarCanal(canal);
          }
        };

        gridCanais.appendChild(card);
      });
    }

    // Alternar Favorito
    function alternarFavorito(id) {
      if (favoritos.includes(id)) {
        favoritos = favoritos.filter(fav => fav !== id);
      } else {
        favoritos.push(id);
      }
      localStorage.setItem('wmt_favs', JSON.stringify(favoritos));
      renderizarGrade();
    }

    // Tocar Canal
    function tocarCanal(canal) {
      canalAtivo = canal;
      window.location.hash = 'canal=' + canal.id;

      playerContainer.classList.remove('hidden');
      playerCanalImg.src = canal.imagem;
      playerCanalNome.textContent = canal.nome;
      playerCanalEstilo.textContent = canal.estilo;
      btnLinkDireto.href = canal.streaming;

      playerError.classList.add('hidden');
      playerLoading.classList.remove('hidden');

      if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
      }

      if (canal.tipo_link === 'HLS') {
        embedIframe.classList.add('hidden');
        embedIframe.src = '';
        hlsVideo.classList.remove('hidden');

        if (window.Hls && window.Hls.isSupported()) {
          hlsInstance = new window.Hls({
            enableWorker: true,
            lowLatencyMode: true
          });
          hlsInstance.loadSource(canal.streaming);
          hlsInstance.attachMedia(hlsVideo);

          hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => {
            playerLoading.classList.add('hidden');
            hlsVideo.play().catch(e => console.log('Autoplay bloqueado pelo navegador'));
          });

          hlsInstance.on(window.Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              playerLoading.classList.add('hidden');
              playerError.classList.remove('hidden');
            }
          });
        } else if (hlsVideo.canPlayType('application/vnd.apple.mpegurl')) {
          // Safari / iOS nativo
          hlsVideo.src = canal.streaming;
          hlsVideo.addEventListener('loadedmetadata', () => {
            playerLoading.classList.add('hidden');
            hlsVideo.play();
          });
          hlsVideo.addEventListener('error', () => {
            playerLoading.classList.add('hidden');
            playerError.classList.remove('hidden');
          });
        } else {
          playerLoading.classList.add('hidden');
          playerError.classList.remove('hidden');
        }
      } else {
        // Embed / Iframe
        hlsVideo.classList.add('hidden');
        hlsVideo.pause();
        embedIframe.classList.remove('hidden');
        embedIframe.src = canal.streaming;
        embedIframe.onload = () => {
          playerLoading.classList.add('hidden');
        };
      }

      // Scroll suave para o player
      playerContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function pararPlayer() {
      if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
      }
      hlsVideo.pause();
      hlsVideo.src = '';
      embedIframe.src = '';
      playerContainer.classList.add('hidden');
      canalAtivo = null;
      window.history.pushState(null, '', window.location.pathname);
    }

    // Modal de Transmissão
    function abrirModalCast() {
      if (!canalAtivo) return;
      castModalCanalNome.textContent = canalAtivo.nome;
      modalCast.classList.remove('hidden');

      const urlCanal = window.location.origin + window.location.pathname + '#canal=' + canalAtivo.id;
      inputLinkTv.value = urlCanal;

      if (window.QRCode) {
        window.QRCode.toCanvas(qrCodeCanvas, urlCanal, { width: 180, margin: 1 }, function (error) {
          if (error) console.error(error);
        });
      }
    }

    function fecharModalCast() {
      modalCast.classList.add('hidden');
    }

    function copiarLink() {
      navigator.clipboard.writeText(inputLinkTv.value).then(() => {
        btnCopiarLinkTv.textContent = 'Copiado!';
        setTimeout(() => btnCopiarLinkTv.textContent = 'Copiar', 2000);
      });
    }

    // Transmissão Chromecast
    function transmitirChromecast() {
      if (!canalAtivo) return;
      if (canalAtivo.tipo_link !== 'HLS') {
        alert('Canais em formato iframe/embed não podem ser enviados diretamente pelo Cast SDK. Utilize o menu ⋮ do Google Chrome e selecione "Transmitir aba" para espelhar.');
        return;
      }
      if (!window.cast || !window.cast.framework) {
        alert('Google Cast SDK indisponível. Certifique-se de estar usando o Google Chrome em HTTPS.');
        return;
      }

      const castContext = window.cast.framework.CastContext.getInstance();
      castContext.requestSession().then(session => {
        const mediaInfo = new window.chrome.cast.media.MediaInfo(canalAtivo.streaming, 'application/x-mpegURL');
        mediaInfo.metadata = new window.chrome.cast.media.GenericMediaMetadata();
        mediaInfo.metadata.title = canalAtivo.nome;
        mediaInfo.metadata.subtitle = canalAtivo.estilo;
        mediaInfo.metadata.images = [{ url: canalAtivo.imagem }];

        const request = new window.chrome.cast.media.LoadRequest(mediaInfo);
        session.loadMedia(request).then(
          () => alert('Transmitindo ' + canalAtivo.nome + ' para a TV!'),
          (err) => alert('Erro ao transmitir: ' + JSON.stringify(err))
        );
      }).catch(err => {
        console.log('Sessão Cast cancelada ou erro:', err);
      });
    }

    // Verificar suporte Airplay
    function verificarSuporteAirplay() {
      if (window.WebKitPlaybackTargetAvailabilityEvent || (hlsVideo && typeof hlsVideo.webkitShowPlaybackTargetPicker === 'function')) {
        btnCastAirplay.classList.remove('hidden');
        btnCastAirplay.onclick = () => {
          if (hlsVideo && hlsVideo.webkitShowPlaybackTargetPicker) {
            hlsVideo.webkitShowPlaybackTargetPicker();
          }
        };
      }
    }

    // Deep Link #canal=ID
    function verificarHashUrl() {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#canal=')) {
        const id = hash.replace('#canal=', '');
        const canal = canais.find(c => c.id === id);
        if (canal) {
          tocarCanal(canal);
        }
      }
    }

    // Modo TV (Controle Remoto Smart TV)
    function alternarModoTv() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        alert('Modo TV Ativado: Use as setas do controle remoto para navegar, Enter para abrir o canal e Esc para sair.');
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }

    // Inicializar na carga da página
    window.addEventListener('DOMContentLoaded', init);
  </script>
</body>
</html>`;
}
