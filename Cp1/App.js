import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
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

  return (
    <ScrollView contentContainerStyle={jvEstilos.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={jvResetar}>
        <Image source={require('./assets/logoFiap.jpg')} style={jvEstilos.logo} />
      </TouchableOpacity>

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
    </ScrollView>
  );
}

const jvEstilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#474a51',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  },
  buttonContainer: {
    marginTop: 20,
  },
  resultado: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#004AAD',
  },
});

