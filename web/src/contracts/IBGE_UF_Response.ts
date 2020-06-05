interface IBGE_UF_Response {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  }
}

export default IBGE_UF_Response;
