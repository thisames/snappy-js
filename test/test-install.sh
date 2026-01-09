#!/bin/bash

echo "════════════════════════════════════════════════════════════"
echo "  Simulando Experiência do Usuário Final"
echo "════════════════════════════════════════════════════════════"
echo ""

# Criar diretório temporário
TEMP_DIR=$(mktemp -d)
echo "📁 Criando projeto de teste em: $TEMP_DIR"
cd "$TEMP_DIR"

# Criar package.json simples
echo "📦 Criando package.json..."
cat > package.json << 'EOF'
{
  "name": "test-snappy-js",
  "version": "1.0.0",
  "description": "Teste de instalação do snappy-js"
}
EOF

# Instalar a biblioteca localmente
echo ""
echo "⚡ Instalando snappy-js..."
echo ""
npm install "$OLDPWD"

# Criar arquivo de teste
echo ""
echo "📝 Criando teste..."
cat > test.js << 'EOF'
const snappy = require('snappy-js');

console.log('\n✅ snappy-js instalado com sucesso!\n');

// Teste básico
const texto = 'Hello, World! Este é um teste do Snappy-JS.';
console.log('Texto original:', texto);

const comprimido = snappy.compressSync(texto);
console.log('Comprimido:', comprimido.length, 'bytes');

const descomprimido = snappy.uncompressSync(comprimido);
console.log('Descomprimido:', descomprimido);

if (texto === descomprimido) {
  console.log('\n🎉 Teste passou! A biblioteca está funcionando perfeitamente.\n');
} else {
  console.log('\n❌ Erro: dados não coincidem!\n');
  process.exit(1);
}
EOF

# Executar teste
echo ""
echo "🧪 Executando teste..."
node test.js

# Limpar
echo ""
echo "🧹 Limpando diretório temporário..."
cd -
rm -rf "$TEMP_DIR"

echo ""
echo "════════════════════════════════════════════════════════════"
echo "  ✅ Simulação Completa!"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Isso é exatamente o que os usuários vão experimentar quando"
echo "fizerem: npm install snappy-js"
echo ""

