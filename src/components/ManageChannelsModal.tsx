import React, { useState } from 'react';
import { CanalTV } from '../data/channels';
import { 
  Database, 
  X, 
  Upload, 
  Download, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  FileJson,
  FileCode,
  Tv
} from 'lucide-react';

interface ManageChannelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  canais: CanalTV[];
  onUpdateChannels: (novosCanais: CanalTV[]) => void;
  onResetChannels: () => void;
  onDownloadSingleFile: () => void;
}

export const ManageChannelsModal: React.FC<ManageChannelsModalProps> = ({
  isOpen,
  onClose,
  canais,
  onUpdateChannels,
  onResetChannels,
  onDownloadSingleFile
}) => {
  const [jsonText, setJsonText] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Tratar upload de arquivo JSON
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (!Array.isArray(parsed)) {
          throw new Error('O arquivo deve conter um array JSON de canais ([ ... ]).');
        }

        // Sanitizar e validar itens
        const validList: CanalTV[] = parsed.map((item: any, idx: number) => ({
          id: item.id || `custom-canal-${idx}-${Date.now()}`,
          nome: item.nome || `Canal ${idx + 1}`,
          estilo: item.estilo || 'Geral',
          imagem: item.imagem || 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&auto=format&fit=crop&q=80',
          streaming: item.streaming || '',
          tipo_link: item.tipo_link === 'embed' ? 'embed' : 'HLS',
          descricao: item.descricao || ''
        }));

        onUpdateChannels(validList);
        setSuccessMsg(`Sucesso! ${validList.length} canais carregados e salvos no seu navegador.`);
      } catch (err: any) {
        setErrorMsg('Erro ao ler lista_tvs.json: ' + (err.message || 'JSON inválido'));
      }
    };
    reader.readAsText(file);
  };

  // Tratar colagem manual de JSON
  const handleApplyJsonText = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        throw new Error('O JSON deve ser um array de canais.');
      }
      const validList: CanalTV[] = parsed.map((item: any, idx: number) => ({
        id: item.id || `custom-canal-${idx}-${Date.now()}`,
        nome: item.nome || `Canal ${idx + 1}`,
        estilo: item.estilo || 'Geral',
        imagem: item.imagem || 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&auto=format&fit=crop&q=80',
        streaming: item.streaming || '',
        tipo_link: item.tipo_link === 'embed' ? 'embed' : 'HLS',
        descricao: item.descricao || ''
      }));

      onUpdateChannels(validList);
      setSuccessMsg(`Sucesso! ${validList.length} canais aplicados com êxito.`);
      setJsonText('');
    } catch (err: any) {
      setErrorMsg('JSON inválido: ' + err.message);
    }
  };

  // Exportar JSON atual
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(canais, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'lista_tvs.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Topo */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Gerenciar Catálogo de Canais</h3>
              <p className="text-xs text-slate-400">Total de canais ativos: {canais.length}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo com scroll */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto custom-scroll text-xs">
          
          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Opção 1: Upload do seu lista_tvs.json */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-400" />
              Carregar seu arquivo lista_tvs.json
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Substitua a lista padrão carregando seu próprio arquivo JSON. O arquivo deve conter uma lista com os campos: <code className="text-indigo-300">nome</code>, <code className="text-indigo-300">estilo</code>, <code className="text-indigo-300">imagem</code>, <code className="text-indigo-300">streaming</code> e <code className="text-indigo-300">tipo_link</code> ('HLS' ou 'embed').
            </p>

            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl cursor-pointer bg-slate-900/60 hover:bg-slate-800/60 transition group">
              <FileJson className="w-8 h-8 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-white">Clique para selecionar lista_tvs.json</span>
              <span className="text-[11px] text-slate-500 mt-0.5">ou arraste e solte aqui</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* Opção 2: Exportar ou Restaurar Padrão */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleExportJson}
              className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold flex items-center justify-center gap-2 transition"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              Exportar JSON
            </button>

            <button
              onClick={onDownloadSingleFile}
              className="p-3.5 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-semibold flex items-center justify-center gap-2 transition"
            >
              <FileCode className="w-4 h-4" />
              Baixar HTML Único
            </button>

            <button
              onClick={() => {
                if (confirm('Deseja restaurar os 87 canais padrão originais?')) {
                  onResetChannels();
                  setSuccessMsg('Catálogo padrão de 87 canais restaurado com sucesso!');
                }
              }}
              className="p-3.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-semibold flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Restaurar 87 Padrão
            </button>
          </div>

        </div>

        {/* Rodapé */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
