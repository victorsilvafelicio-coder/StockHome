#  Nível 3 – Diagrama de Componentes (StockHome ERP)

O diagrama de componentes detalha os **principais módulos internos da API Backend** do ERP **StockHome**, descrevendo **responsabilidades, fluxos de dados e integrações** entre serviços internos e externos.

```mermaid
graph TB

  %% ======= CONTAINERS PRINCIPAIS =======
  A[Web App – Interface do Usuário] --->|Requisições REST/HTTPS| B[API Backend – Núcleo do Sistema]
  B --->|Consultas e persistência de dados| C[(Banco de Dados – PostgreSQL)]
  B --->|Notificações e eventos| D[Serviço de Mensageria – Help Desk / Alertas]
  B --->|Integrações externas| E[Sistemas Externos – E-commerce, Marketplaces]

  %% ======= COMPONENTES INTERNOS DO BACKEND =======
    subgraph BACKEND[API Backend – Componentes Internos]
    B1["Autenticação e Controle de Acesso
    (login, tokens JWT, permissões)"]
    B2["Gestão de Clientes e Relacionamentos (CRM interno)"]
    B3["Gestão de Vendas e Orçamentos
    (criação, aprovação e emissão de pedidos)"]
    B4["Gestão de Estoque e Produção
    (controle de materiais, movimentação e status)"]
    B5["Relatórios e Dashboards
    (indicadores e visualizações operacionais)"]
    B6["Integração Externa
    (APIs com E-commerce, ERP e serviços de pagamento)"]
  end

  %% ======= FLUXOS ENTRE COMPONENTES =======
  A --->|Envia credenciais e solicitações| B1
  B1 ---->|Valida e autoriza| B2
  B2 --->|Gera pedidos e registros| B3
  B3 --->|Atualiza quantidades| B4
  B4 ---->|Retorna métricas e status| B5
  B5 -->|Exibe relatórios para o usuário| A
  B6 --------->|Troca dados com| E
  B3 --------->|Envia alertas e logs| D

  %% ======= ESTILOS INDIVIDUAIS =======

  %% Containers externos
  style A fill:#AED6F1,stroke:#2E86C1,stroke-width:3px,color:#000,font-size:13px,font-weight:bold;
  style B fill:#A9DFBF,stroke:#1D8348,stroke-width:3px,color:#000,font-size:14px,font-weight:bold;
  style C fill:#E8DAEF,stroke:#6C3483,stroke-width:3px,color:#000,font-size:13px,font-weight:bold;
  style D fill:#F5B7B1,stroke:#943126,stroke-width:3px,color:#000,font-size:13px,font-weight:bold;
  style E fill:#ABEBC6,stroke:#1E8449,stroke-width:3px,color:#000,font-size:13px,font-weight:bold;

  %% Componentes internos
  style B1 fill:#D5F5E3,stroke:#229954,stroke-width:2px,color:#000,font-size:12px;
  style B2 fill:#FCF3CF,stroke:#B7950B,stroke-width:2px,color:#000,font-size:12px;
  style B3 fill:#FADBD8,stroke:#C0392B,stroke-width:2px,color:#000,font-size:12px;
  style B4 fill:#D6EAF8,stroke:#2874A6,stroke-width:2px,color:#000,font-size:12px;
  style B5 fill:#E8DAEF,stroke:#6C3483,stroke-width:2px,color:#000,font-size:12px;
  style B6 fill:#ABEBC6,stroke:#1E8449,stroke-width:2px,color:#000,font-size:12px;
