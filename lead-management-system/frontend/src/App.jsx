import { useEffect, useState } from "react";
import { getLeads } from "./services/leadApi";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeads = async () => {
    try {
      setError("");

      const data = await getLeads();

      setLeads(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  if (loading) {
    return <h1>Loading leads...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <Dashboard leads={leads} />

      <Leads
        leads={leads}
        onLeadAdded={loadLeads}
        onLeadUpdated={loadLeads}
        onLeadDeleted={loadLeads}
      />
    </>
  );
}

export default App;