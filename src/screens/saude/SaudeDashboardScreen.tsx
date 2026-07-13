import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReactElement, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import {
  BackIcon,
  BowlIcon,
  CalendarIcon,
  CheckIcon,
  DocumentIcon,
  ExamIcon,
  HorseshoeIcon,
  InjuryIcon,
  ParasiteIcon,
  PillIcon,
  PulseHeartIcon,
  ScaleIcon,
  ToothIcon,
  VaccineIcon,
  VetIcon,
} from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { useHealthStore } from '../../store/useHealthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'SaudeCavalo'>;

export function SaudeDashboardScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const records = useHealthStore((state) => (horse ? state.getRecords(horse.id) : null));

  const totalRegistros = useMemo(() => {
    if (!records) return 0;
    return (
      records.vacinas.length +
      records.vermifugacoes.length +
      records.medicamentos.length +
      records.ferrageamentos.length +
      records.odontologia.length +
      records.pesos.length
    );
  }, [records]);

  const proximosCuidados = useMemo(() => {
    if (!records) return [];
    return records.vacinas
      .filter((v) => !!v.proxima)
      .slice(0, 3)
      .map((v) => ({ titulo: `Vacina · ${v.nome}`, prazo: `Próxima previsão: ${v.proxima}` }));
  }, [records]);

  if (!horse) {
    return (
      <Screen>
        <Text variant="md" weight="bold">
          Cavalo não encontrado.
        </Text>
      </Screen>
    );
  }

  const cards: { label: string; icon: ReactElement; onPress: () => void }[] = [
    { label: 'Vacinas', icon: <VaccineIcon />, onPress: () => navigation.navigate('Vacinas', { id: horse.id }) },
    {
      label: 'Vermifugação',
      icon: <ParasiteIcon />,
      onPress: () => navigation.navigate('Vermifugacao', { id: horse.id }),
    },
    {
      label: 'Medicamentos',
      icon: <PillIcon />,
      onPress: () => navigation.navigate('Medicamentos', { id: horse.id }),
    },
    {
      label: 'Ferrageamento',
      icon: <HorseshoeIcon />,
      onPress: () => navigation.navigate('Ferrageamento', { id: horse.id }),
    },
    {
      label: 'Odontologia',
      icon: <ToothIcon />,
      onPress: () => navigation.navigate('Odontologia', { id: horse.id }),
    },
    {
      label: 'Alimentação',
      icon: <BowlIcon />,
      onPress: () => navigation.navigate('Alimentacao', { id: horse.id }),
    },
    { label: 'Peso', icon: <ScaleIcon />, onPress: () => navigation.navigate('Peso', { id: horse.id }) },
    { label: 'Exames', icon: <ExamIcon />, onPress: () => navigation.navigate('Exames', { id: horse.id }) },
    { label: 'Lesões', icon: <InjuryIcon />, onPress: () => navigation.navigate('Lesoes', { id: horse.id }) },
    {
      label: 'Recuperação',
      icon: <PulseHeartIcon size={17} />,
      onPress: () => navigation.navigate('Recuperacao', { id: horse.id }),
    },
    {
      label: 'Veterinários',
      icon: <VetIcon />,
      onPress: () => navigation.navigate('Veterinarios', { id: horse.id }),
    },
    {
      label: 'Documentos',
      icon: <DocumentIcon />,
      onPress: () => navigation.navigate('Documentos', { id: horse.id }),
    },
    {
      label: 'Calendário',
      icon: <CalendarIcon size={17} />,
      onPress: () => navigation.navigate('CalendarioSaude', { id: horse.id }),
    },
  ];

  const ultimoFerrageamento = records?.ferrageamentos[0];

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ImagePlaceholder caption={`foto de perfil · ${horse.nome}`} style={styles.hero}>
          <View style={styles.heroOverlay} />
          <Text variant="xl" weight="extraBold" color="inverse" style={styles.heroTitle}>
            Saúde de {horse.nome}
          </Text>
        </ImagePlaceholder>

        <View style={styles.body}>
          <View style={styles.bemEstarCard}>
            <View style={styles.bemEstarIcon}>
              <CheckIcon size={20} color={theme.colors.accent.moss} strokeWidth={1.8} />
            </View>
            <View style={styles.flexShrink}>
              <Text variant="sm" weight="bold">
                {totalRegistros > 0 ? 'Bem-estar acompanhado' : 'Comece a acompanhar a saúde'}
              </Text>
              <Text variant="xs" weight="medium" color="secondary" style={styles.bemEstarSubtitle}>
                {totalRegistros > 0
                  ? `${totalRegistros} registro${totalRegistros > 1 ? 's' : ''} de saúde salvos`
                  : `Adicione vacinas, ferrageamento e outros cuidados de ${horse.nome}.`}
              </Text>
            </View>
          </View>

          <View style={styles.grid}>
            {cards.map((card) => (
              <Pressable key={card.label} style={styles.card} onPress={card.onPress}>
                {card.icon}
                <Text variant="xs" weight="bold" style={styles.cardLabel}>
                  {card.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text variant="sm" weight="bold" style={styles.sectionTitle}>
            PRÓXIMOS CUIDADOS
          </Text>
          <View style={styles.cuidadosList}>
            {proximosCuidados.length === 0 ? (
              <Text variant="sm" weight="medium" color="secondary">
                Nenhum cuidado agendado ainda.
              </Text>
            ) : (
              proximosCuidados.map((item, index) => (
                <View key={index} style={styles.cuidadoCard}>
                  <View style={styles.cuidadoIcon} />
                  <View>
                    <Text variant="sm" weight="bold">
                      {item.titulo}
                    </Text>
                    <Text variant="xs" weight="medium" color="secondary" style={styles.cuidadoPrazo}>
                      {item.prazo}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>

          <Pressable
            style={styles.insightBanner}
            onPress={() => navigation.navigate('IABemEstar', { id: horse.id })}
          >
            <Text variant="sm" weight="medium" color="secondary" style={styles.insightText}>
              {ultimoFerrageamento
                ? `O último ferrageamento (${ultimoFerrageamento.tipo}) ocorreu em ${ultimoFerrageamento.data}.`
                : `A IA está de olho na saúde de ${horse.nome}. Toque para ver os insights de bem-estar.`}
            </Text>
          </Pressable>

          <Pressable style={styles.historicoButton} onPress={() => navigation.navigate('HistoricoSaude', { id: horse.id })}>
            <Text variant="sm" weight="bold">
              Ver histórico completo
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <BottomTabBar active="Perfis" />

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('PerfilCavalo', { id: horse.id })} hitSlop={8}>
        <BackIcon />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: 130,
  },
  hero: {
    height: 190,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(43,41,36,0.35)',
  },
  heroTitle: {
    position: 'absolute',
    left: theme.spacing.lg,
    bottom: theme.spacing.md,
  },
  body: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
  flexShrink: {
    flexShrink: 1,
  },
  bemEstarCard: {
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(107,115,83,0.12)',
    padding: theme.cardPadding.min,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  bemEstarIcon: {
    width: 34,
    height: 34,
  },
  bemEstarSubtitle: {
    marginTop: 2,
  },
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  card: {
    width: '31%',
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cardLabel: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  sectionTitle: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cuidadosList: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  cuidadoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cuidadoIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(201,161,90,0.16)',
  },
  cuidadoPrazo: {
    marginTop: 2,
  },
  insightBanner: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(201,161,90,0.12)',
    padding: theme.cardPadding.min,
  },
  insightText: {
    lineHeight: 18,
  },
  historicoButton: {
    marginTop: theme.spacing.md,
    height: theme.buttonHeight.min + 4,
    borderRadius: (theme.buttonHeight.min + 4) / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 4,
  },
});
