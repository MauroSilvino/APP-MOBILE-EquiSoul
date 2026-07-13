/**
 * Camada de integração mockada com um serviço de IA. As funções reais (KAN-265, KAN-267, KAN-268)
 * simulam latência e retornam conteúdo estático — a interface é o contrato estável que uma troca
 * futura por um provedor de IA real (ex.: Claude API) deve respeitar sem exigir mudanças na UI.
 */

export interface CreativeStudioRequest {
  tipo: string;
  plataforma: string;
}

export interface CreativeStudioResponse {
  previewLabel: string;
}

export interface AssistantRequest {
  pergunta: string;
}

export interface AssistantResponse {
  resposta: string;
}

export interface AIService {
  generateCreativeContent(request: CreativeStudioRequest): Promise<CreativeStudioResponse>;
  askAssistant(request: AssistantRequest): Promise<AssistantResponse>;
}

const RESPOSTAS_CONHECIDAS: { pergunta: string; resposta: string }[] = [
  {
    pergunta: 'como evoluímos este mês?',
    resposta:
      'Vocês aumentaram a frequência de treinos em 18% e os registros ficaram visivelmente mais tranquilos.',
  },
  {
    pergunta: 'qual foi nosso momento mais marcante?',
    resposta:
      'A primeira competição em abril — o dia em que a confiança que construíram juntos apareceu inteira.',
  },
  {
    pergunta: 'quais memórias você recomenda rever?',
    resposta: 'A trilha de setembro e o vídeo do primeiro salto — dois marcos bonitos da jornada de vocês.',
  },
  {
    pergunta: 'existe algum padrão interessante?',
    resposta: 'Sim — os treinos pela manhã costumam terminar com registros mais positivos que os da tarde.',
  },
  {
    pergunta: 'quais foram nossos maiores desafios?',
    resposta: 'Os primeiros meses de adaptação a terrenos novos, quando ainda havia insegurança nas trilhas.',
  },
  {
    pergunta: 'crie uma retrospectiva da nossa história.',
    resposta: 'Já comecei a reunir fotos, cartas e conquistas de vocês dois — a retrospectiva estará pronta em instantes.',
  },
];

const RESPOSTA_PADRAO =
  'Ainda estou aprendendo sobre esse tema com o diário de vocês — em breve terei uma resposta melhor.';

export const mockAIService: AIService = {
  generateCreativeContent({ tipo, plataforma }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ previewLabel: `pronto · ${tipo} para ${plataforma}` });
      }, 1500);
    });
  },
  askAssistant({ pergunta }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const conhecida = RESPOSTAS_CONHECIDAS.find(
          (r) => r.pergunta === pergunta.trim().toLowerCase()
        );
        resolve({ resposta: conhecida?.resposta ?? RESPOSTA_PADRAO });
      }, 900);
    });
  },
};
