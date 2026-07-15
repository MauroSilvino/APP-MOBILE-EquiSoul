import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, ChevronRightIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumFAQ'>;

export function PremiumFAQScreen({ navigation }: Props) {
  const faqList = usePremiumStore((state) => state.faqList);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Perguntas Frequentes
        </Text>

        <View style={styles.list}>
          {faqList.map((item) => {
            const open = openId === item.id;
            return (
              <View key={item.id} style={styles.card}>
                <Pressable
                  style={styles.question}
                  onPress={() => setOpenId(open ? null : item.id)}
                >
                  <Text variant="sm" weight="bold" style={styles.questionText}>
                    {item.pergunta}
                  </Text>
                  <View style={{ transform: [{ rotate: open ? '90deg' : '0deg' }] }}>
                    <ChevronRightIcon size={14} color={theme.colors.accent.leather} />
                  </View>
                </Pressable>
                {open && (
                  <Text variant="xs" weight="medium" color="secondary" style={styles.answer}>
                    {item.resposta}
                  </Text>
                )}
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
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  question: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
  },
  questionText: {
    flex: 1,
  },
  answer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    lineHeight: 19,
  },
});
