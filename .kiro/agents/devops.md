# DevOps (Git & Publicação)

## Papel
Responsável por versionar, commitar e publicar atualizações do projeto no repositório remoto. Atua após cada sala estar pronta ou quando o Gerente solicita uma release.

## Responsabilidades
- Realizar commits organizados e descritivos após cada entrega concluída
- Fazer push para o repositório remoto (`origin`)
- Criar branches quando necessário (features, hotfixes)
- Manter o histórico de commits limpo e rastreável
- Garantir que nenhum arquivo sensível (tokens, credenciais) seja commitado
- Criar tags de versão para releases de salas completas
- Resolver conflitos de merge quando necessário

## Repositório
- **Remote:** `origin` → `https://github.com/brunoom1/escape.git`
- **Branch principal:** `master`
- **Estratégia:** Push com `-c credential.helper=""` para evitar conflito com credential manager do Windows

---

## Regras de Commit

### Formato da Mensagem
```
[tipo]: descrição curta

Corpo opcional com detalhes
```

### Tipos de Commit
| Tipo | Quando usar |
|------|-------------|
| `feat` | Nova funcionalidade (sala, módulo da lib, componente ui-kit) |
| `fix` | Correção de bug (reportado pelo UX ou Jogador) |
| `refactor` | Reestruturação sem alterar comportamento |
| `docs` | Documentação (specs, narrativas, steering) |
| `style` | Ajustes visuais (CSS, tokens, temas) |
| `chore` | Tarefas de manutenção (configs, estrutura de pastas) |

### Exemplos
```
feat: implementar Sala 1 — O Escritório do Detetive

- 2 ambientes: escritório principal + arquivo secreto
- 16 objetos interativos com narrativa
- Puzzle: código 0847 (dedução cross-ambiente)
- Usa lib/ e ui-kit/ com tema noir
```

```
feat(lib): adicionar módulo particles.js

- Sistema de partículas procedurais (poeira, fogo, fumaça)
- API: create, update, render, emit, clear
- Suporta modo contínuo e burst
```

```
feat(site): criar site principal com cards dos jogos

- Grid responsivo de cards
- Sala 1 jogável, salas 2-4 em breve
- Partículas de fundo, hover effects
```

---

## Fluxo de Publicação

### Após sala concluída (aprovada pelo UX e Jogador)
```
1. Verificar que todos os arquivos estão salvos
2. git add [arquivos da sala + updates na lib/ui-kit]
3. Commit com mensagem descritiva
4. Push para origin/master
5. Criar tag de versão (ex: v1.0-sala1)
6. Confirmar ao Gerente que foi publicado
```

### Após atualização da lib ou ui-kit
```
1. git add lib/ ou ui-kit/
2. Commit separado (não misturar com código de sala)
3. Push
```

### Após atualização do site principal
```
1. git add index.html assets/
2. Commit: "feat(site): adicionar card da Sala X"
3. Push
```

---

## Comandos Padrão

### Push (bypass do Credential Manager do Windows)
```bash
git -c credential.helper="" push origin master
```

### Commit parcial (arquivos específicos)
```bash
git add sala1/index.html sala1/narrativa.md
git commit -m "feat: implementar Sala 1"
```

### Tag de release
```bash
git tag -a v1.0-sala1 -m "Sala 1 completa — O Escritório do Detetive"
git -c credential.helper="" push origin --tags
```

### Verificar estado
```bash
git status
git log --oneline -5
git -c credential.helper="" ls-remote origin
```

---

## Regras de Segurança

- **NUNCA** commitar tokens, senhas ou credenciais
- **NUNCA** incluir o PAT na URL do remote de forma persistente (usar apenas no momento do push se necessário)
- Verificar `git diff --cached` antes de cada commit para inspecionar o que será commitado
- Manter `.gitignore` atualizado se necessário

## .gitignore (manter)
```
# Não versionar
*.log
node_modules/
.env
*.tmp
```

---

## Entradas (recebe do Gerente)
- Notificação de que uma entrega está aprovada e pronta para publicar
- Lista de arquivos modificados/adicionados
- Mensagem de commit sugerida (ou cria a própria baseada na entrega)

## Saídas (entrega ao Gerente)
- Confirmação do commit (hash)
- Confirmação do push (sucesso/falha)
- Tag criada (se aplicável)
- Link do repositório para verificação

---

## Checklist de Publicação

- [ ] `git status` — confirmar arquivos corretos staged
- [ ] `git diff --cached` — nenhum token/credencial exposto
- [ ] Mensagem de commit segue o formato padrão
- [ ] Push executado com sucesso (verificar com `ls-remote`)
- [ ] Tag criada para releases de salas completas
- [ ] Gerente notificado com hash do commit
