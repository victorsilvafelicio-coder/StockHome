# Modelo Entidade-Relacionamento (MER)

## 1. Introdução
Este documento descreve o Modelo Entidade-Relacionamento (MER) de um sistema que integra processos de vendas, compras, estoque, faturamento, logística e suporte ao cliente.

Inclui:

- Entidades e atributos  
- Relacionamentos e cardinalidades  
- Justificativa dos relacionamentos  
- Regras de negócio que influenciaram a modelagem  

---

# 2. Entidades e Atributos

## 2.1 CLIENTES
- **id_cliente (PK)** – Identificador único do cliente  
- **nome** – Nome completo  
- **email** – Email para contato  
- **telefone** – Telefone  
- **endereço** – Endereço completo  
- **data_cadastro** – Data de registro  

---

## 2.2 PEDIDOS
- **id_pedido (PK)** – Identificador único do pedido  
- **id_cliente (FK)** – Cliente que fez o pedido  
- **data_pedido** – Data de criação  
- **status** – Estado atual (ex: Aberto, Enviado, Concluído)  
- **valor_total** – Valor calculado  

---

## 2.3 ITENS_PEDIDOS
- **id_item (PK)** – Identificador do item  
- **id_pedido (FK)** – Pedido vinculado  
- **id_produto (FK)** – Produto solicitado  
- **quantidade** – Quantidade adquirida  
- **preco_unitario** – Preço unitário no momento  

---

## 2.4 PRODUTOS
- **id_produto (PK)** – Identificador único  
- **nome** – Nome do produto  
- **categoria** – Categoria do produto  
- **descricao** – Descrição detalhada  
- **preco** – Preço atual  
- **estoque_atual** – Quantidade disponível  

---

## 2.5 ESTOQUE_MOVIMENTAÇÕES
- **id_mov (PK)** – Identificador da movimentação  
- **id_produto (FK)** – Produto movimentado  
- **tipo** – Entrada ou Saída  
- **quantidade** – Quantidade movimentada  
- **data_mov** – Data da operação  

---

## 2.6 FORNECEDORES
- **id_fornecedor (PK)** – Identificador  
- **nome** – Nome/Razão social  
- **cnpj** – Documento fiscal  
- **telefone** – Telefone  
- **email** – Email de contato  

---

## 2.7 COMPRAS
- **id_compra (PK)** – Identificador da compra  
- **id_fornecedor (FK)** – Fornecedor da compra  
- **data_compra** – Data da transação  
- **valor_total** – Valor total da compra  

---

## 2.8 ITENS_COMPRA
- **id_item_compra (PK)** – Identificador do item  
- **id_compra (FK)** – Compra associada  
- **id_produto (FK)** – Produto adquirido  
- **quantidade** – Quantidade  
- **custo_unitario** – Custo unitário  

---

## 2.9 NOTA_FISCAL
- **id_nota_fiscal (PK)** – Identificador  
- **data_transacao** – Data da emissão  
- **valor** – Valor total  
- **cpf** – CPF do cliente  

---

## 2.10 TRANSAÇÕES_FINANCEIRAS
- **id_transacao (PK)** – Identificador  
- **id_categoria (FK)** – Categoria da transação  
- **data_transacao** – Data  
- **tipo** – Entrada/Saída  
- **valor** – Valor  
- **descricao** – Observações  

---

## 2.11 CHAMADOS_SUPORTE
- **id_chamado (PK)** – Identificador  
- **id_cliente (FK)** – Cliente que abriu  
- **data_abertura** – Data do chamado  
- **status** – Estado atual  
- **descricao** – Descrição do problema  

---

## 2.12 ENVIO_TRANSPORTADORA
- **id_envio_transportadora (PK)** – Identificador  
- **id_pedido (FK)** – Pedido enviado  
- **transportadora** – Nome da transportadora  
- **status_de_entrega** – Situação do envio  
- **data_de_retirada** – Data em que a transportadora retirou o pedido  

---

## 2.13 USUÁRIOS
- **id_usuario (PK)** – Identificador  
- **nome** – Nome  
- **email** – Email  
- **senha_hash** – Senha criptografada  
- **id_tipo_usuario (FK)** – Tipo de usuário  
- **status** – ativo/inativo  
- **data_criacao** – Data de cadastro  
- **data_ultimo_login** – Último acesso  

---

## 2.14 TIPO_USUÁRIO
- **id_tipo_usuario (PK)** – Identificador  
- **nome_tipo** – Nome do tipo/permissão  
- **descricao** – Detalhes  

---

# 3. Relacionamentos e Cardinalidades

### CLIENTES **1:N** PEDIDOS  
Um cliente pode ter vários pedidos. Cada pedido pertence a somente um cliente.

### PEDIDOS **1:N** ITENS_PEDIDOS  
Um pedido pode conter vários itens.

### PRODUTOS **1:N** ITENS_PEDIDOS  
Um produto pode estar presente em vários pedidos.

### PRODUTOS **1:N** ESTOQUE_MOVIMENTAÇÕES  
Cada movimentação refere-se a um único produto.

### FORNECEDORES **1:N** COMPRAS  
Cada compra pertence a apenas um fornecedor.

### COMPRAS **1:N** ITENS_COMPRA  
Cada compra pode incluir vários itens.

### PRODUTOS **1:N** ITENS_COMPRA  
Produtos podem aparecer em várias compras.

### PEDIDOS **1:1** ENVIO_TRANSPORTADORA  
Cada pedido possui exatamente um envio vinculado.

### CLIENTES **1:N** CHAMADOS_SUPORTE  
Um cliente pode abrir vários chamados.

### TIPO_USUÁRIO **1:N** USUÁRIOS  
Tipos classificam usuários por permissão.

---

# 4. Justificativas dos Relacionamentos

1. **Pedidos dependem de Clientes** — pois só clientes podem realizar pedidos.  
2. **Itens de pedido ficam separados** — seguindo normalização (evita repetição de dados).  
3. **Movimentações de estoque são independentes** — fundamental para auditoria.  
4. **Compras vinculam fornecedores e produtos** — permitindo rastreamento de origem e custos.  
5. **Chamados dependem de Clientes** — suporte sempre nasce de um cliente.  
6. **Usuários possuem Tipos** — necessário para controle de acesso.  
7. **Envio vinculado apenas ao Pedido** — envio é único por pedido.  

---

# 5. Regras de Negócio

1.  Um pedido só pode ser concluído se possuir ao menos um item.  
2.  Estoque diminui quando um pedido é finalizado e aumenta quando uma compra é registrada.  
3.  Toda movimentação de estoque deve ser registrada com tipo, data e quantidade.  
4.  Clientes deve possuir pelo menos um meio de contato válido.  
5.  Transações financeiras exigem categoria e tipo (entrada/saída).  
6.  Notas fiscais só podem ser geradas para pedidos concluídos.  
7.  Um envio só pode ser criado para pedidos em status apropriado (ex: “Aguardando envio”).  
8.  Usuários só acessam o sistema se estiverem ativos.  
9.  O valor total da compra deve ser calculado automaticamente.  
10. Cada compra pode ter muitos produtos, mas somente um fornecedor responsável. 
11. O sistema deve permitir alteração de quantidade ou itens somente enquanto o pedido estiver em status “Aberto”.
12. Todo ajuste manual de estoque deve ser registrado com justificativa e usuário responsável.
13. Clientes cadastrados sem CPF ou CNPJ válido não podem realizar pedidos.
14. Cada usuário deve estar vinculado a um tipo de usuário (perfil/permissão).

---

