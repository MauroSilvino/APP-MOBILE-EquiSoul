import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { MISSOES_CATALOG, MissaoDef, useGamificationStore } from '../../store/useGamificationStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GamificacaoMissoes'>;

const PERIODOS: MissaoDef['periodo'][] = ['Hoje', 'Esta semana', 'Este mês'];

export function GamificacaoMissoesScreen({ navigation }: Props) {
  const missoesFeitas = useGamificationStore((state) => state.missoesFeitas);
  const toggleMissao = useGamificationStore((state) => state.toggleMissao);

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
          <View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.eyebrow}>
              GAMIFICAÇÃO
            </Text>
            <Text variant="xl" weight="extraBold">
              Missões
            </Text>
          </View>
        </View>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Sugestões adaptadas ao seu ritmo.
        </Text>

        <View style={styles.grupos}>
          {PERIODOS.map((periodo) => {
            const itens = MISSOES_CATALOG.filter((m) => m.periodo === periodo);
            return (
              <View key={periodo}>
                <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.periodoTitulo}>
                  {periodo.toUpperCase()}
                </Text>
                <View style={styles.itensList}>
                  {itens.map((m) => {
                    const done = missoesFeitas.includes(m.id);
                    return (
                      <Pressable key={m.id} style={styles.item} onPress={() => toggleMissao(m.id)}>
                        <View style={[styles.checkbox, done && styles.checkboxDone]}>
                          {done && <CheckIcon size={14} strokeWidth={2.8} />}
                        </View>
                        <Text variant="sm" weight="semiBold" style={styles.itemText}>
                          {m.texto}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })}
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
  eyebrow: {
    letterSpacing: 0.6,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  grupos: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  periodoTitulo: {
    letterSpacing: 0.4,
  },
  itensList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: 'rgba(43,41,36,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: theme.colors.accent.olive,
  },
  itemText: {
    flex: 1,
  },
});
