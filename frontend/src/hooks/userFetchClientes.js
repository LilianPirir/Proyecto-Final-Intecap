const useFetchClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchClientes = async () => {
        try {
          const response = await api.get('/clientes');
          setClientes(response.data);
        } catch (err) {
          setError(err); // Guarda el error completo
        } finally {
          setLoading(false);
        }
      };
  
      fetchClientes();
    }, []);
  
    return { clientes, loading, error: error?.message }; // Accede a error.message
  };
  