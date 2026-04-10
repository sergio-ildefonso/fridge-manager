# Fridge Manager

Uma aplicação web simples para gerir os itens do teu frigorífico com base de dados local.

## Funcionalidades

- 📝 Adicionar itens ao frigorífico
- ✏️ Editar itens existentes
- 🗑️ Remover itens
- 🔍 Pesquisar e filtrar itens
- 📊 Estatísticas em tempo real
- ⚠️ Alertas para itens a expirar ou vencidos
- 📅 Gestão de validade por item

## Tecnologias

- **Frontend:** React + TypeScript + Vite
- **Base de Dados:** Dexie.js (IndexedDB)
- **Estilos:** Tailwind CSS
- **Ícones:** React Icons

## Como Começar

1. Instala as dependências:
   ```bash
   npm install
   ```

2. Inicia o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. A app estará disponível em `http://localhost:5173`

## Estrutura do Projeto

```
src/
├── components/      # Componentes React
├── db.ts            # Configuração da base de dados
├── App.tsx          # Componente principal
├── main.tsx         # Ponto de entrada
└── index.css        # Estilos globais
```

## Próximos Passos (opcional)

- Adicionar upload de imagens para os itens
- Implementar categorias personalizadas
- Adicionar notificações push para itens a expirar
- Criar relatórios semanais/mensais
- Adicionar modo offline completo
- Implementar sincronização entre dispositivos

## Notas

- Todos os dados são guardados localmente no navegador
- A app funciona offline após a primeira carga
- Suporta múltiplos dispositivos do mesmo utilizador (cada um com a sua base de dados local)

---

**Desenvolvido com ❤️ para o teu frigorífico!** 🧊