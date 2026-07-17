import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ComponentType, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import {
  AiIcon,
  BellIcon,
  ChevronRightIcon,
  CloudIcon,
  DevIcon,
  GlobeIcon,
  HelpIcon,
  InfoCircleIcon,
  LockIcon,
  NetworkIcon,
  ProfileIcon,
  ShieldIcon,
  StarIcon,
  ThemeIcon,
} from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Configuracoes'>;

type IconComponent = ComponentType<{ size?: number; color?: string }>;

type HubRoute =
  | 'Conta'
  | 'ConfiguracoesPrivacidade'
  | 'Seguranca'
  | 'ConfiguracoesIA'
  | 'PreferenciasNotificacao'
  | 'Aparencia'
  | 'IdiomaRegiao'
  | 'Backup'
  | 'Compartilhamento'
  | 'ConfiguracoesPremium'
  | 'Ajuda'
  | 'Sobre'
  | 'ModoDesenvolvedor';

const HUB_ITENS: { label: string; route: HubRoute; Icon: IconComponent }[] = [
  { label: 'Conta', route: 'Conta', Icon: ProfileIcon },
  { label: 'Privacidade', route: 'ConfiguracoesPrivacidade', Icon: ShieldIcon },
  { label: 'Segurança', route: 'Seguranca', Icon: LockIcon },
  { label: 'Configurações da IA', route: 'ConfiguracoesIA', Icon: AiIcon },
  { label: 'Notificações', route: 'PreferenciasNotificacao', Icon: BellIcon },
  { label: 'Aparência', route: 'Aparencia', Icon: ThemeIcon },
  { label: 'Idioma', route: 'IdiomaRegiao', Icon: GlobeIcon },
  { label: 'Backup', route: 'Backup', Icon: CloudIcon },
  { label: 'Compartilhamento', route: 'Compartilhamento', Icon: NetworkIcon },
  { label: 'Premium', route: 'ConfiguracoesPremium', Icon: StarIcon },
  { label: 'Ajuda', route: 'Ajuda', Icon: HelpIcon },
  { label: 'Sobre', route: 'Sobre', Icon: InfoCircleIcon },
  { label: 'Desenvolvedor', route: 'ModoDesenvolvedor', Icon: DevIcon },
];

export function ConfiguracoesHubScreen({ navigation }: Props) {
  const profile = useUserStore((state) => state.profile);
  const premium = useUserStore((state) => state.premium);
  const logout = useAuthStore((state) => state.logout);
  const [sairConfirmOpen, setSairConfirmOpen] = useState(false);
  const { message, show } = useToast();

  function handleSairConfirm() {
    setSairConfirmOpen(false);
    logout();
    show('Você saiu da conta');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Configurações
        </Text>

        <View style={styles.profileCard}>
          <ImagePlaceholder caption="foto" style={styles.avatar} />
          <View style={styles.profileTexts}>
            <Text variant="sm" weight="extraBold">
              {profile.nome || 'Você'}
            </Text>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
              {premium ? 'Plano Premium' : 'Plano Gratuito'}
            </Text>
          </View>
        </View>

        <View style={styles.list}>
          {HUB_ITENS.map(({ label, route, Icon }) => (
            <Pressable key={route} style={styles.row} onPress={() => navigation.navigate(route)}>
              <View style={styles.iconWrap}>
                <Icon size={17} color={theme.colors.accent.leather} />
              </View>
              <Text variant="sm" weight="bold" style={styles.rowLabel}>
                {label}
              </Text>
              <ChevronRightIcon size={16} color={theme.colors.text.tertiary} />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.sairRow} onPress={() => setSairConfirmOpen(true)}>
          <View style={styles.sairIconWrap}>
            <ChevronRightIcon size={17} color={theme.colors.error} />
          </View>
          <Text variant="sm" weight="bold" color={theme.colors.error} style={styles.rowLabel}>
            Sair da conta
          </Text>
        </Pressable>
      </ScrollView>

      <ConfirmModal
        visible={sairConfirmOpen}
        title="Sair da conta?"
        description="Você precisará entrar novamente para acessar o EquiSoul."
        confirmLabel="Sair"
        onConfirm={handleSairConfirm}
        onCancel={() => setSairConfirmOpen(false)}
      />
      <Toast message={message} />
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
    paddingBottom: 40,
  },
  profileCard: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  profileTexts: {
    flex: 1,
  },
  list: {
    marginTop: theme.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(201,161,90,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
  },
  sairRow: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(43,41,36,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  sairIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(184,92,76,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '180deg' }],
  },
});
