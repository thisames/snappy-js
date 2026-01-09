const snappy = require('../dist/index');

console.log('=== Snappy Native - Exemplos de Uso ===\n');

// Exemplo 1: Compressão básica
console.log('1. Compressão Básica de Texto:');
const texto = 'Olá! Este é um exemplo de compressão usando Snappy nativo do Google!';
const comprimido = snappy.compressSync(texto);
const descomprimido = snappy.uncompressSync(comprimido);

console.log('  Texto original:', texto);
console.log('  Tamanho original:', Buffer.from(texto).length, 'bytes');
console.log('  Tamanho comprimido:', comprimido.length, 'bytes');
console.log('  Texto descomprimido:', descomprimido);
console.log('  ✓ Sucesso!\n');

// Exemplo 2: Compressão de JSON
console.log('2. Compressão de Dados JSON:');
const dados = {
  usuario: 'João Silva',
  idade: 30,
  email: 'joao@example.com',
  interesses: ['programação', 'música', 'esportes'],
  configuracoes: {
    tema: 'escuro',
    notificacoes: true,
    idioma: 'pt-BR'
  }
};

const jsonString = JSON.stringify(dados);
const jsonComprimido = snappy.compressSync(jsonString);
const jsonDescomprimido = snappy.uncompressSync(jsonComprimido);
const dadosRecuperados = JSON.parse(jsonDescomprimido);

console.log('  JSON original:', jsonString.length, 'bytes');
console.log('  JSON comprimido:', jsonComprimido.length, 'bytes');
console.log('  Economia:', ((1 - jsonComprimido.length / jsonString.length) * 100).toFixed(2) + '%');
console.log('  Dados recuperados:', dadosRecuperados);
console.log('  ✓ Sucesso!\n');

// Exemplo 3: Buffer binário
console.log('3. Compressão de Buffer Binário:');
const bufferOriginal = Buffer.alloc(1000);
for (let i = 0; i < 1000; i++) {
  bufferOriginal[i] = i % 256;
}

const bufferComprimido = snappy.compress(bufferOriginal);
const bufferDescomprimido = snappy.uncompress(bufferComprimido);

console.log('  Buffer original:', bufferOriginal.length, 'bytes');
console.log('  Buffer comprimido:', bufferComprimido.length, 'bytes');
console.log('  Compressão:', ((1 - bufferComprimido.length / bufferOriginal.length) * 100).toFixed(2) + '%');
console.log('  Buffers são iguais:', bufferOriginal.equals(bufferDescomprimido));
console.log('  ✓ Sucesso!\n');

// Exemplo 4: Texto repetitivo (alta compressão)
console.log('4. Compressão de Texto Repetitivo:');
const textoRepetitivo = 'Lorem ipsum dolor sit amet. '.repeat(100);
const comprimidoRepetitivo = snappy.compressSync(textoRepetitivo);

console.log('  Texto original:', textoRepetitivo.length, 'bytes');
console.log('  Texto comprimido:', comprimidoRepetitivo.length, 'bytes');
console.log('  Taxa de compressão:', (textoRepetitivo.length / comprimidoRepetitivo.length).toFixed(2) + 'x');
console.log('  Economia:', ((1 - comprimidoRepetitivo.length / textoRepetitivo.length) * 100).toFixed(2) + '%');
console.log('  ✓ Sucesso!\n');

// Exemplo 5: Validação de dados
console.log('5. Validação de Dados Comprimidos:');
const dadosValidos = snappy.compress(Buffer.from('teste'));
const dadosInvalidos = Buffer.from('isto não é snappy comprimido');

console.log('  Dados válidos:', snappy.isValidCompressed(dadosValidos) ? '✓ Válido' : '✗ Inválido');
console.log('  Dados inválidos:', snappy.isValidCompressed(dadosInvalidos) ? '✓ Válido' : '✗ Inválido');

// Verificar tamanho descomprimido
const tamanhoDescomprimido = snappy.uncompressedLength(dadosValidos);
console.log('  Tamanho descomprimido (sem descomprimir):', tamanhoDescomprimido, 'bytes');
console.log('  ✓ Sucesso!\n');

// Exemplo 6: Benchmark de performance
console.log('6. Benchmark de Performance:');
const dataTeste = Buffer.from('x'.repeat(1024 * 100)); // 100KB
const iteracoes = 100;

console.time('  Tempo total de compressão');
for (let i = 0; i < iteracoes; i++) {
  snappy.compress(dataTeste);
}
console.timeEnd('  Tempo total de compressão');

const dataComprimida = snappy.compress(dataTeste);
console.time('  Tempo total de descompressão');
for (let i = 0; i < iteracoes; i++) {
  snappy.uncompress(dataComprimida);
}
console.timeEnd('  Tempo total de descompressão');

const mbsCompressao = ((dataTeste.length * iteracoes) / (1024 * 1024)).toFixed(2);
const mbsDescompressao = ((dataTeste.length * iteracoes) / (1024 * 1024)).toFixed(2);
console.log('  Volume processado:', mbsCompressao, 'MB');
console.log('  ✓ Sucesso!\n');

console.log('=== Todos os exemplos executados com sucesso! ===');

