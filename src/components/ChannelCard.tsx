import React, { useState } from 'react';
import { CanalTV } from '../data/channels';
import { Heart, Play, Cast, Tv } from 'lucide-react';

interface ChannelCardProps {
  canal: CanalTV;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPlay: (canal: CanalTV) => void;
  onQuickCast: (canal: CanalTV) => void;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({
  canal,
  isFavorite,
  onToggleFavorite,
  onPlay,
  onQuickCast,
}) => {
  const [imgError, setImgError] = useState<boolean>(false);

  // Categorias separadas por vírgula
  const categorias = canal.estilo
    ? canal.estilo.split(',').map((c) => c.trim()).filter(Boolean)
    : ['Geral'];

  return (
    <div
      tabIndex={0}
      data-channel-id={canal.id}
      onClick={() => onPlay(canal)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onPlay(canal);
        }
      }}
      className="group relative rounded-2xl bg-slate-900/90 border border-slate-800/80 overflow-hidden hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/10 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all duration-200 cursor-pointer flex flex-col"
    >
      {/* Capa com Proporção 16:9 */}
      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
        {!imgError ? (
          <img
            src={canal.imagem}
            alt={canal.nome}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 text-center">
            <Tv className="w-8 h-8 text-indigo-400/80 mb-1" />
            <span className="text-[11px] font-bold text-slate-300 line-clamp-1">{canal.nome}</span>
          </div>
        )}

        {/* Gradiente escuro para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none" />

        {/* Tag do Tipo de Stream (HLS vs Embed) */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm ${
              canal.tipo_link === 'HLS'
                ? 'bg-indigo-600/90 text-white border border-indigo-400/30'
                : 'bg-amber-600/90 text-white border border-amber-400/30'
            }`}
          >
            {canal.tipo_link}
          </span>
        </div>

        {/* Botão de Favorito */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(canal.id);
          }}
          className="absolute top-2 right-2 p-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition active:scale-90"
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            className={`w-4 h-4 transition ${
              isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-slate-300 hover:text-white'
            }`}
          />
        </button>

        {/* Ícone de Play centralizado ao passar o mouse */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Informações do Canal */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-indigo-400 group-focus:text-indigo-300 transition">
            {canal.nome}
          </h3>

          {/* Badges de estilo / categorias */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {categorias.slice(0, 2).map((cat, i) => (
              <span
                key={i}
                className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700/50"
              >
                {cat}
              </span>
            ))}
            {categorias.length > 2 && (
              <span className="text-[10px] text-slate-500 self-center">
                +{categorias.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Rodapé do Card com Ação Rápida */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-indigo-400 font-semibold group-hover:underline flex items-center gap-1">
            <Play className="w-3 h-3 fill-indigo-400" /> Assistir
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickCast(canal);
            }}
            className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
            title="Opções de transmissão para TV"
          >
            <Cast className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
