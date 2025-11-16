# Nível 1 – Diagrama de Contexto (StockHome ERP)

O diagrama de contexto mostra como o **ERP StockHome** se relaciona com os atores externos e outros sistemas do ecossistema.  
Ele ilustra a interação entre os **usuários (empresa de eletrodomésticos, gerentes e equipe operacional)** e os **serviços integrados (E-commerce, Marketplaces e serviços em nuvem)**.

```mermaid
graph RL
  %% ======= CONEXÕES =======
  A[Gerente ou Diretor de Operações] --->|Consulta relatórios e dashboards| B[StockHome ERP]
  B ----->|Fornece insights e relatórios| A

  C[Equipe de Estoque] --->|Registra entradas, saídas e inventários| B
  B ---->|Atualiza posição de estoque em tempo real| C

  D[E-commerce e Marketplaces] --->|Sincroniza pedidos e produtos| B
  B ---->|Atualiza status de estoque e pedidos| D

  E[Fornecedores e Distribuidores] --->|Enviam notas de entrada e produtos| B
  B ---->|Solicita reposição de produtos| E

  F[Serviços em Nuvem - AWS ou Azure] ---->|Hospedagem e Banco de Dados| B

  G[Sistema Financeiro e Contábil] --->|Importa dados de vendas e custos| B
  B ---->|Exporta relatórios financeiros e fiscais| G

  H[Equipe de Suporte e Implantação] --->|Monitora clientes e realiza onboarding| B
  B ---->|Fornece dados operacionais e feedback| H

  %% ======= ESTILOS INDIVIDUAIS =======
  %% Sistema central (ERP)
  style B fill:#2E86DE,stroke:#1B4F72,stroke-width:3px,color:#FFFFFF,font-size:15px,font-weight:bold;

  %% Gerente / Diretor
  style A fill:#F8C471,stroke:#B9770E,stroke-width:2px,color:#000000,font-size:13px,font-weight:bold;

  %% Equipe de Estoque
  style C fill:#F5B7B1,stroke:#943126,stroke-width:2px,color:#000000,font-size:13px,font-weight:normal;

  %% E-commerce / Marketplaces
  style D fill:#A9DFBF,stroke:#1E8449,stroke-width:2px,color:#000000,font-size:13px,font-weight:normal;

  %% Fornecedores / Distribuidores
  style E fill:#AED6F1,stroke:#2471A3,stroke-width:2px,color:#000000,font-size:13px,font-weight:normal;

  %% Serviços em Nuvem
  style F fill:#D2B4DE,stroke:#6C3483,stroke-width:2px,color:#000000,font-size:13px,font-weight:normal;

  %% Sistema Financeiro
  style G fill:#F9E79F,stroke:#B7950B,stroke-width:2px,color:#000000,font-size:13px,font-weight:normal;

  %% Equipe de Suporte
  style H fill:#ABEBC6,stroke:#1D8348,stroke-width:2px,color:#000000,font-size:13px,font-weight:normal;


