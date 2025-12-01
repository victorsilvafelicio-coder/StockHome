# Justificativa de Normalização do Banco de Dados

Este documento descreve como as três primeiras Formas Normais (1FN, 2FN e 3FN) foram aplicadas ao modelo de dados, apresentando exemplos práticos de eliminação de redundância e destacando casos em que a normalização foi flexibilizada por questões de desempenho ou simplicidade.

---

# 1. Primeira Forma Normal (1FN)

A 1FN exige que:

- Não existam atributos multivalorados  
- Não existam atributos compostos  
- Não existam repetições de grupos de atributos  
- Toda célula da tabela deve conter **valor atômico**

### Aplicações no Modelo

### **Exemplo 1: Separação de Itens do Pedido**
Um pedido pode conter vários produtos. Em um modelo não normalizado poderíamos ter:

| id_pedido | produto1 | produto2 | produto3 | ... |

Isso **quebra a 1FN**.

Para atender à 1FN, criamos a tabela:

**ITENS_PEDIDOS (id_item, id_pedido, id_produto, quantidade, preco_unitario)**

Agora cada item é uma linha atômica.  
Evita colunas duplicadas e atributos multivalorados.

---

### **Exemplo 2: Telefones e Endereços de Clientes**
Um cliente pode ter vários telefones e endereços, mas o modelo limita a um único telefone/endereço por simplificação.

Isso atende à 1FN, pois:

- Telefones não estão em uma lista dentro de uma mesma célula
- Não há múltiplas colunas telefone1, telefone2, telefone3...

Caso fosse necessário múltiplos telefones, seria criada uma tabela:

**CLIENTES_TELEFONES(id_cliente, telefone)**

---

# 2. Segunda Forma Normal (2FN)

A 2FN exige que:

- O banco já esteja na 1FN  
- Nenhum atributo não-chave dependa parcialmente da chave primária  
- Ou seja, aplica-se a tabelas com **chave primária composta**

### Aplicações no Modelo

### **Exemplo 1: Tabela ITENS_PEDIDOS**
Em um modelo errado, poderíamos ter algo assim:

ITENS_PEDIDOS(id_pedido, id_produto, quantidade, preco_atual_produto, nome_produto)

Aqui, **nome_produto** depende apenas de **id_produto**, e não da chave composta inteira.

Para corrigir:

- Manteve-se na tabela apenas atributos dependentes da chave (id_pedido, id_produto)
- Informações do produto foram movidas para a tabela PRODUTOS

Tabela normalizada:

**ITENS_PEDIDOS(id_item PK, id_pedido FK, id_produto FK, quantidade, preco_unitario)**

---

### **Exemplo 2: Tabela ITENS_COMPRA**
Mesma lógica da tabela de itens de pedido.

Antes da normalização (exemplo incorreto):

| id_compra | id_produto | nome_produto | custo_unitario | quantidade |

"nome_produto" depende apenas de "id_produto".

Após normalização:

- nome_produto → removido  
- custo_unitario → mantido (pois pertence ao item no momento da compra)  
- quantidade → mantido  

---

# 3. Terceira Forma Normal (3FN)

A 3FN exige que:

- O banco esteja na 2FN  
- Nenhum atributo não-chave dependa transitivamente da chave primária  
- Atributos devem depender **diretamente** da chave primária

### Aplicações no Modelo

### **Exemplo 1: CLIENTES**
Antes (incorreto):

| id_cliente | endereço | cidade | estado | cep |

Aqui, "cidade", "estado" e "cep" dependem de “endereço”.

Como simplificação, o endereço foi mantido como um campo único (VARCHAR).  
Assim, **não ocorre dependência transitiva**, pois o atributo é atômico:

**endereco VARCHAR(250)**

---

### **Exemplo 2: Tabela TRANSAÇÕES_FINANCEIRAS**
Normalização incorreta possível:

| id_transacao | id_categoria | nome_categoria | tipo | valor |

"nome_categoria" depende de "id_categoria", não de "id_transacao".

Correção: criar tabela separada:

**CATEGORIAS_FINANCEIRAS(id_categoria, nome_categoria)**

Assim, TRANSAÇÕES_FINANCEIRAS fica somente com atributos que dependem dela:

**(id_transacao, id_categoria, data, tipo, valor, descricao)**

---

### **Exemplo 3: Tabela USUÁRIOS**
Antes (não normalizado):

| id_usu | nome | email | senha | tipo_usuario | descricao_tipo |

"descricao_tipo" depende de "tipo_usuario", não de "id_usu".

Correção:

Criar tabela **TIPO_USUARIO**  
Deixar na tabela USUÁRIOS apenas atributos dependentes diretamente da chave.

---

# 4. Casos em que a Normalização Foi Parcialmente Aplicada

Embora o modelo siga 1FN, 2FN e 3FN, algumas decisões foram tomadas conscientemente **para equilibrar normalização vs. performance**.

Abaixo estão os casos intencionais de “desnormalização controlada”.

---

## **4.1 Campo `preco_unitario` em ITENS_PEDIDOS**
O preço está duplicado em relação à tabela PRODUTOS.

### Por que manter?
- O preço pode mudar no futuro.
- O item deve registrar o valor histórico da venda.
- Evita reprocessamento de preços antigos.

 **Decisão de performance e histórico → justificada.**

---

## **4.2 Campo `custo_unitario` em ITENS_COMPRA**
Mesma justificativa do item acima.

Permite manter registros históricos **sem recalcular dados antigos**.

---

## **4.3 Endereço mantido em uma única coluna**
Um endereço normalizado exigiria:

- LOGRADOURO  
- NUMERO  
- BAIRRO  
- CIDADE  
- ESTADO  
- CEP  

Isso geraria uma tabela adicional ou múltiplos campos.

### Por que manter de forma mais simples?

- Simplifica cadastro  
- Evita joins desnecessários  
- Não há grande impacto na análise de dados

**Desnormalização leve por simplicidade.**

---

## **4.4 Tabela de CHAMADOS_SUPORTE não possui ligação com PEDIDOS**
No mundo real, poderia haver:

- Chamados sobre pedidos
- Chamados sobre produtos
- Chamados internos

Criar relacionamentos adicionais:

- aumentaria complexidade
- exigiria múltiplas chaves estrangeiras opcionais

### Decisão adotada:
Ligar o chamado apenas ao cliente.  
Suficiente para o propósito do sistema.

---

# 5. Conclusão

O banco de dados foi modelado seguindo rigorosamente:

- **1FN** – eliminando atributos multivalorados e garantindo atomicidade  
- **2FN** – removendo dependência parcial em chaves compostas  
- **3FN** – eliminando dependências transitivas  

Além disso:

- Foram aplicadas desnormalizações moderadas  
- Sempre com justificativas ligadas a desempenho, simplicidade ou histórico de preços

---

