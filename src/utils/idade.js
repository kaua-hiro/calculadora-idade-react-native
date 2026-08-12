export const FAIXAS = {
  JOVEM: {
    label: 'Jovem',
    emoji: '🧒',
    cor: '#22c55e',
    corClara: '#dcfce7',
    descricao: 'até 19 anos',
  },
  ADULTO: {
    label: 'Adulto',
    emoji: '🧑',
    cor: '#3b82f6',
    corClara: '#dbeafe',
    descricao: '20 a 59 anos',
  },
  IDOSO: {
    label: 'Idoso',
    emoji: '🧓',
    cor: '#a855f7',
    corClara: '#f3e8ff',
    descricao: '60 anos ou mais',
  },
};

export function classificarFaixa(anos) {
  if (anos <= 19) return FAIXAS.JOVEM;
  if (anos <= 59) return FAIXAS.ADULTO;
  return FAIXAS.IDOSO;
}

export function diasNoMes(mes, ano) {
  return new Date(ano, mes, 0).getDate();
}

export function somarMesesComLimite(data, n) {
  const anoBase = data.getFullYear();
  const mesBase = data.getMonth();
  const dia = data.getDate();

  const mesTotal = mesBase + n;
  const anoAlvo = anoBase + Math.floor(mesTotal / 12);
  const mesAlvo = ((mesTotal % 12) + 12) % 12;
  const diaAjustado = Math.min(dia, diasNoMes(mesAlvo + 1, anoAlvo));

  return new Date(anoAlvo, mesAlvo, diaAjustado);
}

export function calcularIdade(nascimento, hoje) {
  let anos = hoje.getFullYear() - nascimento.getFullYear();
  let ultimoAniversario = somarMesesComLimite(nascimento, anos * 12);
  if (ultimoAniversario.getTime() > hoje.getTime()) {
    anos -= 1;
    ultimoAniversario = somarMesesComLimite(nascimento, anos * 12);
  }

  let meses = 0;
  let proximoMes = somarMesesComLimite(ultimoAniversario, meses + 1);
  while (proximoMes.getTime() <= hoje.getTime()) {
    meses += 1;
    proximoMes = somarMesesComLimite(ultimoAniversario, meses + 1);
  }
  const dataBase = somarMesesComLimite(ultimoAniversario, meses);

  const MS_POR_DIA = 1000 * 60 * 60 * 24;
  const dias = Math.round((hoje.getTime() - dataBase.getTime()) / MS_POR_DIA);

  return { anos, meses, dias };
}