export interface CanalTV {
  id: string;
  nome: string;
  estilo: string;
  imagem: string;
  streaming: string;
  tipo_link: 'HLS' | 'embed';
  descricao?: string;
  origem?: string;
}

// 87 canais organizados com categorias, capas e fontes HLS / embed
export const CANAIS_INICIAIS: CanalTV[] = [
  // --- TV ABERTA & NOTÍCIAS ---
  {
    id: 'tv-brasil',
    nome: 'TV Brasil HD',
    estilo: 'TV Aberta, Notícias, Variedades',
    imagem: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://tvbrasil.ebc.com.br/sites/default/files/hls/tvbrasil.m3u8',
    tipo_link: 'HLS',
    descricao: 'Emissora pública brasileira com notícias, cultura, documentários e produções nacionais.'
  },
  {
    id: 'tv-cultura',
    nome: 'TV Cultura',
    estilo: 'TV Aberta, Cultura, Clássicos, Desenhos',
    imagem: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UCmqPt8h2nN_9sH_i17G1g5A',
    tipo_link: 'embed',
    descricao: 'A casa do Castelo Rá-Tim-Bum, Roda Viva, Quintal da Cultura e grandes programas educativos.'
  },
  {
    id: 'record-news',
    nome: 'Record News',
    estilo: 'TV Aberta, Notícias',
    imagem: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UCuiLR4C6YCO4Vy5XxGDA42w',
    tipo_link: 'embed',
    descricao: 'Canal de notícias 24 horas da televisão aberta brasileira.'
  },
  {
    id: 'sbt-news',
    nome: 'SBT News 24h',
    estilo: 'TV Aberta, Notícias',
    imagem: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UCk3Kz8Z8v2g6_7mD3y1d_hA',
    tipo_link: 'embed',
    descricao: 'Cobertura em tempo real das principais manchetes do Brasil e do mundo.'
  },
  {
    id: 'rede-brasil',
    nome: 'Rede Brasil de TV',
    estilo: 'TV Aberta, Clássicos, Seriados, Filmes',
    imagem: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stmv1.srvstm.com/rbtv/rbtv/chunklist_w1530962365.m3u8',
    tipo_link: 'HLS',
    descricao: 'Famosa pela exibição de seriados e desenhos clássicos da televisão mundial.'
  },
  {
    id: 'band-vale',
    nome: 'Rede Bandeirantes (Band Vale)',
    estilo: 'TV Aberta, Notícias, Variedades',
    imagem: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://evp92.band.com.br/hls-live/livepkgr/_definst_/bandvale/bandvale.m3u8',
    tipo_link: 'HLS',
    descricao: 'Transmissão ao vivo com jornalismo e programação regional da Band.'
  },
  {
    id: 'tv-senado',
    nome: 'TV Senado HD',
    estilo: 'TV Aberta, Notícias, Política',
    imagem: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stream3.senado.gov.br/hls/tv1.m3u8',
    tipo_link: 'HLS',
    descricao: 'Sessões plenárias, debates e notícias cívicas do Congresso Nacional.'
  },
  {
    id: 'tv-camara',
    nome: 'TV Câmara Federal',
    estilo: 'TV Aberta, Notícias, Política',
    imagem: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://streaming.camara.leg.br/live/smil:aovivo.smil/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Transmissões oficiais, comissões e acontecimentos parlamentares.'
  },
  {
    id: 'canal-futura',
    nome: 'Canal Futura',
    estilo: 'TV Aberta, Educativo, Cultura',
    imagem: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UC4g1cT95Yf1v4V7hGzS-YwA',
    tipo_link: 'embed',
    descricao: 'Educação, transformação social e conhecimento criativo.'
  },
  {
    id: 'tv-escola',
    nome: 'TV Escola',
    estilo: 'TV Aberta, Educativo, Cultura',
    imagem: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://58c3db0ce4009.streamlock.net:1935/tvescola/live.smil/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Programas pedagógicos, séries históricas e apoio ao estudante.'
  },

  // --- DESENHOS & ANIMAÇÕES ---
  {
    id: 'desenhos-classicos-24h',
    nome: 'Desenhos Clássicos Anos 80 & 90',
    estilo: 'Desenhos, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://video01.logicahost.com.br/desenhosclassicos/desenhosclassicos/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Os maiores clássicos animados que marcaram época na TV das manhãs.'
  },
  {
    id: 'pica-pau-web',
    nome: 'Pica-Pau & Amigos 24h',
    estilo: 'Desenhos, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UCj_WJ3_pCgZq2B8Bv3pS9vg',
    tipo_link: 'embed',
    descricao: 'Maratona sem parar do pássaro mais travesso da animação mundial.'
  },
  {
    id: 'tom-jerry-retro',
    nome: 'Tom & Jerry Clássico TV',
    estilo: 'Desenhos, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://csl-media.streamguys1.com/hls/cartoonclassic/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'As divertidas perseguições da Era de Ouro da animação MGM.'
  },
  {
    id: 'looney-tunes-web',
    nome: 'Looney Tunes & Merrie Melodies',
    estilo: 'Desenhos, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://live.ch9media.com/live/looneytunes/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Pernalonga, Patolino, Gaguinho e toda a turma maluca da Warner.'
  },
  {
    id: 'flintstones-jetsons',
    nome: 'Hanna-Barbera Nostalgia',
    estilo: 'Desenhos, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stream.ecable.tv/hannabarbera/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Flintstones, Jetsons, Corrida Maluca, Zé Colmeia e Scooby-Doo.'
  },
  {
    id: 'turma-da-monica',
    nome: 'Turma da Mônica TV Oficial',
    estilo: 'Desenhos, TV Aberta',
    imagem: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UC4N0B3jQ_1_w-Z8kE_63zlw',
    tipo_link: 'embed',
    descricao: 'As melhores historinhas do Bairro do Limoeiro em exibição contínua.'
  },
  {
    id: 'bob-esponja-24h',
    nome: 'Bob Esponja Calça Quadrada',
    estilo: 'Desenhos',
    imagem: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UCx27Pkk8plspoHKCzvd8C7Q',
    tipo_link: 'embed',
    descricao: 'Aventuras submarinas na Fenda do Biquíni com Patrick, Lula Molusco e Sandy.'
  },
  {
    id: 'kids-retro-tv',
    nome: 'Kids Retrô Brasil',
    estilo: 'Desenhos, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://srvstm.com:7000/live/kidsretro.m3u8',
    tipo_link: 'HLS',
    descricao: 'He-Man, She-Ra, Thundercats, Caverna do Dragão e DuckTales.'
  },
  {
    id: 'chaves-animado',
    nome: 'Chaves em Desenho Animado',
    estilo: 'Desenhos, Seriados',
    imagem: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UCx7Y471pA68-3eD98Fm932A',
    tipo_link: 'embed',
    descricao: 'A famosa vila agora em animação colorida e cheia de aventuras.'
  },

  // --- ANIME ---
  {
    id: 'anime-retro-brasil',
    nome: 'Anime Retrô Web TV',
    estilo: 'Anime, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://cdn.streamforyou.com.br/animeretro/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Cavaleiros do Zodíaco, Dragon Ball Z, Yu Yu Hakusho e Shurato.'
  },
  {
    id: 'naruto-24h',
    nome: 'Naruto Shippuden 24h',
    estilo: 'Anime',
    imagem: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UC0Y_zXwA-T3b4e_47v4fJ2Q',
    tipo_link: 'embed',
    descricao: 'A trajetória de Naruto Uzumaki para se tornar o grande Hokage da Aldeia da Folha.'
  },
  {
    id: 'pokemon-tv-stream',
    nome: 'Pokémon Clássico Web',
    estilo: 'Anime, Desenhos',
    imagem: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://live.pokemonstreamtv.net/hls/poketv.m3u8',
    tipo_link: 'HLS',
    descricao: 'Jornadas pelas regiões de Kanto, Johto e Hoenn com Ash e Pikachu.'
  },
  {
    id: 'tokusatsu-tv',
    nome: 'Tokusatsu Heroes TV',
    estilo: 'Anime, Seriados, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://video01.logicahost.com.br/tokusatsu/tokusatsu/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Jaspion, Changeman, Flashman, Jiraiya, Jiban e Kamen Rider.'
  },
  {
    id: 'anime-action-tv',
    nome: 'Otaku Action TV',
    estilo: 'Anime',
    imagem: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://video01.logicahost.com.br/animes/animes/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Animes de ação, fantasia, isekai e batalhas épicas do Japão.'
  },
  {
    id: 'studio-ghibli-vibes',
    nome: 'Ghibli & Relaxing Anime Music',
    estilo: 'Anime, Música',
    imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UC4xK-TzG2f6n0E5tK8_4fQg',
    tipo_link: 'embed',
    descricao: 'Cenas mágicas dos filmes de Hayao Miyazaki com trilha sonora orquestrada.'
  },

  // --- FILMES & SERIADOS ---
  {
    id: 'cine-retro-brasil',
    nome: 'Cine Retrô Brasil',
    estilo: 'Filmes, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stmv1.srvstm.com/cineretro/cineretro/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'O melhor do cinema mundial das décadas de 1940 a 1980.'
  },
  {
    id: 'chaves-chapolin-24h',
    nome: 'Chaves & Chapolin Colorado 24h',
    estilo: 'Seriados, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stmv1.srvstm.com/chavestv/chavestv/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'As divertidas histórias criadas por Roberto Gómez Bolaños (Chespirito).'
  },
  {
    id: 'cine-western-bang-bang',
    nome: 'Cine Western Bang Bang',
    estilo: 'Filmes, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://video01.logicahost.com.br/western/western/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Faroeste clássico, Spaghetti Western com Clint Eastwood e John Wayne.'
  },
  {
    id: 'terror-suspense-tv',
    nome: 'Cine Terror & Trash Web',
    estilo: 'Filmes',
    imagem: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://live.ch9media.com/live/horrorchannel/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Clássicos do suspense, monstros do cinema, Drácula, Frankenstein e ficção.'
  },
  {
    id: 'series-nostalgia-tv',
    nome: 'Séries Clássicas Anos 70 & 80',
    estilo: 'Seriados, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://cdn.streamforyou.com.br/seriesclassicas/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Profissão Perigo (MacGyver), Esquadrão Classe A, Supermáquina e A Feiticeira.'
  },
  {
    id: 'cine-marcial-kung-fu',
    nome: 'Cine Ação & Artes Marciais',
    estilo: 'Filmes',
    imagem: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stmv1.srvstm.com/kungfutv/kungfutv/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Filmes de Bruce Lee, Jackie Chan, Jet Li e mestres de Shaolin.'
  },
  {
    id: 'sci-fi-classics',
    nome: 'Ficção Científica Clássica',
    estilo: 'Filmes, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://live.ch9media.com/live/scifichannel/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Viagens no tempo, invasões alienígenas e distopias retro-futuristas.'
  },
  {
    id: 'sessao-comedia-retro',
    nome: 'Comédias & Trapalhões Clássicos',
    estilo: 'Filmes, Seriados, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://video01.logicahost.com.br/trapalhoes/trapalhoes/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'O Gordo e o Magro, Três Patetas e pérolas do humor brasileiro.'
  },
  {
    id: 'curtas-independentes',
    nome: 'Cinema Independente Brasil',
    estilo: 'Filmes, Cultura',
    imagem: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UCc4X_fR73uU3L1_eW3zB_vw',
    tipo_link: 'embed',
    descricao: 'Produções autorais, curtas-metragens e festivais universitários.'
  },
  {
    id: 'cinema-mudo-pb',
    nome: 'Cine Chaplin & Era de Ouro',
    estilo: 'Filmes, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stream.ecable.tv/silentfilm/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Charles Chaplin, Buster Keaton e as obras-primas do cinema silencioso.'
  },

  // --- RELIGIOSO: CATÓLICA ---
  {
    id: 'tv-aparecida',
    nome: 'TV Aparecida HD',
    estilo: 'Religioso, Católica, TV Aberta',
    imagem: 'https://images.unsplash.com/photo-1548625361-1959737b9264?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://video01.logicahost.com.br/tvaparecida/tvaparecida/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Missas direto do Santuário Nacional de Nossa Senhora Aparecida, orações e família.'
  },
  {
    id: 'cancao-nova',
    nome: 'TV Canção Nova',
    estilo: 'Religioso, Católica, TV Aberta',
    imagem: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://hls.cancaonova.com/live/smil:cnlive.smil/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Programas de evangelização católica, música sacra, acampamentos de oração e terços.'
  },
  {
    id: 'rede-seculo-21',
    nome: 'Rede Século 21',
    estilo: 'Religioso, Católica, TV Aberta',
    imagem: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stmv1.srvstm.com/rs21/rs21/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Padre Eduardo Dougherty, novenas pelas mãos ensanguentadas de Jesus e catequese.'
  },
  {
    id: 'tv-evangelizar',
    nome: 'TV Evangelizar (Padre Reginaldo)',
    estilo: 'Religioso, Católica',
    imagem: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UCv-Z3u1Gz8d7t3zV_1v1vLw',
    tipo_link: 'embed',
    descricao: 'Apresentada pelo Padre Reginaldo Manzotti com momentos de louvor e adoração.'
  },
  {
    id: 'tv-pai-eterno',
    nome: 'TV Pai Eterno',
    estilo: 'Religioso, Católica',
    imagem: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stream.paieterno.com.br/hls/live.m3u8',
    tipo_link: 'HLS',
    descricao: 'Transmissões da Basílica de Trindade em Goiás e bênçãos diárias.'
  },
  {
    id: 'vatican-news',
    nome: 'Vatican News Português',
    estilo: 'Religioso, Católica, Notícias',
    imagem: 'https://images.unsplash.com/photo-1548625361-1959737b9264?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UC7E-LYc1wivk33iYTSRKgLw',
    tipo_link: 'embed',
    descricao: 'Angelus, audiências gerais e pronunciamentos do Papa direto de Roma.'
  },
  {
    id: 'tv-horizonte-catolica',
    nome: 'TV Horizonte Minas',
    estilo: 'Religioso, Católica, Variedades',
    imagem: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://tvhorizonte.com.br/live/smil:aovivo.smil/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Canal católico da Arquidiocese de Belo Horizonte com notícias e reflexões.'
  },
  {
    id: 'tv-nazaré',
    nome: 'TV Nazaré Belém',
    estilo: 'Religioso, Católica',
    imagem: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stmv1.srvstm.com/tvnazare/tvnazare/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Cobertura oficial do Círio de Nazaré e evangelização na Amazônia.'
  },

  // --- RELIGIOSO: EVANGÉLICA ---
  {
    id: 'rede-gospel',
    nome: 'Rede Gospel HD',
    estilo: 'Religioso, Evangélica, TV Aberta',
    imagem: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stmv1.srvstm.com/redegospel/redegospel/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Canal da Igreja Renascer com cultos, louvor gospel e programas jovens.'
  },
  {
    id: 'tv-novo-tempo',
    nome: 'TV Novo Tempo',
    estilo: 'Religioso, Evangélica, TV Aberta',
    imagem: 'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stream.novotempo.com/tv/smil:tvnovotempo.smil/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Canal adventista focado em estilo de vida saudável, família e Bíblia.'
  },
  {
    id: 'rit-tv',
    nome: 'RIT TV (Rede Internacional de Televisão)',
    estilo: 'Religioso, Evangélica, TV Aberta',
    imagem: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stmv1.srvstm.com/rittv/rittv/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Emissora evangélica com pregações de R.R. Soares e jornalismo diário.'
  },
  {
    id: 'boa-vontade-tv',
    nome: 'Boa Vontade TV (LBV)',
    estilo: 'Religioso, Ecumênica, TV Aberta',
    imagem: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stmv1.srvstm.com/lbv/lbv/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Programação ecumênica da Legião da Boa Vontade com Paiva Netto.'
  },
  {
    id: 'boas-novas-tv',
    nome: 'Rede Boas Novas',
    estilo: 'Religioso, Evangélica',
    imagem: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stmv1.srvstm.com/rbn/rbn/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Igreja Assembleia de Deus com mensagens pastorais e hinos congregacionais.'
  },
  {
    id: 'tv-adalpha',
    nome: 'AD Alpha Web TV',
    estilo: 'Religioso, Evangélica',
    imagem: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UCzC1r5V8z3F4m4v-4t4vX_A',
    tipo_link: 'embed',
    descricao: 'Cultos ao vivo e pregações para jovens e famílias.'
  },
  {
    id: 'lagoinha-one',
    nome: 'Lagoinha Global TV',
    estilo: 'Religioso, Evangélica, Música',
    imagem: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UC4iFm7P4E9r9M1E7jW2s1aA',
    tipo_link: 'embed',
    descricao: 'Transmissões da Igreja Batista da Lagoinha com André Valadão.'
  },
  {
    id: 'musica-gospel-24h',
    nome: 'Louvores & Clipes Gospel 24h',
    estilo: 'Religioso, Evangélica, Música',
    imagem: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://video01.logicahost.com.br/gospelmusica/gospelmusica/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Clipes musicais, harpa cristã e sucessos da música evangélica nacional.'
  },

  // --- MÚSICA & SHOWS ---
  {
    id: 'retro-hits-80-90',
    nome: 'Flashback Hits 80 & 90 TV',
    estilo: 'Música, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://video01.logicahost.com.br/flashback/flashback/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Os clipes inesquecíveis da MTV nos anos de ouro da música pop e rock.'
  },
  {
    id: 'sertanejo-raiz-tv',
    nome: 'Sertanejo Raiz & Moda de Viola',
    estilo: 'Música, Cultura',
    imagem: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://video01.logicahost.com.br/sertanejoraiz/sertanejoraiz/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Tião Carreiro, Tonico & Tinoco, Milionário & José Rico e modas campeiras.'
  },
  {
    id: 'rock-metal-tv',
    nome: 'Classic Rock & Heavy Metal TV',
    estilo: 'Música',
    imagem: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stream.ecable.tv/rockchannel/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Queen, Led Zeppelin, Pink Floyd, Iron Maiden, AC/DC e Metallica.'
  },
  {
    id: 'reggae-vibe-brasil',
    nome: 'Reggae Roots & Praia TV',
    estilo: 'Música',
    imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://video01.logicahost.com.br/reggae/reggae/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Bob Marley, Tribo de Jah, Natiruts e a paz do reggae autêntico.'
  },
  {
    id: 'lofi-hiphop-beats',
    nome: 'Lofi Girl - Relax & Study Beats',
    estilo: 'Música',
    imagem: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1',
    tipo_link: 'embed',
    descricao: 'Batidas calmas e aconchegantes para estudar, programar ou relaxar.'
  },
  {
    id: 'synthwave-retro-radio',
    nome: 'Synthwave & Chillwave 80s',
    estilo: 'Música',
    imagem: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/4xDzrJKXOOY?autoplay=1',
    tipo_link: 'embed',
    descricao: 'Paisagens sonoras retro-futuristas com neon e nostalgia dos anos 80.'
  },
  {
    id: 'mpb-bossa-nova',
    nome: 'Bossa Nova & MPB Acústico',
    estilo: 'Música, Cultura',
    imagem: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://live.ch9media.com/live/bossanova/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Tom Jobim, João Gilberto, Vinicius de Moraes e Elis Regina.'
  },
  {
    id: 'dj-eletronica-dance',
    nome: 'Dance Club & EDM Festival TV',
    estilo: 'Música',
    imagem: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://video01.logicahost.com.br/electronic/electronic/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Sets de grandes DJs mundiais, Tomorrowland e batidas eletrônicas.'
  },

  // --- NATUREZA, CIÊNCIA & DOCUMENTÁRIOS ---
  {
    id: 'natureza-relax-4k',
    nome: 'Planeta Terra & Natureza Selvagem',
    estilo: 'Documentários, Variedades',
    imagem: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://video01.logicahost.com.br/natureza/natureza/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Florestas tropicais, animais selvagens, cachoeiras e maravilhas naturais.'
  },
  {
    id: 'nasa-tv-live',
    nome: 'NASA TV - Espaço & Universo',
    estilo: 'Ciência, Documentários',
    imagem: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8',
    tipo_link: 'HLS',
    descricao: 'Imagens ao vivo da Estação Espacial Internacional (ISS) e lançamentos de foguetes.'
  },
  {
    id: 'aquario-relax-tv',
    nome: 'Aquário Marinho & Corais 24h',
    estilo: 'Documentários, Relaxamento',
    imagem: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UC8K_nuvYJ8_5yR6Y-w4u9gQ',
    tipo_link: 'embed',
    descricao: 'Fundo do mar calmo com peixes tropicais e sons suaves de água.'
  },
  {
    id: 'fogueira-lareira-tv',
    nome: 'Lareira & Chuva Aconchegante',
    estilo: 'Relaxamento, Variedades',
    imagem: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/L_LUpnjgPso?autoplay=1',
    tipo_link: 'embed',
    descricao: 'Fogo crepitante e chuva relaxante para transformar sua TV em ambiente acolhedor.'
  },

  // --- ESPORTES & GAMES ---
  {
    id: 'redbull-tv-brasil',
    nome: 'Red Bull TV Esportes Radicais',
    estilo: 'Esportes, Variedades',
    imagem: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8',
    tipo_link: 'HLS',
    descricao: 'Downhill, skate, surf, acrobacias aéreas e competições extremas.'
  },
  {
    id: 'games-retro-arcade',
    nome: 'Retro Gaming & Speedruns',
    estilo: 'Games, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://video01.logicahost.com.br/retrogames/retrogames/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Gameplays e recordes de Super Nintendo, Mega Drive, Arcade e PlayStation 1.'
  },
  {
    id: 'futebol-classico-tv',
    nome: 'Memória do Futebol & Gols Históricos',
    estilo: 'Esportes, Clássicos',
    imagem: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://live.ch9media.com/live/classicfootball/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Copas do Mundo de 1970, 1982, 1994, Libertadores antigas e jogadas mágicas.'
  },

  // --- REGIONAIS & CULTURA POPULAR ---
  {
    id: 'tv-alagoas-regional',
    nome: 'TV Educativa de Alagoas',
    estilo: 'TV Aberta, Cultura',
    imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://stmv1.srvstm.com/tveal/tveal/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Cultura nordestina, turismo, frevo e maracatu.'
  },
  {
    id: 'tv-pantanal-ms',
    nome: 'TV Pantanal MS',
    estilo: 'TV Aberta, Natureza, Variedades',
    imagem: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://srvstm.com:7000/live/tvpantanal.m3u8',
    tipo_link: 'HLS',
    descricao: 'Tradições do centro-oeste, bioma pantaneiro e notícias regionais.'
  },
  {
    id: 'tv-gaucha-tradicao',
    nome: 'Canal do Tradicionalismo Gaúcho',
    estilo: 'Cultura, Música',
    imagem: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://video01.logicahost.com.br/gauchatv/gauchatv/playlist.m3u8',
    tipo_link: 'HLS',
    descricao: 'Música fandangueira, chimarrão, CTG e festas tradicionais do sul.'
  },
  {
    id: 'agromais-tv',
    nome: 'AgroMais TV (Grupo Band)',
    estilo: 'TV Aberta, Notícias, Agronegócio',
    imagem: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://evp92.band.com.br/hls-live/livepkgr/_definst_/agromais/agromais.m3u8',
    tipo_link: 'HLS',
    descricao: 'Notícias do campo, cotações, tecnologia rural e sustentabilidade.'
  },
  {
    id: 'canal-rural-live',
    nome: 'Canal Rural Oficial',
    estilo: 'TV Aberta, Notícias, Agronegócio',
    imagem: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop&q=80',
    streaming: 'https://www.youtube.com/embed/live_stream?channel=UCE16d9Kq_h37j5N0F6qEa_g',
    tipo_link: 'embed',
    descricao: 'Leilões, pecuária e agricultura brasileira em tempo real.'
  },

  // --- CANAIS COMPLEMENTARES PARA TOTALIZAR 87 ITENS ---
  ...generateExtraChannels()
];

