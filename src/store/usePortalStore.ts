import { create } from 'zustand';

export interface PortalCliente {
  id: number;
  nome: string;
  cidade: string;
  cavalos: number;
  ultimo: string;
  avaliacao: string;
}

export interface PortalAtendimento {
  id: number;
  hora: string;
  servico: string;
  cliente: string;
  cavalo: string;
  local: string;
  status: 'Confirmado' | 'Pendente';
  acoes: string[];
  acaoFeita: string | null;
}

export interface PortalCavaloAtendido {
  nome: string;
  raca: string;
  idade: string;
  proprietario: string;
  ultimo: string;
}

export interface PortalServico {
  nome: string;
  categoria: string;
  duracao: string;
  preco: string;
}

export type PortalReservaStatus = 'Pendente' | 'Confirmada' | 'Cancelada' | 'Concluída';

export interface PortalReserva {
  id: number;
  cliente: string;
  servico: string;
  data: string;
  status: PortalReservaStatus;
}

export interface PortalAvaliacao {
  nome: string;
  nota: string;
  comentario: string;
}

export interface PortalConteudoItem {
  titulo: string;
  tipo: string;
}

export type PortalParticipanteStatus = 'Confirmado' | 'Pendente' | 'Check-in' | 'VIP';

export interface PortalParticipante {
  id: number;
  nome: string;
  categoria: string;
  status: PortalParticipanteStatus;
}

export interface PortalCertificado {
  nome: string;
  data: string;
}

export interface PortalProduto {
  nome: string;
  categoria: string;
  sku: string;
  preco: string;
}

export const PEDIDO_TIMELINE = ['Novo', 'Pago', 'Separação', 'Enviado', 'Entregue'] as const;

export interface PortalPedido {
  id: number;
  numero: string;
  cliente: string;
  valor: string;
  etapaAtual: number;
}

export interface PortalEstoqueItem {
  nome: string;
  qtd: number;
  percent: number;
  baixo: boolean;
  reposto: boolean;
}

export interface PortalPromocao {
  nome: string;
  tipo: string;
  validade: string;
}

export const RESERVA_FLUXO = ['Solicitação', 'Aceite', 'Pagamento', 'Atendimento', 'Avaliação'];
export const RESERVA_ETAPA: Record<PortalReservaStatus, number> = {
  Pendente: 0,
  Confirmada: 2,
  Cancelada: 0,
  Concluída: 4,
};

interface PortalStoreState {
  clientes: PortalCliente[];
  clienteHistoricoPorAba: Record<string, { titulo: string; data: string; valor: string }[]>;
  atendimentos: PortalAtendimento[];
  aplicarAcaoAtendimento: (id: number, acao: string) => void;
  cavalosAtendidos: PortalCavaloAtendido[];
  servicos: PortalServico[];
  addServico: (s: PortalServico) => void;
  reservas: PortalReserva[];
  setReservaStatus: (id: number, status: PortalReservaStatus) => void;
  avaliacoes: PortalAvaliacao[];
  portfolioItens: string[];
  conteudo: PortalConteudoItem[];
  eventosCriados: number;
  addEvento: () => void;
  participantes: PortalParticipante[];
  checkinParticipante: (id: number) => void;
  certificadosOrganizador: PortalCertificado[];
  produtos: PortalProduto[];
  addProduto: (p: PortalProduto) => void;
  pedidos: PortalPedido[];
  avancarPedido: (id: number) => void;
  estoque: PortalEstoqueItem[];
  reporEstoque: (nome: string) => void;
  promocoes: PortalPromocao[];
  addPromocao: (p: PortalPromocao) => void;
}

