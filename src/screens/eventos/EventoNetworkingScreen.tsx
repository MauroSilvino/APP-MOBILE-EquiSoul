import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useEventsStore } from '../../store/useEventsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'EventoNetworking'>;

const PARTICIPANTES = [
  { nome: 'Marina Kist', papel: 'Veterinária · organizadora' },
  { nome: 'João Ferrador', papel: 'Ferrador · expositor' },
  { nome: 'Patrícia Lima', papel: 'Treinadora' },
  { nome: 'Suplementos Equinos Ltda', papel: 'Patrocinador' },
];

export function EventoNetworkingScreen({ navigation }: Props) {
  const networkingConectados = useEventsStore((state) => state.networkingConectados);
  const toggleNetworking = useEventsStore((state) => state.toggleNetworking);

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Networking
        </Text>

        <View style={styles.list}>
          {PARTICIPANTES.map((p) => {
            const conectado = networkingConectados.includes(p.nome);
            return (
              <View key={p.nome} style={styles.card}>
                <View style={styles.avatar} />
                <View style={styles.body}>
                  <Text variant="sm" weight="bold">
                    {p.nome}
                  </Text>
                  <Text variant="sm" weight="medium" color="secondary" style={styles.papel}>
                    {p.papel}
                  </Text>
                </View>
                <Pressable
                  style={[styles.actionButton, conectado && styles.actionButtonConectado]}
                  onPress={() => toggleNetworking(p.nome)}
                >
                  <Text variant="xs" weight="bold" color={conectado ? theme.colors.accent.moss : 'primary'}>
                    {conectado ? 'Conectado ✓' : 'Conectar'}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
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
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: 18,
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.placeholder.background,
  },
  body: {
    flex: 1,
  },
  papel: {
    marginTop: 2,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: theme.colors.accent.gold,
  },
  actionButtonConectado: {
    backgroundColor: 'rgba(107,115,83,0.15)',
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
