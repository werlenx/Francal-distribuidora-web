import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'
console.log("API_URL", API_URL)

export interface Vaga{
    id:number
    titulo:string
    descricao:string
    salario?:number | null
    localizacao:string
    status:string
    dataPublicacao:Date
    tipoContrato:string
}


export async function getVagas():Promise<Vaga[]>{
    const url =`${API_URL}/vagas/abertas`
    try{
        const response = await axios.get<Vaga[]>(url, {timeout:5000});
        return response.data;
    }catch(error: any){
        console.error("erro ao buscar vagas", error?.message ?? error)
        throw new Error("Não foi possível carregar  as vagas.")
    }
}

