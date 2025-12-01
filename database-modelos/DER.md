#  Descrição Textual do Diagrama Entidade-Relacionamento (DER)

Este documento apresenta uma explicação detalhada e textual do Diagrama Entidade-Relacionamento (DER) do sistema, descrevendo:

- As entidades presentes  
- Os relacionamentos entre elas  
- A cardinalidade de cada relação  
- O propósito de cada conexão dentro do modelo  

O objetivo é facilitar o entendimento lógico do modelo de dados e sua interpretação.



<img width="1531" height="1321" alt="DER png" src="https://github.com/user-attachments/assets/388d4a94-3565-4ae9-ab66-c2373e1efa29" />


---

#  1. Visão Geral do DER

O modelo representa um sistema integrado que abrange:

- Gestão de clientes e pedidos  
- Gestão de produtos e estoque  
- Processo de compras e fornecedores  
- Suporte ao cliente  
- Emissão de notas fiscais  
- Controle de transações financeiras  
- Gestão de usuários e tipos de usuários  
- Logística via transportadora  

As entidades são conectadas por relacionamentos 1:N, N:1 e 1:1, representando as estruturas necessárias para rastreabilidade completa das operações.

---

#  2. Entidades e seus Relacionamentos

A seguir está uma descrição textual de cada entidade e suas relações.

---

## 2.1 **CLIENTES**
Clientes representam pessoas que realizam pedidos ou abrem chamados de suporte.

###  Relacionamentos:
- **CLIENTES 1:N PEDIDOS**  
  Um cliente pode realizar vários pedidos.

- **CLIENTES 1:N CHAMADOS_SUPORTE**  
  Um cliente pode abrir vários chamados de suporte.

---

## 2.2 **PEDIDOS**
Pedidos representam solicitações de compra feitas pelos clientes.

###  Relacionamentos:
- **PEDIDOS N:1 CLIENTES**  
  Cada pedido pertence a um único cliente.

- **PEDIDOS 1:N ITENS_PEDIDOS**  
  Um pedido contém vários itens.

- **PEDIDOS 1:1 ENVIO_TRANSPORTADORA**  
  Cada pedido é vinculado a um único envio.

- **PEDIDOS 1:N NOTA_FISCAL (conceito lógico, apesar de graficamente não estar explícito)**  
  Notas fiscais são geradas a partir de pedidos.

---

## 2.3 **ITENS_PEDIDOS**
Itens associados a um pedido, contendo a quantidade e preço no momento.

###  Relacionamentos:
- **ITENS_PEDIDOS N:1 PEDIDOS**  
  Cada item pertence a um pedido específico.

- **ITENS_PEDIDOS N:1 PRODUTOS**  
  Cada item está vinculado a um produto.

---

## 2.4 **PRODUTOS**
Produtos comercializados no sistema.

###  Relacionamentos:
- **PRODUTOS 1:N ITENS_PEDIDOS**  
  Um produto pode aparecer em vários pedidos.

- **PRODUTOS 1:N ITENS_COMPRA**  
  Um produto pode ser adquirido em várias compras.

- **PRODUTOS 1:N ESTOQUE_MOVIMENTAÇÕES**  
  Entradas e saídas de estoque são registradas por produto.

---

## 2.5 **ESTOQUE_MOVIMENTAÇÕES**
Movimenta o estoque dos produtos, registrando entradas e saídas.

###  Relacionamentos:
- **ESTOQUE_MOVIMENTAÇÕES N:1 PRODUTOS**

---

## 2.6 **COMPRAS**
Compras feitas pela empresa para aquisição de produtos.

###  Relacionamentos:
- **COMPRAS N:1 FORNECEDORES**  
  Cada compra é feita com um fornecedor.

- **COMPRAS 1:N ITENS_COMPRA**  
  Representam os produtos adquiridos em cada compra.

---

## 2.7 **ITENS_COMPRA**
Itens adquiridos em uma compra, incluindo custos unitários e quantidades.

###  Relacionamentos:
- **ITENS_COMPRA N:1 COMPRAS**

- **ITENS_COMPRA N:1 PRODUTOS**

---

## 2.8 **FORNECEDORES**
Representam empresas que fornecem produtos à organização.

###  Relacionamentos:
- **FORNECEDORES 1:N COMPRAS**

---

## 2.9 **NOTA_FISCAL**
Registra informações fiscais referentes a transações financeiras ou pedidos.

###  Relacionamentos:
- **NOTA_FISCAL N:1 TRANSAÇÕES_FINANCEIRAS**  
  Cada nota fiscal corresponde a uma transação financeira.

---

## 2.10 **TRANSAÇÕES_FINANCEIRAS**
Registra entradas e saídas financeiras da empresa.

###  Relacionamentos:
- **TRANSAÇÕES_FINANCEIRAS N:1 CATEGORIAS_FINANCEIRAS**  
  Cada transação pertence a uma categoria financeira.

- **TRANSAÇÕES_FINANCEIRAS 1:1 NOTA_FISCAL**  
  Relação direta com notas fiscais, garantindo integridade dos dados fiscais.

---

## 2.11 **CATEGORIAS_FINANCEIRAS**
Define categorias (ex.: receita, despesa, investimento).

###  Relacionamentos:
- **CATEGORIAS_FINANCEIRAS 1:N TRANSAÇÕES_FINANCEIRAS**

---

## 2.12 **CHAMADOS_SUPORTE**
Representam solicitações de suporte feitas pelos clientes.

###  Relacionamentos:
- **CHAMADOS_SUPORTE N:1 CLIENTES**

---

## 2.13 **ENVIO_TRANSPORTADORA**
Representa o processo logístico de envio do pedido.

###  Relacionamentos:
- **ENVIO_TRANSPORTADORA N:1 PEDIDOS**

---

## 2.14 **USUÁRIOS**
Pessoas que acessam o sistema interno.

###  Relacionamentos:
- **USUÁRIOS N:1 TIPO_USUARIO**

---

## 2.15 **TIPO_USUÁRIO**
Classifica usuários por permissões e papéis no sistema.

###  Relacionamentos:
- **TIPO_USUÁRIO 1:N USUÁRIOS**

---

#  3. Cardinalidades Resumidas

| Relacionamento | Cardinalidade |
|----------------|---------------|
| CLIENTES → PEDIDOS | 1:N |
| CLIENTES → CHAMADOS_SUPORTE | 1:N |
| PEDIDOS → ITENS_PEDIDOS | 1:N |
| PEDIDOS → ENVIO_TRANSPORTADORA | 1:1 |
| PRODUTOS → ITENS_PEDIDOS | 1:N |
| PRODUTOS → ITENS_COMPRA | 1:N |
| PRODUTOS → ESTOQUE_MOVIMENTAÇÕES | 1:N |
| COMPRAS → ITENS_COMPRA | 1:N |
| FORNECEDORES → COMPRAS | 1:N |
| TRANSAÇÕES_FINANCEIRAS → NOTA_FISCAL | 1:1 |
| CATEGORIAS_FINANCEIRAS → TRANSAÇÕES_FINANCEIRAS | 1:N |
| USUÁRIOS → TIPO_USUÁRIO | N:1 |

---

#  4. Considerações Finais

O DER apresentado:

- Organiza o sistema de maneira modular  
- Reduz redundâncias  
- Facilita relatórios e auditorias  
- Possibilita rastreamento completo de operações, desde compras até vendas  
- Implementa boas práticas de normalização  

Este documento serve como apoio para desenvolvedores, analistas e arquitetos compreenderem o modelo lógico do banco de dados.

---

