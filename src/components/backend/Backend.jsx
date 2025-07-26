import axios from 'axios';

const api = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_KEY;

const headers = {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation', // returns inserted row
        }


// INSERT USER
export const insertData = async (tableName, data) => {
  try {
    const response = await axios.post(`${api}/rest/v1/${tableName}`, data, {
      headers: headers,
    });

    console.log(`Inserted into ${tableName}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Insert into ${tableName} failed:`, error.response?.data || error.message);
    return null;
  }
};


// GET USER
export const getData = async (tableName) => {
  try {
    const response = await axios.get(`${api}/rest/v1/${tableName}`, {
      headers: headers,
    });
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error("Fetch failed:", error.response?.data || error.message);
    return [];
  }
};



//GET USER BY ID
export const getDataById = async (tableName, id) => {
  try {
    const response = await axios.get(
      `${api}/rest/v1/${tableName}?id=eq.${id}`,
      {
        headers: headers,
      }
    );
    return response.data?.[0] || null;
  } catch (error) {
    console.error(`Fetch ${tableName} by ID failed:`, error.response?.data || error.message);
    return null;
  }
};


//UPDATE USER
export const updateData = async (tableName, id, updatedData) => {
  try {
    const response = await axios.patch(
      `${api}/rest/v1/${tableName}?id=eq.${id}`,
      updatedData,
      {
        headers: {
          ...headers,
          Prefer: 'return=representation',
        },
      }
    );
    console.log("Updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
    return null;
  }
};


//DELETE USER
export const deleteData = async (tableName, id) => {
  try {
    const response = await axios.delete(`${api}/rest/v1/${tableName}?id=eq.${id}`, {
      headers: {
        ...headers,
        Prefer: 'return=representation',
      },
    });
    console.log("Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Delete failed:", error.response?.data || error.message);
    return null;
  }
};


// GET USER BY EMAIL AND PASSWORD

export const getUserByEmailPassword = async (email, password) => {
  try {
    const { data } = await axios.get(`${api}/rest/v1/users`, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      params: {
        email: `eq.${email}`,
        password: `eq.${password}`,
        select: "*",
      },
    });
    return data?.[0] || null; // return the user object or null
  } catch (error) {
    console.error("Fetch failed:", error.response?.data || error.message);
    return null;
  }
};