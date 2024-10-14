import React, { useEffect, useState } from 'react';
import { getClientes } from '../services/clientesService';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data); // Asegúrate de que 'data' sea un array
      } catch (err) {
        setError(err); // Manejo del error
      }
    };

    fetchClientes();
  }, []);

  // Manejo de errores
  if (error) {
    return <div>Error: {error.message}</div>; // Accediendo a 'message' del objeto de error
  }

  return (
    <div>
      {clientes.length > 0 ? (
        clientes.map((cliente) => (
          <div key={cliente.id}>{cliente.name}</div> // Accede a las propiedades correctas
        ))
      ) : (
        <p>No hay clientes disponibles</p>
      )}
    </div>
  );
};

export default ClientesList;
