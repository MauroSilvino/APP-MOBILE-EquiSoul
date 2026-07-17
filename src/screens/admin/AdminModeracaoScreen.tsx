import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { AdminDenuncia, useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminModeracao'>;

const CATEGORIA_COLORS: Record<string, { bg: string; color: string }> = {
  'Maus-tratos': { bg: 'rgba(184,92,76,0.14)', color: theme.colors.error },
  Spam: { bg: 'rgba(43,41,36,0.06)', color: theme.colors.text.primary },
  Fake: { bg: 'rgba(201,161,90,0.16)', color: theme.colors.accent.leather },
  Fraude: { bg: 'rgba(184,92,76,0.14)', color: theme.colors.error },
  'Direitos autorais': { bg: 'rgba(43,41,36,0.06)', color: theme.colors.text.primary },
};

export function AdminModeracaoScreen({ navigation }: Props) {
  const denuncias = useAdminStore((s) => s.denuncias);
  const resolverDenuncia = useAdminStore((s) => s.resolverDenuncia);
  const [pending, setPending] = useState<{ index: number; item: AdminDenuncia } | null>(null);

  return (
    <AdminScreen
      title="Moderação"
      activeRoute="AdminModeracao"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
        A IA prioriza e agrupa — nunca decide sozinha.
      </Text>

      <View style={styles.list}>
        {denuncias.map((d, index) => {
          const colors = CATEGORIA_COLORS[d.categoria] ?? CATEGORIA_COLORS.Spam;
          return (
            <View key={d.descricao} style={[styles.card, d.resolvida && styles.cardResolvida]}>
              <View style={styles.cardHeader}>
                <View style={[styles.badge, { backgroundColor: colors.bg }]}>
                  <Text variant="xs" weight="bold" color={colors.color} style={styles.badgeText}>
                    {d.categoria}
                  </Text>
                </View>
                <Text variant="xs" weight="semiBold" color="tertiary">
                  {d.tempo}
                </Text>
              </View>
              <Text variant="sm" weight="semiBold" style={styles.descricao}>
                {d.descricao}
              </Text>
              {d.resolvida ? (
                <Text variant="xs" weight="bold" color={theme.colors.accent.moss} style={styles.resolvida}>
                  Resolvida ✓
                </Text>
              ) : (
                <Pressable style={styles.resolverButton} onPress={() => setPending({ index, item: d })}>
                  <Text variant="xs" weight="bold" color={theme.colors.accent.gold}>
                    Resolver
                  </Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </View>

      {pending && (
        <ConfirmModal
          visible
          title="Resolver denúncia?"
          description={`Marcar "${pending.item.descricao}" como resolvida.`}
          confirmLabel="Resolver"
          onConfirm={() => {
            resolverDenuncia(pending.index);
            setPending(null);
          }}
          onCancel={() => setPending(null)}
        />
      )}
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 6,
  },
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  cardResolvida: {
    opacity: 0.55,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  badgeText: {
    textTransform: 'uppercase',
  },
  descricao: {
    marginTop: 6,
  },
  resolvida: {
    marginTop: 8,
  },
  resolverButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    borderRadius: 10,
    backgroundColor: theme.colors.surfaceDark,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
