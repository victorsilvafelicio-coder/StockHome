#  Nível 3 – Diagrama de Componentes (StockHome ERP)

O diagrama de componentes detalha os **principais módulos internos da API Backend** do ERP **StockHome**, descrevendo **responsabilidades, fluxos de dados e integrações** entre serviços internos e externos.

```mermaid
graph TB


%% =========================
%% NÓS EXTERNOS
%% =========================
A[Web App - Interface do Usuário] ----->|Requisições REST/HTTPS| B[API Backend - Núcleo do Sistema]
B ---->|Consultas e persistência| C[(Banco de Dados)]
B ---->|Alertas e eventos| D[Serviço de Mensageria]
B ---->|Integrações externas| E[Sistemas Externos]

%% =========================
%% COMPONENTES INTERNOS DO BACKEND
%% =========================
subgraph BACKEND[API Backend Componentes]


B1[Autenticação e Acesso]
B2[Gestão de Clientes]
B3[Gestão de Vendas]
B4[Gestão de Estoque]
B5[Relatórios e Dashboards]
B6[Integração Externa]

end

%% =========================
%% FLUXOS ENTRE COMPONENTES
%% =========================

A ------>|Envia credenciais e dados| B1
B1 ----->|Usuário autenticado| B2
B2 ----->|Gera pedidos| B3
B3 ----->|Atualiza estoque| B4
B4 ------>|Retorna métricas| B5
B5 ----->|Mostra relatórios ao usuário| A
B6 ----->|Troca dados com externos| E
B3 --->|Envia alertas| D

%% =========================
%% ESTILOS
%% =========================
style A fill:#AED6F1,stroke:#2E86C1,stroke-width:2px
style B fill:#A9DFBF,stroke:#1D8348,stroke-width:2px
style C fill:#E8DAEF,stroke:#6C3483,stroke-width:2px
style D fill:#F5B7B1,stroke:#943126,stroke-width:2px
style E fill:#F9E79F,stroke:#B7950B,stroke-width:2px

style B1 fill:#D5F5E3,stroke:#229954
style B2 fill:#FCF3CF,stroke:#B7950B
style B3 fill:#FADBD8,stroke:#C0392B
style B4 fill:#D6EAF8,stroke:#2874A6
style B5 fill:#E8DAEF,stroke:#6C3483
style B6 fill:#ABEBC6,stroke:#1E8449

