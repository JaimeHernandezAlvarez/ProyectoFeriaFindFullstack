import { mapVendedorApiToApp } from '../helpers/vendedor-mapper'; // Asegúrate de exportarlo en tu index de helpers
import type { RespuestaTodosVendedores } from '../interfaces/vendedores.interfaces';

// URL DEL MICROSERVICIO DE VENDEDORES
const BASE_URL = 'https://microvend.onrender.com/api/v1'; 

export const getVendedores = async(): Promise<RespuestaTodosVendedores> => {
  try {
    const response = await fetch(`${BASE_URL}/vendedores`);
    
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const dataApi = await response.json();
    
    // --- LÓGICA HATEOAS ---
    let listaRaw = [];

    // Asumimos que si en productos era "productoList", aquí será "vendedorList"
    if (dataApi._embedded && dataApi._embedded.vendedorList) {
        listaRaw = dataApi._embedded.vendedorList;
    } 
    else if (Array.isArray(dataApi)) {
        listaRaw = dataApi;
    }

    const vendedoresMapeados = listaRaw.map(mapVendedorApiToApp);

    return {
      ok: true,
      vendedores: vendedoresMapeados
    };

  } catch (error) {
    console.error("❌ Error obteniendo vendedores:", error);
    return {
      ok: false,
      vendedores: []
    };
  }
}