export const usePortalStore = create<PortalStoreState>((set) => ({
  clientes: [
    { id: 0, nome: 'Mauro Andrade', cidade: 'São Paulo, SP', cavalos: 1, ultimo: 'jun/2026', avaliacao: '5.0' },
    { id: 1, nome: 'Carlos Melo', cidade: 'Belo Horizonte, MG', cavalos: 2, ultimo: 'mai/2026', avaliacao: '4.8' },
    { id: 2, nome: 'Helena Ribeiro', cidade: 'Curitiba, PR', cavalos: 1, ultimo: 'jul/2026', avaliacao: '5.0' },
    { id: 3, nome: 'Ana Ferraz', cidade: 'Porto Alegre, RS', cavalos: 1, ultimo: 'abr/2026', avaliacao: '4.6' },
    { id: 4, nome: 'João Ferrador', cidade: 'Ribeirão Preto, SP', cavalos: 1, ultimo: 'mai/2026', avaliacao: '4.9' },
    { id: 5, nome: 'Renata Souza', cidade: 'Florianópolis, SC', cavalos: 2, ultimo: 'fev/2026', avaliacao: '5.0' },
  ],
  clienteHistoricoPorAba: {
    Histórico: [
      { titulo: 'Consulta de rotina', data: '20 jun 2026', valor: 'R$ 280' },
      { titulo: 'Vacinação', data: '02 mar 2026', valor: 'R$ 150' },
      { titulo: 'Avaliação inicial', data: '14 nov 2025', valor: 'R$ 320' },
    ],
    Serviços: [
      { titulo: 'Consulta de rotina', data: 'contratado', valor: 'R$ 280' },
      { titulo: 'Fisioterapia mensal', data: 'contratado', valor: 'R$ 190' },
    ],
    Mensagens: [
      { titulo: '"Obrigado pelo atendimento de hoje!"', data: 'há 2 dias', valor: '' },
      { titulo: '"Podemos remarcar para sexta?"', data: 'há 1 semana', valor: '' },
    ],
    Pagamentos: [
      { titulo: 'Pagamento via PIX', data: '20 jun 2026', valor: 'R$ 280' },
      { titulo: 'Pagamento via cartão', data: '02 mar 2026', valor: 'R$ 150' },
    ],
    Arquivos: [
      { titulo: 'Exame de sangue.pdf', data: '20 jun 2026', valor: '' },
      { titulo: 'Raio-x casco.jpg', data: '14 nov 2025', valor: '' },
    ],
    Observações: [
      { titulo: 'Cliente sensível a horários matutinos', data: '', valor: '' },
      { titulo: 'Prefere contato via WhatsApp', data: '', valor: '' },
    ],
  },
  atendimentos: [
    {
      id: 0,
      hora: '09:00',
      servico: 'Consulta de rotina',
      cliente: 'Mauro Andrade',
      cavalo: 'Bela',
      local: 'Haras Boa Vista',
      status: 'Confirmado',
      acoes: ['Enviar mensagem', 'Abrir navegação'],
      acaoFeita: null,
    },
    {
      id: 1,
      hora: '11:30',
      servico: 'Avaliação ortopédica',
      cliente: 'Carlos Melo',
      cavalo: 'Trovão',
      local: 'Clínica Hípica SP',
      status: 'Pendente',
      acoes: ['Confirmar', 'Reagendar', 'Cancelar'],
      acaoFeita: null,
    },
    {
      id: 2,
      hora: '15:00',
      servico: 'Vacinação',
      cliente: 'Helena Ribeiro',
      cavalo: 'Luna',
      local: 'Haras Vale Verde',
      status: 'Confirmado',
      acoes: ['Enviar mensagem'],
      acaoFeita: null,
    },
  ],
  aplicarAcaoAtendimento: (id, acao) => {
    const labels: Record<string, string> = {
      Confirmar: 'Confirmado ✓',
      Reagendar: 'Reagendamento solicitado ✓',
      Cancelar: 'Cancelado ✓',
      'Enviar mensagem': 'Mensagem enviada ✓',
      'Abrir navegação': 'Navegação aberta ✓',
    };
    set((s) => ({
      atendimentos: s.atendimentos.map((a) => (a.id === id ? { ...a, acaoFeita: labels[acao] ?? acao } : a)),
    }));
  },
  cavalosAtendidos: [
    { nome: 'Bela', raca: 'Mangalarga', idade: '8 anos', proprietario: 'Mauro Andrade', ultimo: 'jun/2026' },
    { nome: 'Luna', raca: 'Lusitano', idade: '6 anos', proprietario: 'Helena Ribeiro', ultimo: 'jul/2026' },
    { nome: 'Trovão', raca: 'Quarto de Milha', idade: '10 anos', proprietario: 'Carlos Melo', ultimo: 'mai/2026' },
  ],
  servicos: [
    { nome: 'Consulta de rotina', categoria: 'Clínica geral', duracao: '45 min', preco: 'R$ 280' },
    { nome: 'Ferrageamento completo', categoria: 'Casco', duracao: '1h', preco: 'R$ 220' },
    { nome: 'Sessão de fisioterapia', categoria: 'Reabilitação', duracao: '1h', preco: 'R$ 190' },
    { nome: 'Avaliação ortopédica', categoria: 'Clínica geral', duracao: '1h30', preco: 'R$ 450' },
  ],
  addServico: (svc) => set((s) => ({ servicos: [...s.servicos, svc] })),
  reservas: [
    { id: 0, cliente: 'Ana Ferraz', servico: 'Consulta de rotina', data: '10 jul, 09:00', status: 'Pendente' },
    { id: 1, cliente: 'João Ferrador', servico: 'Avaliação de casco', data: '11 jul, 14:00', status: 'Confirmada' },
    { id: 2, cliente: 'Helena Ribeiro', servico: 'Vacinação', data: '15 jul, 10:00', status: 'Concluída' },
  ],
  setReservaStatus: (id, status) =>
    set((s) => ({ reservas: s.reservas.map((r) => (r.id === id ? { ...r, status } : r)) })),
  avaliacoes: [
    { nome: 'Mauro Andrade', nota: '5.0', comentario: 'Atendimento pontual e muito cuidadoso com a Bela.' },
    { nome: 'Carlos Melo', nota: '4.8', comentario: 'Explicou tudo com clareza, recomendo.' },
    { nome: 'Ana Ferraz', nota: '4.5', comentario: 'Ótimo profissional, só o horário atrasou um pouco.' },
  ],
  portfolioItens: [
    'Antes e depois · casco',
    'Sessão de fisioterapia',
    'Atendimento de campo',
    'Consulta em haras',
    'Reabilitação',
    'Vacinação em grupo',
    'Avaliação postural',
    'Acompanhamento de parto',
  ],
  conteudo: [
    { titulo: 'Sinais de que seu cavalo precisa de atenção veterinária', tipo: 'Artigo' },
    { titulo: 'Rotina de cuidados pós-treino', tipo: 'Dica' },
    { titulo: 'Live: perguntas sobre alimentação equina', tipo: 'Live' },
  ],
  eventosCriados: 0,
  addEvento: () => set((s) => ({ eventosCriados: s.eventosCriados + 1 })),
  participantes: [
    { id: 0, nome: 'Mauro Andrade', categoria: 'Cavaleiro', status: 'Confirmado' },
    { id: 1, nome: 'Carlos Melo', categoria: 'Cavaleiro', status: 'Check-in' },
    { id: 2, nome: 'Dra. Marina Kist', categoria: 'Profissional', status: 'VIP' },
    { id: 3, nome: 'Revista Equestre', categoria: 'Imprensa', status: 'Confirmado' },
  ],
  checkinParticipante: (id) =>
    set((s) => ({ participantes: s.participantes.map((p) => (p.id === id ? { ...p, status: 'Check-in' } : p)) })),
  certificadosOrganizador: [
    { nome: 'Mauro Andrade — 3º lugar', data: '02 jul 2026' },
    { nome: 'Carlos Melo — participação', data: '02 jul 2026' },
    { nome: 'Helena Ribeiro — 1º lugar', data: '02 jul 2026' },
  ],
  produtos: [
    { nome: 'Sela clássica em couro', categoria: 'Selaria', sku: 'SEL-001', preco: 'R$ 1.890' },
    { nome: 'Manta térmica', categoria: 'Acessórios', sku: 'ACE-014', preco: 'R$ 210' },
    { nome: 'Suplemento articular', categoria: 'Nutrição', sku: 'NUT-032', preco: 'R$ 165' },
    { nome: 'Cabresto de couro', categoria: 'Selaria', sku: 'SEL-009', preco: 'R$ 145' },
  ],
  addProduto: (p) => set((s) => ({ produtos: [...s.produtos, p] })),
  pedidos: [
    { id: 0, numero: '8821', cliente: 'Mauro Andrade', valor: 'R$ 340', etapaAtual: 3 },
    { id: 1, numero: '8822', cliente: 'Ana Ferraz', valor: 'R$ 210', etapaAtual: 1 },
    { id: 2, numero: '8823', cliente: 'Carlos Melo', valor: 'R$ 1.890', etapaAtual: 4 },
  ],
  avancarPedido: (id) =>
    set((s) => ({
      pedidos: s.pedidos.map((p) =>
        p.id === id ? { ...p, etapaAtual: Math.min(p.etapaAtual + 1, PEDIDO_TIMELINE.length - 1) } : p
      ),
    })),
  estoque: [
    { nome: 'Manta térmica', qtd: 42, percent: 80, baixo: false, reposto: false },
    { nome: 'Suplemento articular', qtd: 8, percent: 15, baixo: true, reposto: false },
    { nome: 'Cabresto de couro', qtd: 26, percent: 55, baixo: false, reposto: false },
    { nome: 'Sela clássica em couro', qtd: 3, percent: 10, baixo: true, reposto: false },
  ],
  reporEstoque: (nome) =>
    set((s) => ({
      estoque: s.estoque.map((e) =>
        e.nome === nome ? { ...e, qtd: e.qtd + 40, percent: 90, baixo: false, reposto: true } : e
      ),
    })),
  promocoes: [
    { nome: 'Frete grátis acima de R$ 300', tipo: 'Frete', validade: '31 jul' },
    { nome: 'Combo Casco Saudável', tipo: 'Combo', validade: '15 ago' },
    { nome: 'Cupom BEMVINDO10', tipo: 'Cupom', validade: '31 dez' },
  ],
  addPromocao: (p) => set((s) => ({ promocoes: [...s.promocoes, p] })),
}));
