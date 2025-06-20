export const USER_LOGIN = "pett1997";
export const USER_PWD = "123456789A";

//site para "hospedar JSON https://my-json-server.typicode.com

const DB_JSON_ONLINE ="https://my-json-server.typicode.com/Pett97/OwlCare-AnimalCare/"; 

const DB_TYPES_OF_SERVICE = DB_JSON_ONLINE+"types_of_service";

export const TYPE_OF_SERVICE = async () => {
  try {
    const response = await fetch(`${DB_TYPES_OF_SERVICE}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar tipos de serviço:", error);
    return null;
  }
};

const DB_STATUS_OF_ORDERS = DB_JSON_ONLINE+"status_of_orders";

export const STATUS_OF_ODERS = async () => {
  try {
    const response = await fetch(`${DB_STATUS_OF_ORDERS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar status de serviço:", error);
    return null;
  }
};
