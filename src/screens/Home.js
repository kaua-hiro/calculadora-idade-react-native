import React, { useState, useRef } from 'react';
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity,
  Animated, Keyboard, ScrollView
} from 'react-native';
import { styles } from '../styles/homeStyles';
import { calcularIdade, classificarFaixa, diasNoMes } from '../utils/idade';

export default function Home() {
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const mesInputRef = useRef(null);
  const anoInputRef = useRef(null);

  function animarEntrada() {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.9);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();
  }

  function validarData(d, m, a) {
    const diaNum = parseInt(d, 10);
    const mesNum = parseInt(m, 10);
    const anoNum = parseInt(a, 10);
    const anoAtual = new Date().getFullYear();

    if (!d || !m || !a) return 'Preencha dia, mês e ano.';
    if (isNaN(diaNum) || isNaN(mesNum) || isNaN(anoNum)) return 'Use apenas números.';
    if (mesNum < 1 || mesNum > 12) return 'Mês inválido (1 a 12).';
    if (anoNum < 1900 || anoNum > anoAtual) return `Ano inválido (1900 a ${anoAtual}).`;
    if (diaNum < 1 || diaNum > diasNoMes(mesNum, anoNum)) return 'Dia inválido para o mês/ano informado.';

    const nascimento = new Date(anoNum, mesNum - 1, diaNum);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (nascimento.getTime() > hoje.getTime()) return 'A data não pode ser no futuro.';
    return null;
  }

  function onCalcular() {
    Keyboard.dismiss();
    const mensagemErro = validarData(dia, mes, ano);

    if (mensagemErro) {
      setErro(mensagemErro);
      setResultado(null);
      return;
    }

    setErro('');
    const nascimento = new Date(parseInt(ano, 10), parseInt(mes, 10) - 1, parseInt(dia, 10));
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const idade = calcularIdade(nascimento, hoje);
    const faixa = classificarFaixa(idade.anos);

    setResultado({ ...idade, faixa });
    animarEntrada();
  }

  function onLimpar() {
    setDia(''); setMes(''); setAno('');
    setResultado(null); setErro('');
  }

  const corDestaque = resultado ? resultado.faixa.cor : '#6366f1';

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.blob, styles.blobTopo, { backgroundColor: corDestaque + '22' }]} />
      <View style={[styles.blob, styles.blobBase, { backgroundColor: corDestaque + '15' }]} />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🩺</Text>
          <Text style={styles.titulo}>Calculadora de Idade</Text>
          <Text style={styles.subtitulo}>Informe a data de nascimento e descubra a idade e a classificação médica.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Data de nascimento</Text>
          <View style={styles.linhaInputs}>
            <View style={styles.grupoInput}>
              <TextInput style={styles.input} placeholder="DD" placeholderTextColor="#9ca3af" keyboardType="number-pad" maxLength={2} value={dia} onChangeText={(t) => setDia(t.replace(/[^0-9]/g, ''))} onSubmitEditing={() => mesInputRef.current && mesInputRef.current.focus()} returnKeyType="next" />
              <Text style={styles.legendaInput}>Dia</Text>
            </View>
            <Text style={styles.separador}>/</Text>
            <View style={styles.grupoInput}>
              <TextInput ref={mesInputRef} style={styles.input} placeholder="MM" placeholderTextColor="#9ca3af" keyboardType="number-pad" maxLength={2} value={mes} onChangeText={(t) => setMes(t.replace(/[^0-9]/g, ''))} onSubmitEditing={() => anoInputRef.current && anoInputRef.current.focus()} returnKeyType="next" />
              <Text style={styles.legendaInput}>Mês</Text>
            </View>
            <Text style={styles.separador}>/</Text>
            <View style={styles.grupoInput}>
              <TextInput ref={anoInputRef} style={[styles.input, styles.inputAno]} placeholder="AAAA" placeholderTextColor="#9ca3af" keyboardType="number-pad" maxLength={4} value={ano} onChangeText={(t) => setAno(t.replace(/[^0-9]/g, ''))} onSubmitEditing={onCalcular} returnKeyType="done" />
              <Text style={styles.legendaInput}>Ano</Text>
            </View>
          </View>

          {erro ? <Text style={styles.textoErro}>⚠️ {erro}</Text> : null}

          <View style={styles.linhaBotoes}>
            <TouchableOpacity style={styles.botaoLimpar} onPress={onLimpar} activeOpacity={0.7}><Text style={styles.textoBotaoLimpar}>Limpar</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.botaoCalcular, { backgroundColor: corDestaque }]} onPress={onCalcular} activeOpacity={0.85}><Text style={styles.textoBotaoCalcular}>Calcular idade</Text></TouchableOpacity>
          </View>
        </View>

        {resultado && (
          <Animated.View style={[styles.resultadoCard, { opacity: fadeAnim, transform: [{ scale: scaleAnim }], borderColor: resultado.faixa.cor }]}>
            <View style={[styles.badge, { backgroundColor: resultado.faixa.corClara }]}>
              <Text style={styles.badgeEmoji}>{resultado.faixa.emoji}</Text>
              <Text style={[styles.badgeTexto, { color: resultado.faixa.cor }]}>{resultado.faixa.label}</Text>
            </View>
            <Text style={styles.faixaDescricao}>{resultado.faixa.descricao}</Text>
            <View style={styles.linhaValores}>
              <View style={styles.valorBox}><Text style={[styles.valorNumero, { color: resultado.faixa.cor }]}>{resultado.anos}</Text><Text style={styles.valorLegenda}>{resultado.anos === 1 ? 'ano' : 'anos'}</Text></View>
              <View style={styles.valorBox}><Text style={[styles.valorNumero, { color: resultado.faixa.cor }]}>{resultado.meses}</Text><Text style={styles.valorLegenda}>{resultado.meses === 1 ? 'mês' : 'meses'}</Text></View>
              <View style={styles.valorBox}><Text style={[styles.valorNumero, { color: resultado.faixa.cor }]}>{resultado.dias}</Text><Text style={styles.valorLegenda}>{resultado.dias === 1 ? 'dia' : 'dias'}</Text></View>
            </View>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}