const primaryRoutesIndex = {
  sap: 0,
  adm: 1,
  movimentacao: 2,
  cadastro: 3,
};

const primaryRoutes = [
  {
    tab: "sap",
    path: "sap",
    text: "SAP",
    subRoutes: [
      {
        tab: "itens-cliente",
        path: "sap/itens-cliente",
        text: "Itens por Cliente",
      },
      { tab: "ordem-venda", path: "sap/ordem-venda", text: "Ordens de Venda" },
      {
        tab: "transferencia-centro",
        path: "sap/transferencia-centro",
        text: "Transferência de Centro",
      },
      { tab: "estornos", path: "sap/estornos", text: "Estornos" },
    ],
  },
  {
    tab: "adm",
    path: "adm",
    text: "Administração",
    subRoutes: [
      {
        tab: "leitura-medicoes",
        path: "adm/leitura-medicoes",
        text: "Leitura de Medições",
      },
      {
        tab: "cadastro-permissoes",
        path: "adm/cadastro-permissoes",
        text: "Cadastro de Permissões",
      },
      {
        tab: "tela-evidencias",
        path: "adm/tela-evidencias",
        text: "Tela de Evidências",
      },
      {
        tab: "configuracoes-sistema",
        path: "adm/configuracoes-sistema",
        text: "Configurações do Sistema",
      },
      {
        tab: "componentes",
        path: "adm/componentes",
        text: "Componentes",
      },
      { tab: "relatorios", path: "adm/relatorios", text: "Relatórios" },
    ],
  },
  {
    tab: "movimentacao",
    path: "movimentacao",
    text: "Movimentação",
    subRoutes: [
      { tab: "medicao", path: "movimentacao/medicao", text: "Medição" },
      {
        tab: "fundo-escala-diario",
        path: "movimentacao/fundo-escala-diario",
        text: "Fundo de Escala Diário",
      },
    ],
  },
  {
    tab: "cadastro",
    path: "cadastro",
    text: "Cadastro",
    subRoutes: [
      { tab: "formula", path: "cadastro/formula", text: "Fórmula" },
      { tab: "area", path: "cadastro/area", text: "Área" },
      { tab: "planta", path: "cadastro/planta", text: "Planta" },
      {
        tab: "estacao-medicao",
        path: "cadastro/estacao-medicao",
        text: "Estações de Medição",
      },
      { tab: "medidor", path: "cadastro/medidor", text: "Medidor" },
      { tab: "cliente", path: "cadastro/cliente", text: "Cliente" },
      { tab: "produto", path: "cadastro/produto", text: "Produto" },
      {
        tab: "produtos-cliente",
        path: "cadastro/produtos-cliente",
        text: "Produtos por Cliente",
      },
      {
        tab: "periodo-faturamento",
        path: "cadastro/periodo-faturamento",
        text: "Período de Faturamento",
      },
      {
        tab: "unidade-medida",
        path: "cadastro/unidade-medida",
        text: "Unidades de Medida",
      },
    ],
  },
];

export { primaryRoutes, primaryRoutesIndex };
