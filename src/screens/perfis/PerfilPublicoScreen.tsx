import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon, LockIcon, TrophyIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PerfilPublico'>;

type ConfirmType = 'denunciar' | 'bloquear' | null;

const CAVALOS_HELENA = ['Trovão', 'Estrela'];

export function PerfilPublicoScreen({ navigation }: Props) {
  const [seguindo, setSeguindo] = useState(false);
  const [privado, setPrivado] = useState(true);
  const [confirm, setConfirm] = useState<ConfirmType>(null);
  const { message, show } = useToast();

  const locked = privado && !seguindo;

  function handleConfirm() {
    show(confirm === 'denunciar' ? 'Denúncia enviada.' : 'Usuário bloqueado.');
    setConfirm(null);
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <ImagePlaceholder caption="foto · Helena com Trovão" style={StyleSheet.absoluteFill} />
          <View style={styles.heroOverlay} />
        </View>

        <View style={styles.body}>
          <View style={styles.headerRow}>
            <View style={styles.avatar} />
            <View>
              <Text variant="lg" weight="extraBold">
                Helena Ribeiro
              </Text>
              <Text variant="xs" weight="semiBold" color="secondary" style={styles.headerSubtitle}>
                Proprietária de haras · Adestramento
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable
              style={[styles.primaryAction, seguindo && styles.primaryActionAtiva]}
              onPress={() => setSeguindo((current) => !current)}
            >
              <Text variant="sm" weight="extraBold">
                {seguindo ? 'Seguindo' : 'Seguir'}
              </Text>
            </Pressable>
            <View style={styles.secondaryAction}>
              <Text variant="sm" weight="bold">
                Mensagem
              </Text>
            </View>
          </View>

          <View style={styles.linksRow}>
            <Pressable onPress={() => setConfirm('denunciar')}>
              <Text variant="xs" weight="semiBold" color="secondary">
                Denunciar
              </Text>
            </Pressable>
            <Pressable onPress={() => setConfirm('bloquear')}>
              <Text variant="xs" weight="semiBold" color="secondary">
                Bloquear
              </Text>
            </Pressable>
            <Pressable onPress={() => show('Link copiado!')}>
              <Text variant="xs" weight="semiBold" color="secondary">
                Compartilhar
              </Text>
            </Pressable>
          </View>

          <Pressable onPress={() => setPrivado((current) => !current)}>
            <Text variant="xs" weight="semiBold" color={theme.colors.text.tertiary} style={styles.prototypeToggle}>
              [prototype] perfil está {privado ? 'PRIVADO' : 'PÚBLICO'} · clique para alternar
            </Text>
          </Pressable>

          {locked ? (
            <View style={styles.lockedCard}>
              <LockIcon />
              <Text variant="md" weight="bold" style={styles.lockedTitle}>
                Perfil privado
              </Text>
              <Text variant="sm" weight="medium" color="secondary" style={styles.lockedSubtitle}>
                Siga Helena para ver os cavalos e conquistas dela.
              </Text>
            </View>
          ) : (
            <>
              <Text variant="xs" weight="bold" style={styles.sectionLabel}>
                CAVALOS
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.cavalosRow}>
                  {CAVALOS_HELENA.map((nome) => (
                    <View key={nome} style={styles.cavaloItem}>
                      <View style={styles.cavaloThumb} />
                      <Text variant="sm" weight="bold" style={styles.cavaloNome}>
                        {nome}
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>

              <Text variant="xs" weight="bold" style={styles.sectionLabel}>
                CONQUISTAS RECENTES
              </Text>
              <View style={styles.conquistaIcon}>
                <TrophyIcon size={26} />
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <BottomTabBar active="Perfis" />

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('Perfis')} hitSlop={8}>
        <BackIcon />
      </Pressable>

      {confirm && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text variant="lg" weight="extraBold">
              {confirm === 'denunciar' ? 'Denunciar Helena?' : 'Bloquear Helena?'}
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.modalDesc}>
              {confirm === 'denunciar'
                ? 'Vamos analisar o perfil dela com nossa equipe. Isso não a notifica.'
                : 'Ela não poderá mais ver seu perfil nem entrar em contato com você.'}
            </Text>
            <View style={styles.modalActions}>
              <Pressable style={styles.modalCancel} onPress={() => setConfirm(null)}>
                <Text variant="sm" weight="bold">
                  Cancelar
                </Text>
              </Pressable>
              <Pressable style={styles.modalConfirm} onPress={handleConfirm}>
                <Text variant="sm" weight="extraBold" color="inverse">
                  Confirmar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      <Toast message={message} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: 150,
  },
  hero: {
    height: 260,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(43,41,36,0.35)',
  },
  body: {
    paddingHorizontal: theme.spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.spacing.md,
    marginTop: -38,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: theme.colors.background,
    backgroundColor: theme.colors.placeholder.background,
  },
  headerSubtitle: {
    marginTop: 2,
  },
  actions: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  primaryAction: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryActionAtiva: {
    backgroundColor: 'rgba(43,41,36,0.08)',
  },
  secondaryAction: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linksRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  prototypeToggle: {
    marginTop: theme.spacing.md,
  },
  lockedCard: {
    marginTop: theme.spacing.xl,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: 'rgba(43,41,36,0.04)',
    padding: theme.spacing.xxl,
    alignItems: 'center',
  },
  lockedTitle: {
    marginTop: theme.spacing.sm,
  },
  lockedSubtitle: {
    marginTop: 4,
    textAlign: 'center',
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cavalosRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  cavaloItem: {
    width: 96,
  },
  cavaloThumb: {
    height: 96,
    borderRadius: 16,
    backgroundColor: theme.colors.placeholder.background,
  },
  cavaloNome: {
    marginTop: 6,
  },
  conquistaIcon: {
    marginTop: theme.spacing.sm,
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(201,161,90,0.15)',
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
  modalOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(43,41,36,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  modalCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.cardLarge,
    padding: theme.spacing.xl,
    width: '100%',
    maxWidth: 300,
  },
  modalDesc: {
    marginTop: theme.spacing.sm,
  },
  modalActions: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  modalCancel: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalConfirm: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
