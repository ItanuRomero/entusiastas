# entusiastas

Escreva sobre o que você é entusiasta!

## Contribua

### Guia de commits

Separe cada **mudança lógica** em um commit diferente.

Utilize o padrão `<type>[<optional scope>]: <summary>`, onde:

- Type é o tipo da alteração, como feat, fix, refac, ci, etc...
- Scope é o escopo ou contexto de onde ou o que está sendo modificado
- Summary é o resumo das alterações, utilizando sempre o presente no imperativo

Dê preferência ao inglês.
OBS: Em caso de problemas com o commitlint, veja [esta dica](https://github.com/ItanuRomero/entusiastas/README.md#ao-encontrar-o-erro-de-commitlint-no-ci)

### Configurando o projeto

#### Dicas

##### Ajustar o prettier automático antes de realizar o commit

Execute o arquivo `./infra/scripts/setup-pre-commit.sh` para configurar o prettier fix automático antes de realizar o commit localmente!

##### Ao encontrar o erro de commitlint no CI:

Utilize o comando `git rebase -i HEAD~{número de commits do seu PR}` e modifique as mensagens de commit para respeitarem os commits do projeto
