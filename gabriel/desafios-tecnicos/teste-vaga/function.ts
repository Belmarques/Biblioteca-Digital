//Teste numero 01: 
//1) Observe o trecho de código abaixo: int INDICE = 13, SOMA = 0, K = 0;
//Enquanto K < INDICE faça { K = K + 1; SOMA = SOMA + K; }
//Imprimir(SOMA);
//Ao final do processamento, qual será o valor da variável SOMA?

const calculatesum = (indice:number, soma:number, k:number) => {
indice: 13;
soma: 0;
k: 0;
  while(k < indice){
    k = k + 1;
    soma = soma + k;
  }
  return soma;
}
console.log(calculatesum(13, 0, 0));

// const indice:number = 13;
// let soma:number = 0;
// let k:number = 0;

// while(k < indice){
//   k = k + 1;
//   soma = soma + k;
// }
// console.log(soma);

//Teste numero 02:
//2) Dado a sequência de Fibonacci, 
//onde se inicia por 0 e 1 e o próximo valor sempre será a soma dos 2 valores anteriores 
//(exemplo: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...), 
//escreva um programa na linguagem que desejar onde, 
//informado um número, ele calcule a sequência de Fibonacci e 
//retorne uma mensagem avisando se o número informado pertence ou não a sequência.

const calculateFibonacci = (number:number) => {
  let a = 0;
  let b = 1;
  let c = 0;
let isFibonacci = false;
while( c < number) {
  c = a + b;
  a = b;
  b = c;
  if(c === number){
    isFibonacci = true;
  }
}
return isFibonacci;
}
console.log(calculateFibonacci(21));

//teste numero 03:
//3) Dado um vetor que guarda o valor de faturamento diário de uma distribuidora, 
//faça um programa, na linguagem que desejar, que calcule e retorne:
//• O menor valor de faturamento ocorrido em um dia do mês;
//• O maior valor de faturamento ocorrido em um dia do mês;
//• Número de dias no mês em que o valor de faturamento diário foi superior à média mensal.

const calculateFaturamento = () => {
const data = [
	{
		"dia": 1,
		"valor": 22174.1664
	},
	{
		"dia": 2,
		"valor": 24537.6698
	},
	{
		"dia": 3,
		"valor": 26139.6134
	},
	{
		"dia": 4,
		"valor": 0.0
	},
	{
		"dia": 5,
		"valor": 0.0
	},
	{
		"dia": 6,
		"valor": 26742.6612
	},
	{
		"dia": 7,
		"valor": 0.0
	},
	{
		"dia": 8,
		"valor": 42889.2258
	},
	{
		"dia": 9,
		"valor": 46251.174
	},
	{
		"dia": 10,
		"valor": 11191.4722
	},
	{
		"dia": 11,
		"valor": 0.0
	},
	{
		"dia": 12,
		"valor": 0.0
	},
	{
		"dia": 13,
		"valor": 3847.4823
	},
	{
		"dia": 14,
		"valor": 373.7838
	},
	{
		"dia": 15,
		"valor": 2659.7563
	},
	{
		"dia": 16,
		"valor": 48924.2448
	},
	{
		"dia": 17,
		"valor": 18419.2614
	},
	{
		"dia": 18,
		"valor": 0.0
	},
	{
		"dia": 19,
		"valor": 0.0
	},
	{
		"dia": 20,
		"valor": 35240.1826
	},
	{
		"dia": 21,
		"valor": 43829.1667
	},
	{
		"dia": 22,
		"valor": 18235.6852
	},
	{
		"dia": 23,
		"valor": 4355.0662
	},
	{
		"dia": 24,
		"valor": 13327.1025
	},
	{
		"dia": 25,
		"valor": 0.0
	},
	{
		"dia": 26,
		"valor": 0.0
	},
	{
		"dia": 27,
		"valor": 25681.8318
	},
	{
		"dia": 28,
		"valor": 1718.1221
	},
	{
		"dia": 29,
		"valor": 13220.495
	},
	{
		"dia": 30,
		"valor": 8414.61
	}
];

const validDays = data.filter((item) => item.valor >0);
const maior = Math.max(...validDays.map((item) => item.valor));
const menor = Math.min(...data.map((item) => item.valor ));
const menorSemZero = Math.min(...validDays.map((item) => item.valor));
const soma = validDays.reduce((acc, item) => (acc + item.valor), 0);
const media = soma / validDays.length;
const daysAboveAverage = validDays.filter((item) => item.valor > media).length;
console.log(`O menor valor de faturamento ocorrido em um dia do mês é: ${menor}`);
console.log(`O menor valor de faturamento ocorrido em um dia do mês sem considerar os dias com valor 0 é: ${menorSemZero}`);
console.log(`O maior valor de faturamento ocorrido em um dia do mês é: ${maior}`);
console.log(`Número de dias no mês em que o valor de faturamento diário foi superior à média mensal é: ${daysAboveAverage}`)
console.log(`A média mensal é: ${media.toFixed(2)}`);
;

}
calculateFaturamento();

//teste numero 04:
//4) Dado o valor de faturamento mensal de uma distribuidora, detalhado por estado:
//• SP – R$67.836,43
//• RJ – R$36.678,66
//• MG – R$29.229,88
//• ES – R$27.165,48
//• Outros – R$19.849,53
//Escreva um programa na linguagem que desejar onde calcule o percentual de 
//representação que cada estado teve dentro do valor total mensal da distribuidora.  


  const sp = 67836.43;
  const rj = 36678.66;
  const mg = 29229.88;
  const es = 27165.48;
  const outros = 19849.53;

  const total = sp + rj + mg + es + outros;
const percentual = (valor:number) => {
  return (valor / total) * 100;
}
console.log(percentual(rj).toFixed(2));
console.log(percentual(sp).toFixed(2));
console.log(percentual(mg).toFixed(2));
console.log(percentual(es).toFixed(2));
console.log(percentual(outros).toFixed(2));

//teste numero 05:
//5) Escreva um programa que inverta os caracteres de um string.
const invertString = (string:string) => {
  let palavra = '';

  for(let i = string.length -1; i >= 0; i--){
    palavra += string[i];
  }
  return palavra;
}
console.log(invertString('teste'));