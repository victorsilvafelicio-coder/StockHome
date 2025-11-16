#  Nível 2 – Diagrama de Contêineres (StockHome ERP)


O diagrama de contêineres mostra as **partes de execução do sistema** — os módulos principais, suas funções e interações.  
Cada contêiner representa uma parte lógica do StockHome ERP.


```mermaid
graph TB
  %% ======= NÓS =======
  A[Usuários do Sistema<br>Gerentes, Equipe de Estoque, Suporte] --->|Acessam via navegador| B[Web App – Interface do Usuário]
  B --->|Requisições HTTP/JSON| C[API Backend – Serviços Principais]
  C --->|Consultas e atualizações| D[(Banco de Dados – PostgreSQL/MySQL)]
  C --->|Envio e recebimento de mensagens| E[Serviço de Mensageria – Notificações/Help Desk]
  C --->|Integrações externas| F[Sistemas Externos – E-commerce / Marketplaces / ERP Parceiros]


  %% ======= DETALHES DE MÓDULOS =======
  subgraph WEB[ Web App]
    B1[Vendas e Orçamentos]
    B2[Estoque e Inventário]
    B3[Relatórios e Dashboards]
  end


  subgraph API[ API Backend]
    C1[Gestão de Clientes]
    C2[Gestão de Projetos e Tarefas]
    C3[Controle de Produção]
  end


  subgraph DB[ Banco de Dados]
    D1[Recursos Humanos]
    D2[Logística e Entregas]
    D3[Financeiro]
  end


  %% CONEXÕES INTERNAS ENTRE SUBGRÁFICOS
  B -->|Consome endpoints| C
  C -->|Lê e grava dados| D
  C -->|Publica eventos| E
  E -->|Notifica suporte| A


  %% ======= ESTILOS INDIVIDUAIS =======
  %% Usuários
  style A fill:#F9E79F,stroke:#B7950B,stroke-width:2px,color:#000,font-size:13px,font-weight:bold;
 
  %% Web App (container principal)
  style B fill:#AED6F1,stroke:#2E86C1,stroke-width:3px,color:#000,font-size:14px,font-weight:bold;
  style B1 fill:#D6EAF8,stroke:#1F618D,stroke-width:2px,color:#000,font-size:12px;
  style B2 fill:#D6EAF8,stroke:#1F618D,stroke-width:2px,color:#000,font-size:12px;
  style B3 fill:#D6EAF8,stroke:#1F618D,stroke-width:2px,color:#000,font-size:12px;


  %% API Backend
  style C fill:#A9DFBF,stroke:#1D8348,stroke-width:3px,color:#000,font-size:14px,font-weight:bold;
  style C1 fill:#D5F5E3,stroke:#117A65,stroke-width:2px,color:#000,font-size:12px;
  style C2 fill:#D5F5E3,stroke:#117A65,stroke-width:2px,color:#000,font-size:12px;
  style C3 fill:#D5F5E3,stroke:#117A65,stroke-width:2px,color:#000,font-size:12px;


  %% Banco de Dados
  style D fill:#E8DAEF,stroke:#6C3483,stroke-width:3px,color:#000,font-size:14px,font-weight:bold;
  style D1 fill:#EBDEF0,stroke:#633974,stroke-width:2px,color:#000,font-size:12px;
  style D2 fill:#EBDEF0,stroke:#633974,stroke-width:2px,color:#000,font-size:12px;
  style D3 fill:#EBDEF0,stroke:#633974,stroke-width:2px,color:#000,font-size:12px;


  %% Serviço de Mensageria
  style E fill:#F5B7B1,stroke:#943126,stroke-width:3px,color:#000,font-size:13px,font-weight:bold;


  %% Integrações externas
  style F fill:#ABEBC6,stroke:#1E8449,stroke-width:3px,color:#000,font-size:13px,font-weight:bold;







