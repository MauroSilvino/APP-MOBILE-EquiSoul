import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { StorytellingCarousel, StorytellingSlideData } from '../../components/onboarding/StorytellingCarousel';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Storytelling'>;

const SLIDES: StorytellingSlideData[] = [
  {
    caption: 'foto · cavalo e cavaleiro em treino',
    title: 'Seu cavalo nunca esquecerá os momentos que viveram juntos.',
    subtitle: 'Transforme cada passeio, treino e conquista em uma memória eterna.',
  },
  {
    caption: 'foto · menina abraçando o cavalo',
    title: 'A IA transforma registros em histórias.',
    subtitle: 'Cada treino pode se tornar uma carta emocionante escrita pelo seu companheiro.',
  },
  {
    caption: 'foto · grupo de cavaleiros na comunidade',
    title: 'Compartilhe sua jornada.',
    subtitle: 'Conecte-se com milhares de apaixonados por cavalos.',
  },
];

export function StorytellingScreen({ navigation }: Props) {
  const toLogin = () => navigation.navigate('Login');

  return (
    <View style={styles.container}>
      <StorytellingCarousel slides={SLIDES} onSkip={toLogin} onFinish={toLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
