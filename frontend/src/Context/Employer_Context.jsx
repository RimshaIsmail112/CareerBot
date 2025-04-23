const { createContext, useState } = require("react");

const EmployerContext = createContext();

const EmployerProvider = ({ children }) => {
  const [employerDataState, setEmployerDataState] = useState(null);
  const setEmployerData = (data) => setEmployerDataState(data);
  return (
    <EmployerContext.Provider value={{ employerDataState, setEmployerData }}>
      {children}
    </EmployerContext.Provider>
  );
};

export { EmployerContext, EmployerProvider };