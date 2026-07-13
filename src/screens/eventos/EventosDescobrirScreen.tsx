import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { CalendarIcon, PeopleIcon, SearchIcon, TicketIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { hojeISO } from '../../store/useAgendaStore';
import { useEventsStore } from '../../store/useEventsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'EventosDescobrir'>;

const CATEGORIAS = ['Todos', 'Competições', 'Passeios', 'Trilhas', 'Clínicas', 'Cursos', 'Leilões'];
const FILTROS = ['Hoje', 'Esta semana', 'Perto de mim', 'Gratuitos'];

export function EventosDescobrirScreen({ navigation }: Props) {
  const eventos = useEventsStore((state) => state.eventos);
  const eventStatus = useEventsStore((state) => state.eventStatus);

  const [categoria, setCategoria] = useState('Todos');
  const [filtro, setFiltro] = useState('Perto de mim');
  const [busca, setBusca] = useState('');

  const hoje = hojeISO();
  const emUmaSemana = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
  }, []);

  const filtroMatch = (dataISO: string, precoLabel: string) => {
    if (filtro === 'Hoje') return dataISO === hoje;
    if (filtro === 'Esta semana') return dataISO >= hoje && dataISO <= emUmaSemana;
    if (filtro === 'Gratuitos') return precoLabel === 'Gratuito';
    return true;
  };

  const eventosFiltrados = eventos.filter(
    (evento) =>
      !evento.encerrado &&
      (categoria === 'Todos' || evento.categoria === categoria) &&
      filtroMatch(evento.dataISO, evento.precoLabel) &&
      (!busca || evento.titulo.toLowerCase().includes(busca.toLowerCase())),
  );

  const destaque = eventos[0];

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="xxl" weight="extraBold">
            Eventos
          </Text>
          <View style={styles.headerIcons}>
            <Pressable onPress={() => navigation.navigate('EventosCalendario')} hitSlop={8}>
              <CalendarIcon size={20} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Clubes')} hitSlop={8}>
              <PeopleIcon size={20} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('MeusEventos')} hitSlop={8}>
              <TicketIcon size={20} />
            </Pressable>
          </View>
        </View>

        {destaque && (
          <ImagePlaceholder caption={`banner · ${destaque.titulo} 2026`} style={styles.banner}>
            <LinearGradient
              colors={['rgba(43,41,36,0)', 'rgba(43,41,36,0.65)']}
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />
            <Text variant="sm" weight="bold" color="inverse" style={styles.bannerCaption}>
              {destaque.titulo} · inscrições abertas
            </Text>
          </ImagePlaceholder>
        )}

        <View style={styles.searchBox}>
          <SearchIcon size={16} color="#6b6558" />
          <TextInput
            value={busca}
            onChangeText={setBusca}
            placeholder="Buscar eventos..."
            placeholderTextColor="#a39c8a"
            style={styles.searchInput}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
          {CATEGORIAS.map((label) => (
            <Chip key={label} label={label} selected={categoria === label} onPress={() => setCategoria(label)} />
          ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
          {FILTROS.map((label) => (
            <Chip key={label} label={label} selected={filtro === label} onPress={() => setFiltro(label)} />
          ))}
        </ScrollView>

        <View style={styles.list}>
          {eventosFiltrados.map((evento) => (
            <Pressable
              key={evento.id}
              style={styles.card}
              onPress={() => navigation.navigate('EventoPagina', { eventId: evento.id })}
            >
              <ImagePlaceholder caption={evento.tipo} style={styles.cardPhoto}>
                {eventStatus[evento.id]?.inscrito && (
                  <View style={styles.inscritoBadge}>
                    <Text variant="xs" weight="bold" color={theme.colors.accent.gold}>
                      Inscrito ✓
                    </Text>
                  </View>
                )}
              </ImagePlaceholder>
              <View style={styles.cardBody}>
                <Text variant="md" weight="bold">
                  {evento.titulo}
                </Text>
                <Text variant="sm" weight="medium" color="secondary" style={styles.cardInfo}>
                  {evento.data} · {evento.cidade}
                </Text>
              </View>
            </Pressable>
          ))}
          {eventosFiltrados.length === 0 && (
            <View style={styles.empty}>
              <Text variant="md" weight="bold">
                Nenhum evento encontrado
              </Text>
              <Text variant="sm" weight="medium" color="secondary" style={styles.emptyText}>
                Tente outro filtro ou categoria.
              </Text>
            </View>
          )}
        </View>

        <Pressable style={styles.experienciasButton} onPress={() => navigation.navigate('Experiencias')}>
          <Text variant="sm" weight="bold">
            Ver experiências
          </Text>
        </Pressable>
      </ScrollView>

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
    paddingTop: theme.spacing.xxl,
    paddingBottom: 130,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  banner: {
    marginTop: theme.spacing.md,
    height: 150,
    borderRadius: theme.radius.cardLarge,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  bannerCaption: {
    padding: theme.spacing.md,
  },
  searchBox: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: theme.radius.chip,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    color: '#2B2924',
  },
  chipsRow: {
    marginTop: theme.spacing.sm,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    borderRadius: theme.radius.cardLarge,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 2,
  },
  cardPhoto: {
    height: 120,
  },
  inscritoBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: theme.colors.surfaceDark,
  },
  cardBody: {
    padding: theme.cardPadding.min,
  },
  cardInfo: {
    marginTop: 4,
  },
  empty: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xxl,
  },
  emptyText: {
    textAlign: 'center',
  },
  experienciasButton: {
    marginTop: theme.spacing.md,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
