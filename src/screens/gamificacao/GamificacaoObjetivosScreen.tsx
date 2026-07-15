import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { BackIcon, PlusIcon, TargetIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useGamificationStore } from '../../store/useGamificationStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GamificacaoObjetivos'>;

export function GamificacaoObjetivosScreen({ navigation }: Props) {
  const objetivos = useGamificationStore((state) => state.objetivos);
  const addObjetivo = useGamificationStore((state) => state.addObjetivo);
  const avancarObjetivo = useGamificationStore((state) => state.avancarObjetivo);

  const [aberto, setAberto] = useState(false);
  const [titulo, setTitulo] = useState('');

  function handleSalvar() {
    if (!titulo.trim()) return;
    addObjetivo(titulo.trim());
    setTitulo('');
    setAberto(false);
  }

  const iaMensagem = useMemo(() => {
    if (objetivos.length === 0) {
      return 'Conte à IA uma meta sua e ela vai acompanhar o progresso aqui.';
    }
    const menor = objetivos.reduce((min, o) => (o.progresso < min.progresso ? o : min), objetivos[0]);
    return `Que tal avançar em "${menor.titulo.toLowerCase()}"?`;
  }, [objetivos]);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable
            accessibilityLabel="Voltar ao centro de evolução"
            style={styles.backButton}
            onPress={() => navigation.navigate('GamificacaoHub')}
            hitSlop={8}
          >
            <BackIcon size={15} strokeWidth={2.2} />
          </Pressable>
          <View style={styles.headerTextWrap}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.eyebrow}>
              GAMIFICAÇÃO
            </Text>
            <Text variant="xl" weight="extraBold">
              Objetivos
            </Text>
          </View>
          <Pressable
            accessibilityLabel="Novo objetivo"
            style={styles.addButton}
            onPress={() => setAberto((current) => !current)}
          >
            <PlusIcon size={16} strokeWidth={2.4} />
          </Pressable>
        </View>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Metas pessoais que a IA acompanha com você.
        </Text>

        {aberto && (
          <View style={styles.form}>
            <TextField placeholder="Título do objetivo" value={titulo} onChangeText={setTitulo} />
            <Pressable style={styles.salvarButton} onPress={handleSalvar}>
              <Text variant="sm" weight="extraBold">
                Salvar objetivo
              </Text>
            </Pressable>
          </View>
        )}

        {objetivos.length === 0 ? (
          <View style={styles.emptyCard}>
            <TargetIcon size={26} color={theme.colors.text.tertiary} />
            <Text variant="sm" weight="bold" style={styles.emptyTitle}>
              Nenhum objetivo definido
            </Text>
            <Text variant="xs" weight="medium" color="secondary" style={styles.emptyText}>
              Conte à IA uma meta sua e ela vai acompanhar o progresso aqui.
            </Text>
          </View>
        ) : (
          <View style={styles.lista}>
            {objetivos.map((o) => (
              <View key={o.id} style={styles.card}>
                <Text variant="sm" weight="bold">
                  {o.titulo}
                </Text>
                <View style={styles.track}>
                  <View style={[styles.fill, { width: `${o.progresso}%` }]} />
                </View>
                <View style={styles.cardBottom}>
                  <Text variant="xs" weight="semiBold" color="secondary">
                    {o.progresso}% concluído
                  </Text>
                  {o.progresso < 100 && (
                    <Pressable onPress={() => avancarObjetivo(o.id)}>
                      <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
                        + registrar avanço
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.iaCard}>
          <TargetIcon size={18} />
          <Text variant="xs" weight="medium" color="secondary" style={styles.iaText}>
            &quot;{iaMensagem}&quot;
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  headerTextWrap: {
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    letterSpacing: 0.6,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  form: {
    marginTop: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    gap: theme.spacing.sm,
  },
  salvarButton: {
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.03)',
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  emptyTitle: {
    marginTop: theme.spacing.sm,
  },
  emptyText: {
    marginTop: 4,
    textAlign: 'center',
  },
  lista: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  track: {
    marginTop: theme.spacing.sm,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(43,41,36,0.06)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: theme.colors.accent.olive,
  },
  cardBottom: {
    marginTop: theme.spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iaCard: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(201,161,90,0.12)',
    padding: theme.spacing.md,
  },
  iaText: {
    flex: 1,
    lineHeight: 18,
  },
});