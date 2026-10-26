import React from 'react';
import { 
  BookOpen, 
  X, 
  Globe, 
  Cast, 
  ExternalLink, 
  CheckCircle2, 
  Code2, 
  ShieldCheck, 
  FileCode2,
  Tv
} from 'lucide-react';

interface PublishGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadSingleFile: () => void;
}

export const PublishGuideModal: React.FC<PublishGuideModalProps> = ({
  isOpen,
  onClose,
  onDownloadSingleFile
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Cabeçalho */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Guia de Publicação & Google Cast SDK</h3>
              <p className="text-xs text-slate-400">Como hospedar no GitHub Pages, Blogger e configurar o Chromecast</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo com scroll */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto custom-scroll text-sm leading-relaxed text-slate-300">
          
          {/* Card de Destaque: Baixar Arquivo Único */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-indigo-400" />
                <h4 className="text-sm font-bold text-white">Arquivo Único HTML (.html)</h4>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Você pode baixar a versão 100% autônoma (HTML, CSS e JS juntos) para publicar no Blogger ou GitHub Pages com um clique.
              </p>
            </div>
            <button
              onClick={onDownloadSingleFile}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 whitespace-nowrap transition active:scale-95"
            >
              Baixar wmt-tv-cast.html
            </button>
          </div>

          {/* 1. PUBLICAR NO GITHUB PAGES (RECOMENDADO PARA CAST) */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              1. Como Publicar no GitHub Pages (100% Gratuito & HTTPS Automático)
            </h4>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
              <p>
                O <strong>Google Cast SDK</strong> exige obrigatoriamente uma conexão segura <strong>HTTPS</strong>. O GitHub Pages oferece HTTPS nativo e gratuito:
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
                <li>Crie um repositório no GitHub (exemplo: <code className="text-indigo-300">wmt-tv-cast</code>).</li>
                <li>Faça o upload do arquivo <code className="text-indigo-300">index.html</code> (baixe pelo botão acima ou use os arquivos do projeto).</li>
                <li>Acesse <strong>Settings &rarr; Pages</strong> no repositório.</li>
                <li>Em <strong>Branch</strong>, selecione <code className="text-indigo-300">main</code> e a pasta <code className="text-indigo-300">/ (root)</code> e clique em <strong>Save</strong>.</li>
                <li>Em cerca de 1 minuto, seu app estará publicado em <code className="text-cyan-300">https://seu-usuario.github.io/wmt-tv-cast/</code>.</li>
              </ol>
            </div>
          </div>

          {/* 2. PUBLICAR OU EMBUTIR NO BLOGGER */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-amber-400" />
              2. Como Usar no Blogger (Blogspot)
            </h4>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-3">
              <p>Você pode integrar de duas formas fáceis no seu blog:</p>
              
              <div className="space-y-1.5 pl-2 border-l-2 border-indigo-500/50">
                <p className="font-semibold text-white">Opção A: Como Página ou Gadget de Página Inteira</p>
                <p className="text-slate-400">
                  No painel do Blogger, vá em <strong>Páginas &rarr; Nova Página</strong>, mude o editor para <strong>Visualização em HTML</strong> e cole o conteúdo completo do arquivo <code className="text-indigo-300">wmt-tv-cast.html</code>. Certifique-se de que o recurso "HTTPS Redirect" está ativo nas Configurações do Blogger.
                </p>
              </div>

              <div className="space-y-1.5 pl-2 border-l-2 border-cyan-500/50">
                <p className="font-semibold text-white">Opção B: Embutido via Iframe (Recomendado se hospedado no GitHub)</p>
                <pre className="p-3 bg-slate-900 rounded-xl text-[11px] text-cyan-300 overflow-x-auto font-mono">
{`<iframe src="https://seu-usuario.github.io/wmt-tv-cast/" 
  style="width:100%; height:850px; border:none; border-radius:16px;" 
  allow="autoplay; fullscreen; encrypted-media; picture-in-picture">
</iframe>`}
                </pre>
              </div>
            </div>
          </div>

          {/* 3. REGISTRO NO GOOGLE CAST DEVELOPER CONSOLE */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Cast className="w-5 h-5 text-indigo-400" />
              3. Google Cast Developer Console (Chromecast)
            </h4>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-2.5">
              <p>
                O <strong>WMT-TV Cast</strong> já vem pré-configurado com o <strong>Default Media Receiver</strong> oficial da Google (<code className="text-cyan-300">CC1AD845</code>), que suporta fluxos de vídeo HLS (<code className="text-indigo-300">application/x-mpegURL</code>) sem que você precise pagar nada.
              </p>
              
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <p className="font-semibold text-white">Caso deseje criar um Custom Receiver com a marca do seu blog:</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                  <li>Acesse o <a href="https://cast.google.com/publish/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline inline-flex items-center gap-0.5">Google Cast SDK Developer Console <ExternalLink className="w-3 h-3" /></a>.</li>
                  <li>Existe uma taxa única de registro de desenvolvedor de <strong>$5 USD</strong> exigida pela Google.</li>
                  <li>Clique em <strong>Add New Application</strong> e escolha <strong>Custom Receiver</strong> ou <strong>Styled Media Receiver</strong>.</li>
                  <li>Insira o URL HTTPS da sua aplicação (ex: no GitHub Pages).</li>
                  <li>Copie o <strong>Application ID</strong> gerado (8 dígitos hexadecimais) e substitua no código onde consta <code className="text-indigo-300">DEFAULT_MEDIA_RECEIVER_APP_ID</code>.</li>
                </ol>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Aviso sobre CORS e HTTPS:</strong> Para que o Chromecast consiga tocar o sinal, o servidor da emissora precisa permitir cabeçalhos CORS (<code className="font-mono text-[10px]">Access-Control-Allow-Origin: *</code>). Caso um canal não abra no Chromecast, utilize a opção "Abrir na Smart TV" via QR Code!
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Rodapé */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition"
          >
            Entendido, fechar guia
          </button>
        </div>

      </div>
    </div>
  );
};
