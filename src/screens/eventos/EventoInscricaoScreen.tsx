import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Checkbox } from '../../components/ui/Checkbox';
import { Chip } from '../../components/ui/Chip';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useEventsStore } from '../../store/useEventsStore';
import { useHorseStore } from '../../store/useHorseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'EventoInscricao'>;

const CATEGORIAS = ['Iniciante', 'Amador', 'Profissional'];
const PAGAMENTOS = ['Apple Pay', 'Google Pay', 'PIX', 'Cartão'];
const DOCUMENTOS_DEFS = [
  { key: 'atestado', label: 'Atestado de sanidade do cavalo' },
  { key: 'ficha', label: 'Ficha de inscrição preenchida' },
  { key: 'seguro', label: 'Seguro do evento' },
] as const;

export function EventoInscricaoScreen({ navigation, route }: Props) {
  const evento = useEventsStore((state) => state.eventos.find((item) => item.id === route.params.eventId));
  const eventoStatus = useEventsStore((state) => state.getEventStatus(route.params.eventId));
  const inscrever = useEventsStore((state) => state.inscrever);
  const horse = useHorseStore((state) => state.horses[0] ?? null);

  const [categoria, setCategoria] = useState('Amador');
  const [documentos, setDocumentos] = useState<Record<string, boolean>>({ atestado: false, ficha: false, seguro: false });
  const [pagamento, setPagamento] = useState('PIX');
  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calendarioAdicionado, setCalendarioAdicionado] = useState(false);

  if (!evento) return null;

  function toggleDoc(key: string) {
    setDocumentos((current) => ({ ...current, [key]: !current[key] }));
  }

  function confirmarInscricao() {
    if (loading || !evento) return;
    const todosMarcados = Object.values(documentos).every(Boolean);
    if (!todosMarcados) {
      setErro(true);
      return;
    }
    setErro(false);
    setLoading(true);
    setTimeout(() => {
      inscrever(evento.id);
      setLoading(false);
    }, 900);
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        {!eventoStatus.inscrito ? (
          <>
            <Text variant="xxl" weight="extraBold">
              Inscrição
            </Text>
            <Text variant="sm" weight="semiBold" color="secondary" style={styles.subtitle}>
              {evento.titulo}
            </Text>

            <Text variant="xs" weight="bold" style={styles.sectionLabel}>
              CATEGORIA
            </Text>
            <View style={styles.chipsWrap}>
              {CATEGORIAS.map((label) => (
                <Chip key={label} label={label} selected={categoria === label} onPress={() => setCategoria(label)} />
              ))}
            </View>

            <Text variant="xs" weight="bold" style={styles.sectionLabel}>
              CAVALO
            </Text>
            <View style={styles.cavaloRow}>
              <View style={styles.cavaloAvatar} />
              <Text variant="sm" weight="bold">
                {horse?.nome ?? 'seu cavalo'}
              </Text>
            </View>

            <Text variant="xs" weight="bold" style={styles.sectionLabel}>
              DOCUMENTOS
            </Text>
            <View style={styles.documentosList}>
              {DOCUMENTOS_DEFS.map((doc) => (
                <Checkbox key={doc.key} checked={documentos[doc.key]} onToggle={() => toggleDoc(doc.key)}>
                  {doc.label}
                </Checkbox>
              ))}
            </View>

            <Text variant="xs" weight="bold" style={styles.sectionLabel}>
              PAGAMENTO
            </Text>
            <View style={styles.chipsWrap}>
              {PAGAMENTOS.map((label) => (
                <Chip key={label} label={label} selected={pagamento === label} onPress={() => setPagamento(label)} />
              ))}
            </View>

            {erro && (
              <View style={styles.erroBox}>
                <Text variant="sm" weight="semiBold" color={theme.colors.error}>
                  Marque todos os documentos obrigatórios antes de confirmar.
                </Text>
              </View>
            )}

            <Pressable style={[styles.confirmarButton, loading && styles.confirmarButtonLoading]} onPress={confirmarInscricao}>
              <Text variant="lg" weight="extraBold">
                {loading ? 'Confirmando…' : `Confirmar inscrição · ${evento.precoLabel}`}
              </Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.confirmado}>
            <View style={styles.confirmadoIcon}>
              <CheckIcon size={28} color={theme.colors.accent.moss} strokeWidth={2.4} />
            </View>
            <Text variant="xl" weight="extraBold">
              Inscrição confirmada
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.confirmadoText}>
              Nos vemos em {evento.titulo}. Faça o check-in no dia para liberar o álbum colaborativo.
            </Text>
            <View style={styles.confirmadoActions}>
              <Pressable style={styles.outlineButtonSmall} onPress={() => setCalendarioAdicionado((v) => !v)}>
                <Text variant="sm" weight="bold">
                  {calendarioAdicionado ? 'Adicionada ✓' : 'Adicionar ao calendário'}
                </Text>
              </Pressable>
              <Pressable
                style={styles.checkinButton}
                onPress={() => navigation.navigate('EventoCheckin', { eventId: evento.id })}
              >
                <Text variant="sm" weight="bold">
                  Ver check-in
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
        <BackIcon size={16} />
      </Pressable>

      <BottomTabBar active="Comunidade" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 60,
    paddingBottom: 130,
  },
  subtitle: {
    marginTop: 4,
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chipsWrap: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  cavaloRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(43,41,36,0.05)',
  },
  cavaloAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.placeholder.background,
  },
  documentosList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  erroBox: {
    marginTop: theme.spacing.md,
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(184,92,76,0.08)',
  },
  confirmarButton: {
    marginTop: theme.spacing.xl,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmarButtonLoading: {
    opacity: 0.55,
  },
  confirmado: {
    minHeight: 600,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  confirmadoIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(107,115,83,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmadoText: {
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 21,
  },
  confirmadoActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  outlineButtonSmall: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkinButton: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 24,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 4,
  },
});
