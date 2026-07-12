import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { CommunityTabs } from '../../components/comunidade/CommunityTabs';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useCommunityStore } from '../../store/useCommunityStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Mensagens'>;

export function MensagensScreen({ navigation }: Props) {
  const conversas = useCommunityStore((state) => state.conversas);
  const abrirConversa = useCommunityStore((state) => state.abrirConversa);

  function abrir(id: string) {
    abrirConversa(id);
    navigation.navigate('ChatConversa', { id });
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Comunidade
        </Text>

        <View style={styles.tabsSpacing}>
          <CommunityTabs active="Mensagens" />
        </View>

        {conversas.length === 0 ? (
          <View style={styles.empty}>
            <Text variant="lg" weight="bold">
              Nenhuma mensagem ainda
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.emptyText}>
              Converse com quem você segue na comunidade.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {conversas.map((conversa) => {
              const ultima = conversa.mensagens[conversa.mensagens.length - 1];
              return (
                <Pressable key={conversa.id} style={styles.row} onPress={() => abrir(conversa.id)}>
                  <View style={styles.avatarWrap}>
                    <View style={styles.avatar} />
                    {conversa.unread && <View style={styles.unreadDot} />}
                  </View>
                  <View style={styles.rowText}>
                    <Text variant="sm" weight={conversa.unread ? 'extraBold' : 'medium'}>
                      {conversa.nome}
                    </Text>
                    <Text
                      variant="sm"
                      weight={conversa.unread ? 'bold' : 'medium'}
                      color="secondary"
                      numberOfLines={1}
                      style={styles.rowMsg}
                    >
                      {ultima?.texto}
                    </Text>
                  </View>
                  <Text variant="xs" weight="semiBold" color={theme.colors.text.tertiary}>
                    {conversa.hora}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
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
  tabsSpacing: {
    marginTop: theme.spacing.lg,
  },
  empty: {
    marginTop: 50,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.placeholder.background,
  },
  unreadDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: theme.colors.accent.gold,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  rowText: {
    flex: 1,
    minWidth: 0,
  },
  rowMsg: {
    marginTop: 2,
  },
});
