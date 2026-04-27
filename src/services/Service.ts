import axios from "axios";

const BASE_URL = "https://farmacia-nest-t0o5.onrender.com";

export const buscarTodosProdutos = async (setDados: Function)=>{
    const resposta = await axios.get(`${BASE_URL}/produtos`);
    setDados(resposta.data);
}
export const buscarProdutoPorId = async (id: NumberConstructor, setDados:Function)=>{
    const resposta = await axios.get(`${BASE_URL}/produtos/${id}`);
    setDados(resposta.data);
}

export const buscarProdutoPorNome= async (nome: string, setDados:Function)=>{
    const resposta = await axios.get(`${BASE_URL}/produtos/nome/${nome}`);
        setDados(resposta.data)
}

export const cadastrarProduto = async (body: Object, setDados: Function)=>{
    const resposta= await axios.post(`${BASE_URL}/produtos`,body)
    setDados(resposta.data);
}

export const atualizarProduto = async (body: Object, setDados: Function)=>{
    const resposta = await axios.put(`${BASE_URL}/produtos`,body);
    setDados(resposta.data);
}

export const deletarProduto = async (id:number)=>{
    await axios.delete(`${BASE_URL}/produtos/${id}`);
}

export const buscarTodasCategorias = async(setDados: Function)=>{
    const resposta = await axios.get(`${BASE_URL}/categorias`);
    setDados(resposta.data)
}

export const buscarCategoriaPorId = async(id: number, setDados:Function)=>{
    const resposta= await axios.get(`${BASE_URL}/categorias/${id}`);
    setDados(resposta.data);
}

export const cadastrarCategoria = async(body: Object, setDados: Function)=>{
    const resposta = await axios.post(`${BASE_URL}/categorias`,body)
    setDados(resposta.data)
}

export const atualizarCategoria = async(body: Object, setDados: Function)=>{
    const resposta = await axios.put(`${BASE_URL}/categorias`,body)
    setDados(resposta.data);
}

export const deletarCategoria= async (id: number)=>{
    await axios.delete(`${BASE_URL}/categorias/${id}`);
}