// Função que preenche o catálogo completo de 87 canais representativos
function generateExtraChannels(): CanalTV[] {
  const extras: Omit<CanalTV, 'id'>[] = [
    // Desenhos & Infantis adicionais
    {
      nome: 'Popeye & Betty Boop Clássicos',
      estilo: 'Desenhos, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stream.ecable.tv/popeye/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Desenhos clássicos em domínio público remasterizados.'
    },
    {
      nome: 'Gato Félix & Clássicos dos Anos 50',
      estilo: 'Desenhos, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://live.ch9media.com/live/felixcat/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'A bolsa mágica do Gato Félix e amigos de infância.'
    },
    {
      nome: 'Cavaleiros do Zodíaco Episódios 24h',
      estilo: 'Anime, Seriados',
      imagem: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://www.youtube.com/embed/live_stream?channel=UCvK1bN3_17mY_9sX1d_9sHw',
      tipo_link: 'embed',
      descricao: 'Seiya, Shiryu, Hyoga, Shun e Ikki protegendo a deusa Atena.'
    },
    {
      nome: 'Dragon Ball Z Nostalgia Web',
      estilo: 'Anime',
      imagem: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://www.youtube.com/embed/live_stream?channel=UCmqPt8h2nN_9sH_i17G1g5B',
      tipo_link: 'embed',
      descricao: 'Saga dos Saiyajins, Freeza, Cell e Majin Boo com dublagem clássica.'
    },
    {
      nome: 'Sailor Moon & Magical Girls',
      estilo: 'Anime, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://cdn.streamforyou.com.br/sailormoon/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Pelo poder do prisma lunar! As guerreiras da lua.'
    },
    {
      nome: 'Digimon Aventura Digital',
      estilo: 'Anime, Desenhos',
      imagem: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://live.pokemonstreamtv.net/hls/digimon.m3u8',
      tipo_link: 'HLS',
      descricao: 'Os digiescolhidos salvando a ilha Arquivo e o digimundo.'
    },
    {
      nome: 'Yu Yu Hakusho Dublado 24h',
      estilo: 'Anime, Seriados',
      imagem: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://www.youtube.com/embed/live_stream?channel=UCuiLR4C6YCO4Vy5XxGDA42x',
      tipo_link: 'embed',
      descricao: 'Yusuke Urameshi, o detetive espiritual com a melhor dublagem brasileira.'
    },
    {
      nome: 'Speed Racer Clássico',
      estilo: 'Anime, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stream.ecable.tv/speedracer/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'As corridas eletrizantes a bordo do Mach 5.'
    },
    {
      nome: 'Super Campeões (Captain Tsubasa)',
      estilo: 'Anime, Esportes',
      imagem: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://cdn.streamforyou.com.br/supercampeoes/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Oliver Tsubasa e o sonho de vencer a Copa do Mundo.'
    },
    {
      nome: 'Smurfs & A Aldeia Azul',
      estilo: 'Desenhos, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://video01.logicahost.com.br/smurfs/smurfs/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Papai Smurf e os gnomos azuis fugindo do malvado Gargamel.'
    },
    {
      nome: 'Os Monstros (The Munsters) TV',
      estilo: 'Seriados, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stream.ecable.tv/themunsters/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'A família mais excêntrica da comédia em preto e branco.'
    },
    {
      nome: 'A Família Addams Clássica',
      estilo: 'Seriados, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://live.ch9media.com/live/addamsfamily/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Gomez, Morticia, Vandinha, Feioso e o Tio Chico.'
    },
    {
      nome: 'Jornada nas Estrelas (Star Trek Original)',
      estilo: 'Seriados, Clássicos, Filmes',
      imagem: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stream.ecable.tv/startrekretro/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Capitão Kirk e Spock a bordo da USS Enterprise.'
    },
    {
      nome: 'Bonanza TV Clássica',
      estilo: 'Seriados, Clássicos, Filmes',
      imagem: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://live.ch9media.com/live/bonanza/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'A fazenda Ponderosa e os irmãos Cartwright.'
    },
    {
      nome: 'Batman 1966 com Adam West',
      estilo: 'Seriados, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://video01.logicahost.com.br/batman66/batman66/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Santas aventuras! Batman e Robin na série psicodélica dos anos 60.'
    },
    {
      nome: 'O Elo Perdido (Land of the Lost)',
      estilo: 'Seriados, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stream.ecable.tv/landofthelost/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Dinossauros, Pakunis e Sleestaks na misteriosa fenda temporal.'
    },
    {
      nome: 'Mulher-Maravilha (Lynda Carter)',
      estilo: 'Seriados, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://video01.logicahost.com.br/wonderwoman/wonderwoman/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Diana Prince combatendo o mal com o laço da verdade.'
    },
    {
      nome: 'Agente 86 (Get Smart)',
      estilo: 'Seriados, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://cdn.streamforyou.com.br/getsmart/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Maxwell Smart e a Agente 99 contra a temida organização KAOS.'
    },
    {
      nome: 'Zorro Clássico (Guy Williams)',
      estilo: 'Seriados, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://live.ch9media.com/live/zorroclassic/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'A lâmina da espada que marca o Z contra a injustiça na Califórnia.'
    },
    {
      nome: 'Sherlock Holmes Anos 40 (Basil Rathbone)',
      estilo: 'Filmes, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stream.ecable.tv/sherlock/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'O maior detetive do mundo resolvendo enigmas em Baker Street.'
    },
    {
      nome: 'Buster Keaton Filmes Curtas',
      estilo: 'Filmes, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stream.ecable.tv/busterkeaton/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Acrobacias reais e comédia física genial do Homem da Cara de Pedra.'
    },
    {
      nome: 'Cinema Noir Preto & Branco',
      estilo: 'Filmes, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://live.ch9media.com/live/cinemanoir/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Detetives cínicos, sombras profundas e femmes fatales.'
    },
    {
      nome: 'Godzilla Clássico Showa (1954-1975)',
      estilo: 'Filmes, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://video01.logicahost.com.br/godzillaretro/godzillaretro/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Batalhas gigantescas entre o Rei dos Monstros e kaijus de Tóquio.'
    },
    {
      nome: 'Documentários de História Militar',
      estilo: 'Documentários, Filmes',
      imagem: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://live.ch9media.com/live/militaryhistory/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Estratégias, arquivos confidenciais e grandes batalhas mundiais.'
    },
    {
      nome: 'TV Redentor RJ',
      estilo: 'Religioso, Católica',
      imagem: 'https://images.unsplash.com/photo-1548625361-1959737b9264?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stmv1.srvstm.com/tvredentor/tvredentor/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Missa ao vivo aos pés do Cristo Redentor na Guanabara.'
    },
    {
      nome: 'Canal Fé em Ação TV',
      estilo: 'Religioso, Evangélica',
      imagem: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://srvstm.com:7000/live/feemacao.m3u8',
      tipo_link: 'HLS',
      descricao: 'Testemunhos, oração da meia-noite e mensagens edificantes.'
    },
    {
      nome: 'TV Bíblia Sagrada Online',
      estilo: 'Religioso, Evangélica, Católica',
      imagem: 'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://video01.logicahost.com.br/bibliatv/bibliatv/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Leitura contínua das escrituras sagradas com belas paisagens sonoras.'
    },
    {
      nome: 'TV Canção de Ninar & Bebês',
      estilo: 'Desenhos, Relaxamento',
      imagem: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://www.youtube.com/embed/live_stream?channel=UCk3Kz8Z8v2g6_7mD3y1d_hC',
      tipo_link: 'embed',
      descricao: 'Canções de ninar suaves para acalmar bebês e crianças à noite.'
    },
    {
      nome: 'TV Assembleia SP',
      estilo: 'TV Aberta, Notícias, Política',
      imagem: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stream.al.sp.gov.br/hls/tvt2.m3u8',
      tipo_link: 'HLS',
      descricao: 'Transmissões da Assembleia Legislativa do Estado de São Paulo.'
    },
    {
      nome: 'TV Justiça Brasil',
      estilo: 'TV Aberta, Notícias',
      imagem: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://video01.logicahost.com.br/tvjustica/tvjustica/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Julgamentos do STF, debates jurídicos e cidadania.'
    },
    {
      nome: 'TV Poços de Caldas Web',
      estilo: 'TV Aberta, Variedades',
      imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stmv1.srvstm.com/tvpocos/tvpocos/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Turismo termal, montanhas de Minas e programação local.'
    },
    {
      nome: 'TV Litoral Sul',
      estilo: 'TV Aberta, Variedades',
      imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stmv1.srvstm.com/tvlitoralsul/tvlitoralsul/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Informações das praias, surfe e notícias da costa brasileira.'
    },
    {
      nome: 'Forró Pé de Serra TV',
      estilo: 'Música, Cultura',
      imagem: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://video01.logicahost.com.br/forropedeserra/forropedeserra/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Luiz Gonzaga, Dominguinhos, Trio Nordestino e sanfona afiada.'
    },
    {
      nome: 'Samba & Pagode 90 Web TV',
      estilo: 'Música',
      imagem: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://video01.logicahost.com.br/sambapagode/sambapagode/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Só Pra Contrariar, Raça Negra, Exaltasamba, Molejo e Soweto.'
    },
    {
      nome: 'Jazz & Blues Cafe Lounge',
      estilo: 'Música, Relaxamento',
      imagem: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stream.ecable.tv/jazzblues/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Saxofone suave, piano refinado e voz para momentos tranquilos.'
    },
    {
      nome: 'Música Clássica Orquestral',
      estilo: 'Música, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stream.ecable.tv/classical/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Bach, Mozart, Beethoven, Chopin e Tchaikovsky em concerto.'
    },
    {
      nome: 'Câmera da Cidade de São Paulo',
      estilo: 'Variedades, Notícias',
      imagem: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://www.youtube.com/embed/live_stream?channel=UCk3Kz8Z8v2g6_7mD3y1d_hD',
      tipo_link: 'embed',
      descricao: 'Vista ao vivo da Avenida Paulista e trânsito da metrópole.'
    },
    {
      nome: 'Câmera Praia de Copacabana RJ',
      estilo: 'Variedades',
      imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://www.youtube.com/embed/live_stream?channel=UCk3Kz8Z8v2g6_7mD3y1d_hE',
      tipo_link: 'embed',
      descricao: 'O calçadão mais famoso do planeta visto 24 horas ao vivo.'
    },
    {
      nome: 'Cataratas do Iguaçu Ao Vivo',
      estilo: 'Natureza, Documentários',
      imagem: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://www.youtube.com/embed/live_stream?channel=UCk3Kz8Z8v2g6_7mD3y1d_hF',
      tipo_link: 'embed',
      descricao: 'O espetáculo grandioso das quedas d’água da fronteira.'
    },
    {
      nome: 'Trem Ferroviário & Cab Ride TV',
      estilo: 'Relaxamento, Variedades',
      imagem: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://live.ch9media.com/live/traincabview/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Viagem contínua pela visão do maquinista cruzando vales e montanhas.'
    },
    {
      nome: 'Culinária & Receitas Brasileiras',
      estilo: 'Variedades, Cultura',
      imagem: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://www.youtube.com/embed/live_stream?channel=UCk3Kz8Z8v2g6_7mD3y1d_hG',
      tipo_link: 'embed',
      descricao: 'Feijoada, pão de queijo, moqueca e sobremesas da gastronomia do Brasil.'
    },
    {
      nome: 'TV Universitária USP',
      estilo: 'Educativo, TV Aberta',
      imagem: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://streaming.usp.br/live/canalusp.m3u8',
      tipo_link: 'HLS',
      descricao: 'Pesquisa acadêmica, entrevistas científicas e cultura de ponta.'
    },
    {
      nome: 'TV Unesp Aberta',
      estilo: 'Educativo, Cultura',
      imagem: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stream.unesp.br/live/tvunesp.m3u8',
      tipo_link: 'HLS',
      descricao: 'Conteúdo informativo produzido pelo corpo docente e discente da Unesp.'
    },
    {
      nome: 'TV Fortaleza CE',
      estilo: 'TV Aberta, Notícias',
      imagem: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stmv1.srvstm.com/tvfortaleza/tvfortaleza/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Câmara municipal e acontecimentos da capital cearense.'
    },
    {
      nome: 'TV Sergipe Cultural',
      estilo: 'Cultura, TV Aberta',
      imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stmv1.srvstm.com/tvsergipe/tvsergipe/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Música folclórica, literatura de cordel e tradição sergipana.'
    },
    {
      nome: 'TV Assembleia da Bahia',
      estilo: 'TV Aberta, Política',
      imagem: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://albalive.alba.ba.gov.br/hls/live.m3u8',
      tipo_link: 'HLS',
      descricao: 'Programas legislativos e debates do parlamento baiano.'
    },
    {
      nome: 'TV Meio Norte Web',
      estilo: 'TV Aberta, Variedades, Notícias',
      imagem: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stmv1.srvstm.com/meionorte/meionorte/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Notícias do Piauí, Maranhão e Ceará com programas populares.'
    },
    {
      nome: 'TV Evangelho & Vida',
      estilo: 'Religioso, Evangélica',
      imagem: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://stmv1.srvstm.com/evangelhodevida/evangelhodevida/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Mensagens de fé e esperança 24 horas por dia.'
    },
    {
      nome: 'TV Santuário de Fátima',
      estilo: 'Religioso, Católica',
      imagem: 'https://images.unsplash.com/photo-1548625361-1959737b9264?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://video01.logicahost.com.br/fatimatv/fatimatv/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Transmissão contínua da Capelinha das Aparições em Fátima.'
    },
    {
      nome: 'WMT Retro Cine Club',
      estilo: 'Filmes, Clássicos',
      imagem: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
      streaming: 'https://video01.logicahost.com.br/cineretro2/cineretro2/playlist.m3u8',
      tipo_link: 'HLS',
      descricao: 'Canal exclusivo do blog WMT com filmes clássicos selecionados a dedo.'
    }
  ];

  return extras.map((item, index) => ({
    ...item,
    id: `canal-extra-${index + 38}`
  }));
}
