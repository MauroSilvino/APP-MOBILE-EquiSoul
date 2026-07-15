import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, SealIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { SELOS_CATALOG, useConquistaContext } from '../../store/useGamificationStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GamificacaoSelos'>;

export function GamificacaoSelosScreen({ navigation }: Props) {
  const ctx = useConquistaContext();

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
              Selos
            </Text>
          </View>
        </View>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Pequenos reconhecimentos que marcam sua jornada.
        </Text>

        <View style={styles.grid}>
          {SELOS_CATALOG.map((selo) => {
            const unlocked = selo.isUnlocked(ctx);
            return (
              <View key={selo.id} style={styles.item}>
                <View
                  style={[
                    styles.iconWrap,
                    unlocked ? styles.iconWrapUnlocked : styles.iconWrapLocked,
                  ]}
                >
                  <SealIcon size={22} color={unlocked ? theme.colors.accent.leather : theme.colors.text.tertiary} />
                </View>
                <Text variant="xs" weight="bold" style={styles.itemLabel}>
                  {selo.nome}
                </Text>
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
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
  },
  item: {
    width: '28%',
    alignItems: 'center',
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  iconWrapUnlocked: {
    backgroundColor: 'rgba(201,161,90,0.14)',
    borderColor: 'rgba(201,161,90,0.4)',
  },
  iconWrapLocked: {
    backgroundColor: 'rgba(43,41,36,0.05)',
    borderColor: 'rgba(43,41,36,0.1)',
  },
  itemLabel: {
    marginTop: theme.spacing.xs,
    textAlign: 'center',
    lineHeight: 14,
  },
});
