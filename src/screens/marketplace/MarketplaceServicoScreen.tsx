import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMarketplaceStore } from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketplaceServico'>;

export function MarketplaceServicoScreen({ navigation, route }: Props) {
  const servico = useMarketplaceStore((state) =>
    state.servicos.find((item) => item.id === route.params.servicoId)
  );
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);

  if (!servico) return null;

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <View style={styles.headerRow}>
          <View style={styles.avatar} />
          <View style={styles.headerInfo}>
            <Text variant="lg" weight="extraBold">
              {servico.nome}
            </Text>
            <Text variant="sm" weight="semiBold" color="secondary" style={styles.especialidade}>
              {servico.especialidade} · ★ {servico.avaliacao} ({servico.avaliacoesCount})
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('MarketplaceAvaliacoes', { nome: servico.nome, nota: servico.avaliacao })
              }
            >
              <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.avaliacoesCta}>
                Ver avaliações →
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.tagsRow}>
          {servico.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text variant="xs" weight="semiBold">
                {tag}
              </Text>
            </View>
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          HORÁRIOS DISPONÍVEIS
        </Text>
        <View style={styles.horariosRow}>
          {servico.horarios.map((horario) => {
            const selected = horarioSelecionado === horario;
            return (
              <Pressable
                key={horario}
                style={[styles.horarioChip, selected && styles.horarioChipSelected]}
                onPress={() => setHorarioSelecionado(horario)}
              >
                <Text variant="sm" weight="bold" color={selected ? theme.colors.accent.gold : 'primary'}>
                  {horario}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text variant="lg" weight="bold" color={theme.colors.accent.leather} style={styles.preco}>
          {servico.precoConsultaLabel} a consulta
        </Text>

        <View style={styles.actionsRow}>
          <Pressable
            style={styles.primaryButton}
            onPress={() =>
              navigation.navigate('MarketplaceReserva', {
                origem: 'Consulta',
                nome: servico.nome,
                precoLabel: servico.precoConsultaLabel,
              })
            }
          >
            <Text variant="md" weight="extraBold">
              Agendar
            </Text>
          </Pressable>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('MarketplaceChat', { nome: servico.nome })}
          >
            <Text variant="sm" weight="bold">
              Mensagem
            </Text>
          </Pressable>
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
    paddingBottom: 40,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.placeholder.background,
  },
  headerInfo: {
    flex: 1,
    minWidth: 0,
  },
  especialidade: {
    marginTop: 2,
  },
  avaliacoesCta: {
    marginTop: 3,
  },
  tagsRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  tag: {
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  horariosRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  horarioChip: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  horarioChipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  preco: {
    marginTop: theme.spacing.lg,
  },
  actionsRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  primaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
