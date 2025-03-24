import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [jvNota1, setjvNota1] = useState('');
  const [jvNota2, setjvNota2] = useState('');
  const [jvNota3, setjvNota3] = useState('');
  const [jvFaltas, setjvFaltas] = useState('');
  const [jvResultado, setjvResultado] = useState('');

  const jvLimiteFaltas = 22;

  const jvValidar = () => {
    const nota1 = parseFloat(jvNota1) || 0;
    const nota2 = parseFloat(jvNota2) || 0;
    const nota3 = parseFloat(jvNota3) || 0;

    if (jvFaltas > jvLimiteFaltas){
      setjvResultado('Reprovado por falta');
      return;
    }

    const notas = [nota1, nota2, nota3];
    notas.sort((a,b) => a - b);
    const media = (notas[1] + notas[2]) / 2;

    if (media < 6) {
      setjvResultado('Reprovado por nota');
    } else {
      setjvResultado(`Aprovado com média de ${media.toFixed(2)}`);
    }
  };









    return (
    <View style={styles.container}>
      <Text>Salve</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
