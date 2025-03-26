import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [jvTelaAtiva, setjvTelaAtiva] = useState('notas');
  const [jvNota1, setjvNota1] = useState('');
  const [jvNota2, setjvNota2] = useState('');
  const [jvNota3, setjvNota3] = useState('');
  const [jvFaltas, setjvFaltas] = useState('');
  const [jvResultado, setjvResultado] = useState('');

  const jvLimiteFaltas = 18;

  const jvValidar = () => {
    const nota1 = parseFloat(jvNota1) || 0;
    const nota2 = parseFloat(jvNota2) || 0;
    const nota3 = parseFloat(jvNota3) || 0;
    const faltas = parseInt(jvFaltas) || 0;

    if (faltas > jvLimiteFaltas) {
      setjvResultado('Reprovado por falta');
      return;
    }

    const notas = [nota1, nota2, nota3];
    notas.sort((a, b) => a - b);
    const media = (notas[1] + notas[2]) / 2;

    if (media < 6) {
      setjvResultado('Reprovado por nota');
    } else {
      setjvResultado(`Aprovado com média de ${media.toFixed(2)}`);
    }
  };

  const jvResetar = () => {
    setjvNota1('');
    setjvNota2('');
    setjvNota3('');
    setjvFaltas('');
    setjvResultado('');
  };

  const jvValidarNumero = (text) => {
    return text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
  };

  const jvRenderizarTelaNotas = () => (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ width: '100%' }}>
      <Text style={jvEstilos.label}>Nota 1:</Text>
      <TextInput
        style={jvEstilos.input}
        keyboardType="decimal-pad"
        value={jvNota1}
        onChangeText={(text) => setjvNota1(jvValidarNumero(text))}
      />

      <Text style={jvEstilos.label}>Nota 2:</Text>
      <TextInput
        style={jvEstilos.input}
        keyboardType="decimal-pad"
        value={jvNota2}
        onChangeText={(text) => setjvNota2(jvValidarNumero(text))}
      />

      <Text style={jvEstilos.label}>Nota 3:</Text>
      <TextInput
        style={jvEstilos.input}
        keyboardType="decimal-pad"
        value={jvNota3}
        onChangeText={(text) => setjvNota3(jvValidarNumero(text))}
      />

      <Text style={jvEstilos.label}>Faltas:</Text>
      <TextInput
        style={jvEstilos.input}
        keyboardType="numeric"
        value={jvFaltas}
        onChangeText={(text) => setjvFaltas(text.replace(/[^0-9]/g, ''))}
      />

      <View style={jvEstilos.buttonContainer}>
        <Button title="Validar" onPress={jvValidar} />
      </View>

      {jvResultado !== '' && <Text style={jvEstilos.resultado}>{jvResultado}</Text>}
    </KeyboardAvoidingView>
  );

  const jvRenderizarTelaInformacoes = () => (
    <View style={jvEstilos.infoContainer}>
      <Text style={jvEstilos.infoTitle}>Regras de Avaliação</Text>
      <Text style={jvEstilos.infoText}>- A menor nota entre as três é descartada</Text>
      <Text style={jvEstilos.infoText}>- A média é calculada com as duas maiores notas</Text>
      <Text style={jvEstilos.infoText}>- Média mínima para aprovação: 6.0</Text>
      <Text style={jvEstilos.infoText}>- Limite de faltas: {jvLimiteFaltas} aulas</Text>
      <Text style={jvEstilos.infoText}>- Acima de {jvLimiteFaltas} faltas: reprovação automática</Text>
      <Text style={jvEstilos.infoText}>- Campos vazios são considerados como zero</Text>
    </View>
  );

  return (
    <View style={jvEstilos.container}>
      <StatusBar style="auto" />
      <View style={jvEstilos.header}>
        <TouchableOpacity 
          style={[jvEstilos.headerButton, jvTelaAtiva === 'notas' && jvEstilos.headerButtonActive]}
          onPress={() => setjvTelaAtiva('notas')}
        >
          <Text style={jvEstilos.headerButtonText}>Notas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[jvEstilos.headerButton, jvTelaAtiva === 'informacoes' && jvEstilos.headerButtonActive]}
          onPress={() => setjvTelaAtiva('informacoes')}
        >
          <Text style={jvEstilos.headerButtonText}>Informações</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={jvEstilos.scrollContainer}>
        <TouchableOpacity onPress={jvResetar}>
          <Image source={require('./assets/logoFiap.jpg')} style={jvEstilos.logo} />
        </TouchableOpacity>

        {jvTelaAtiva === 'notas' ? jvRenderizarTelaNotas() : jvRenderizarTelaInformacoes()}
      </ScrollView>
    </View>
  );
}

const jvEstilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#474a51',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#004AAD',
    paddingVertical: 15,
    justifyContent: 'space-around',
  },
  headerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  headerButtonActive: {
    backgroundColor: '#002d5f',
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    color: '#FFFFFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  resultado: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#004AAD',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004AAD',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#474a51',
    marginBottom: 10,
  },
});