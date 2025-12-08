# Normalização do Banco de Dados  
## (1FN, 2FN, 3FN) — Justificativas e Aplicações

Este documento descreve como as Formas Normais foram aplicadas ao banco de dados desenvolvido no arquivo `schema.sql`, assim como exemplos práticos de eliminação de redundâncias e os raros casos em que a normalização foi flexibilizada por motivos funcionais e de desempenho.

---

#  1. Primeira Forma Normal (1FN)

A 1ª Forma Normal exige:

- Ausência de atributos multivalorados  
- Ausência de atributos compostos  
- Todos os campos contendo **apenas valores atômicos**  
- Linhas e colunas distintas

###  Aplicação no projeto

- Nenhuma tabela possui colunas com múltiplos valores.
- Todos os atributos são atômicos (ex.: `EMAIL`, `TELEFONE`, `PRECO`, etc.).
- Tabelas possuem chave primária definida.
- Restrições como `CHECK (TELEFONE NOT LIKE '0%')` garantem integridade de valores.

### Exemplos práticos

| Tabela | Ajuste 1FN | Resultado |
|-------|-----------|-----------|
| CLIENTES | Telefone armazenado como um único valor, não como lista | Valor atômico |
| PRODUTOS | CATEGORIA não armazenada em lista | Valor único |
| ITENS_PEDIDOS | Cada produto de um pedido está em uma linha separada | Atomicidade garantida |

---

#  2. Segunda Forma Normal (2FN)

A 2ª Forma Normal exige:

- Estar em 1FN  
- Não possuir **dependências parciais** (atributos não-chave dependentes apenas de parte da chave primária composta)

### Aplicação no projeto

- Todas as tabelas com chaves simples (IDs) já atendem 2FN naturalmente.
- Tabelas com chave composta foram analisadas:

#### Tabela `PEDIDOS_USUARIOS`
- Chave composta: `(ID_PEDIDO, ID_USUARIO)`
- Não existe qualquer atributo adicional dependente de apenas uma parte da chave.
- Portanto, **não há dependências parciais**.

### Exemplo prático

Sem criação de colunas como “PERMISSAO_USUARIO_NO_PEDIDO”, evitando dependências parciais.

---

# 3. Terceira Forma Normal (3FN)

A 3ª Forma Normal exige:

- Estar na 2FN  
- Não possuir **dependências transitivas** (coluna não-chave → outra coluna não-chave)

### Aplicação no projeto

Os exemplos mais claros de 3FN aparecem nas entidades:

#### CLIENTES
- EMAIL depende apenas do cliente  
- TELEFONE depende apenas do cliente  

Nenhum campo depende de outro campo não-chave → **sem transitividade**.

#### PRODUTOS
- PREÇO depende apenas do produto  
- ESTOQUE_ATUAL depende apenas do produto  

####  PEDIDOS
- VALOR_TOTAL não é derivado de outro atributo parcial — deriva dos itens, mas é armazenado por performance → *não viola 3FN* porque não é dependência transicional direta entre atributos da tabela.

####  TRANSACOES_FINANCEIRAS x NOTA_FISCAL
- `ID_TRANSACAO` (1:1) evita transições inconsistentes.  
- Cada nota fiscal referencia apenas uma transação.

---

# Exemplos práticos de eliminação de redundância

### 1. Separação de FORNECEDORES e COMPRAS
Antes (possível redundância):

- Cada compra poderia armazenar informações repetidas do fornecedor.

Depois:

- `COMPRAS` referencia `FORNECEDORES` via `ID_FORNECEDOR`.
- Evita duplicação de CNPJ, TELEFONE, EMAIL.

---

### 2. Separação de CLIENTES e PEDIDOS
Antes (possível redundância):

- Dados do cliente repetidos a cada pedido

Depois:

- `PEDIDOS` possui apenas `ID_CLIENTE`.  
- Nome, telefone, e-mail não se repetem.

---

### 3. Nota Fiscal separada de Transações Financeiras
Antes:

- Poderia repetir número, chave e dados financeiros.

Depois:

- `NOTA_FISCAL` referencia `TRANSACOES_FINANCEIRAS`  
- Sem duplicação de transação.

---

# Casos em que a normalização foi flexibilizada

###  1. Campo VALOR_TOTAL em PEDIDOS e COMPRAS  
**Por normalização pura**, o valor total deveria ser calculado *sempre* a partir dos itens (ITENS_PEDIDOS e ITENS_COMPRA).

**Porém**, por motivo de desempenho e histórico contábil, decidiu-se armazenar o valor total.

Justificativa:
- Evita recomputações pesadas em relatórios.
- Permite histórico imutável de valores mesmo se preços forem alterados.
- Mantém consistência lógica ao registrar dados financeiros.

---

### 2. Campo CATEGORIA em PRODUTOS  
Idealmente, deveria existir uma tabela `CATEGORIAS_PRODUTOS`.

Mas foi flexibilizado porque:
- O sistema não possui relação complexa de categorias.
- A tabela de categorias traria complexidade desnecessária ao CRUD.

Caso o projeto cresça, essa tabela pode ser criada facilmente.

---



