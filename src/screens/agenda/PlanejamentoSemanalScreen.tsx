import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { AiIcon, BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAgendaStore } from '../../store/useAgendaStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PlanejamentoSemanal'>;

const DIAS_LABEL = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

function isoDoDia(base: Date, offsetFromMonday: number): string {
  const dayOfWeek = base.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const data = new Date(base);
  data.setDate(base.getDate() + diffToMonday + offsetFromMonday);
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${data.getFullYear()}-${mes}-${dia}`;
}

export function PlanejamentoSemanalScreen({ navigation }: Props) {
  const compromissos = useAgendaStore((state) => state.compromissos);

  const semana = useMemo(() => {
    const hoje = new Date();
    return DIAS_LABEL.map((label, index) => {
      const isoDia = isoDoDia(hoje, index);
      const doDia = compromissos.filter((c) => c.data === isoDia);
      const intenso = doDia.some((c) => c.tipo === 'Competição');
      return {
        dia: label,
        isoDia,
        label: doDia.length > 0 ? doDia.map((c) => c.titulo).join(', ') : 'Descanso',
        vazio: doDia.length === 0,
        intenso,
      };
    });
  }, [compromissos]);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable style={styles.backInline} onPress={() => navigation.goBack()} hitSlop={8}>
            <BackIcon size={16} />
          </Pressable>
          <Text variant="xxl" weight="extraBold">
            Planejamento semanal
          </Text>
        </View>

        <View style={styles.lista}>
          {semana.map((item) => (
            <Pressable
              key={item.isoDia}
              style={styles.row}
              onPress={() => navigation.navigate('AgendaDoDia', { data: item.isoDia })}
            >
              <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.diaLabel}>
                {item.dia}
              </Text>
              <View
                style={[
                  styles.pill,
                  item.intenso && styles.pillIntenso,
                  item.vazio && styles.pillVazio,
                ]}
              >
                <Text
                  variant="xs"
                  weight="bold"
                  color={item.vazio ? 'tertiary' : item.intenso ? theme.colors.accent.leather : 'primary'}
                  numberOfLines={1}
                >
                  {item.label}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.insightBanner}>
          <AiIcon />
          <Text variant="sm" weight="medium" color="secondary" style={styles.insightText}>
            Você programou várias atividades intensas consecutivas. Talvez seja interessante avaliar a
            distribuição da rotina.
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  backInline: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lista: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  diaLabel: {
    width: 36,
  },
  pill: {
    flex: 1,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(43,41,36,0.06)',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  pillIntenso: {
    backgroundColor: 'rgba(201,161,90,0.18)',
  },
  pillVazio: {
    backgroundColor: 'rgba(43,41,36,0.03)',
  },
  insightBanner: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(201,161,90,0.12)',
    padding: theme.cardPadding.min,
  },
  insightText: {
    flex: 1,
  },
});
