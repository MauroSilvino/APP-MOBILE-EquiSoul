import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CartaAI {
  id: string;
  tipo: string;
  data: string;
  humor: string;
  tempo: string;
  texto: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  texto: string;
}

export const CARTAS_IA: CartaAI[] = [
  {
    id: 'carta-1',
    tipo: 'Carta do cavalo',
    data: 'Hoje',
    humor: 'grato',
    tempo: '1 min de leitura',
    texto:
      'Hoje senti você mais confiante do que na semana passada. Mesmo quando hesitamos naquele obstáculo, você não desistiu de mim. Foi um bom dia.',
  },
  {
    id: 'carta-2',
    tipo: 'Carta para o cavaleiro',
    data: 'Ontem',
    humor: 'orgulhoso',
    tempo: '2 min de leitura',
    texto:
      'Você não viu, mas percebi como ficou mais calmo depois do treino de ontem. Isso muda tudo entre nós dois.',
  },
  {
    id: 'carta-3',
    tipo: 'Carta de conquista',
    data: '28 de junho',
    humor: 'animado',
    tempo: '1 min de leitura',
    texto:
      'Aquele salto que vocês conquistaram juntos hoje ficará guardado — foi o resultado de meses de confiança construída devagar.',
  },
  {
    id: 'carta-4',
    tipo: 'Carta motivacional',
    data: '15 de junho',
    humor: 'esperançoso',
    tempo: '1 min de leitura',
    texto:
      'Os dias difíceis também contam. Vocês voltaram ao picadeiro depois do tropeço, e isso já é uma vitória silenciosa.',
  },
];

export interface InsightAI {
  id: string;
  texto: string;
  detalhe: string;
}

export const INSIGHTS_IA: InsightAI[] = [
  {
    id: 'insight-1',
    texto: 'Vocês costumam treinar melhor pela manhã — os registros desses dias são mais positivos.',
    detalhe:
      'Nos últimos 30 dias, 8 de 10 treinos matinais tiveram humor "feliz" ou "orgulhoso" registrado, contra 3 de 9 treinos à tarde.',
  },
  {
    id: 'insight-2',
    texto: 'Seu cavalo parece mais tranquilo depois das trilhas do que depois dos treinos na pista.',
    detalhe: 'As anotações após trilhas mencionam palavras como "calmo" e "relaxado" com o dobro da frequência.',
  },
  {
    id: 'insight-3',
    texto: 'Os passeios em grupo geram mais registros felizes do que os passeios sozinhos.',
    detalhe: 'Passeios acompanhados têm 70% de registros com humor positivo, contra 45% dos passeios sozinhos.',
  },
  {
    id: 'insight-4',
    texto: 'Vocês estão há 20 dias consecutivos criando memórias juntos.',
    detalhe: 'Uma sequência assim aumenta a chance de a IA identificar novos padrões emocionais na parceria.',
  },
];

export interface HistoriaCapitulo {
  id: string;
  titulo: string;
  texto: string;
}

export const HISTORIAS_IA: HistoriaCapitulo[] = [
  {
    id: 'historia-1',
    titulo: 'O verão em que vocês descobriram as trilhas',
    texto:
      'Entre junho e agosto, os passeios se tornaram o momento favorito da semana — e a confiança nos caminhos novos cresceu aos poucos.',
  },
  {
    id: 'historia-2',
    titulo: 'A temporada das primeiras competições',
    texto: 'Nervosismo, orgulho e uma medalha guardada para sempre na memória de vocês dois.',
  },
  {
    id: 'historia-3',
    titulo: 'O ano em que vocês aprenderam a confiar um no outro',
    texto: 'Do primeiro treino inseguro à parceria de hoje — doze meses de evolução silenciosa.',
  },
];

export interface SugestaoAI {
  id: string;
  texto: string;
}

export const SUGESTOES_IA: SugestaoAI[] = [
  { id: 'sugestao-1', texto: 'Hoje pode ser um ótimo dia para uma trilha curta.' },
  { id: 'sugestao-2', texto: 'Há um tempo vocês não registram uma foto juntos.' },
  { id: 'sugestao-3', texto: 'Seu cavalo costuma responder bem a treinos leves após competições.' },
];

export const FREE_QUESTIONS_LIMIT = 5;

interface AIState {
  cartasFavoritas: string[];
  cartasSalvas: string[];
  cartasNoAlbum: string[];
  toggleCartaFavorita: (id: string) => void;
  marcarCartaSalva: (id: string) => void;
  marcarCartaNoAlbum: (id: string) => void;

  insightsIgnorados: string[];
  insightsSalvos: string[];
  ignorarInsight: (id: string) => void;
  restaurarInsight: (id: string) => void;
  salvarInsight: (id: string) => void;

  sugestoesAceitas: string[];
  sugestoesDepois: string[];
  aceitarSugestao: (id: string) => void;
  adiarSugestao: (id: string) => void;

  mensagens: ChatMessage[];
  perguntasUsadas: number;
  addMensagem: (mensagem: ChatMessage) => void;
  incrementarPerguntasUsadas: () => void;
}

export const useAIStore = create<AIState>()(
  persist(
    (set) => ({
      cartasFavoritas: [],
      cartasSalvas: [],
      cartasNoAlbum: [],
      toggleCartaFavorita: (id) =>
        set((state) => ({
          cartasFavoritas: state.cartasFavoritas.includes(id)
            ? state.cartasFavoritas.filter((x) => x !== id)
            : [...state.cartasFavoritas, id],
        })),
      marcarCartaSalva: (id) =>
        set((state) => ({
          cartasSalvas: state.cartasSalvas.includes(id) ? state.cartasSalvas : [...state.cartasSalvas, id],
        })),
      marcarCartaNoAlbum: (id) =>
        set((state) => ({
          cartasNoAlbum: state.cartasNoAlbum.includes(id) ? state.cartasNoAlbum : [...state.cartasNoAlbum, id],
        })),

      insightsIgnorados: [],
      insightsSalvos: [],
      ignorarInsight: (id) =>
        set((state) => ({ insightsIgnorados: [...state.insightsIgnorados, id] })),
      restaurarInsight: (id) =>
        set((state) => ({ insightsIgnorados: state.insightsIgnorados.filter((x) => x !== id) })),
      salvarInsight: (id) =>
        set((state) => ({
          insightsSalvos: state.insightsSalvos.includes(id) ? state.insightsSalvos : [...state.insightsSalvos, id],
        })),

      sugestoesAceitas: [],
      sugestoesDepois: [],
      aceitarSugestao: (id) =>
        set((state) => ({
          sugestoesAceitas: state.sugestoesAceitas.includes(id)
            ? state.sugestoesAceitas
            : [...state.sugestoesAceitas, id],
        })),
      adiarSugestao: (id) =>
        set((state) => ({
          sugestoesDepois: state.sugestoesDepois.includes(id) ? state.sugestoesDepois : [...state.sugestoesDepois, id],
        })),

      mensagens: [],
      perguntasUsadas: 0,
      addMensagem: (mensagem) => set((state) => ({ mensagens: [...state.mensagens, mensagem] })),
      incrementarPerguntasUsadas: () => set((state) => ({ perguntasUsadas: state.perguntasUsadas + 1 })),
    }),
    {
      name: 'equisoul-ai-assistant',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mensagens: state.mensagens, perguntasUsadas: state.perguntasUsadas }),
    }
  )
);
