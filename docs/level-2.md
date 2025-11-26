#  Nível 2 – Diagrama de Contêineres (StockHome ERP)


Este diagrama mostra como o sistema é dividido em contêineres executáveis, como eles se comunicam e onde cada módulo do ERP atua.
Cada contêiner representa uma macroestrutura técnica do sistema: Web App, API Backend, Banco de Dados, Serviços Externos e Mensageria.

- O Web App permite aos usuários acessar módulos como Vendas, Estoque, CRM e Financeiro.
- A API Backend concentra toda a lógica de negócio (rotas, validações, integrações, permissões).
- O Banco de Dados guarda todos os módulos: vendas, estoque, clientes, financeiro, compras etc.
- O Serviço de Mensageria é responsável por alertas, notificações e tickets de suporte.
- Os Sistemas Externos incluem E-commerce, Marketplaces e gateways fiscais.


```mermaid
graph TB

%% ================================
%% ATORES EXTERNOS
%% ================================
A[Usuários do Sistema<br/>Vendas, Estoque, Financeiro, Suporte] -->|Acessam| B[Web App – Interface do ERP]

%% ================================
%% CONTÊINERES PRINCIPAIS
%% ================================
B -->|Chamadas HTTP/JSON| C[API Backend – Serviços do ERP]
C -->|Consultas e Escritas| D[(Banco de Dados – PostgreSQL)]
C -->|Eventos e Alertas| E[Serviço de Mensageria – Notificações]
C -->|Integrações| F[Sistemas Externos<br/>E-commerce, Marketplaces, Financeiro]

%% ================================
%% SUBCONTAINERS (APENAS NOMES DOS MÓDULOS)
%% ================================
subgraph WEB[Web App]
    W1[Vendas e Orçamentos]
    W2[Estoque e Inventário]
    W3[Clientes CRM]
    W4[Financeiro]
    W5[Compras]
    W6[Relatórios e BI]
end

subgraph API[API Backend]
    A1[Rotas de Vendas]
    A2[Rotas de Estoque]
    A3[Rotas de Clientes]
    A4[Rotas Financeiras]
    A5[Rotas de Compras]
    A6[Rotas de Relatórios]
end

subgraph DB[Banco de Dados]
    D1[Schema Vendas]
    D2[Schema Estoque]
    D3[Schema CRM]
    D4[Schema Financeiro]
    D5[Schema Compras]
    D6[Schema BI]
end

%% ================================
%% ESTILOS (Opcional)
%% ================================
style B fill:#AED6F1,stroke:#2E86C1,stroke-width:3px
style C fill:#A9DFBF,stroke:#1D8348,stroke-width:3px
style D fill:#E8DAEF,stroke:#6C3483,stroke-width:3px
style E fill:#F5B7B1,stroke:#943126,stroke-width:3px
style F fill:#F9E79F,stroke:#B7950B,stroke-width:3px
