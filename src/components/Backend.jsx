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
export const insertUser = async (user) => {
  try {
    const response = await axios.post(`${api}/users`,
      { name:user.name, email: user.email, password: user.password },
      {
        headers: headers
      }
    );

    console.log("Inserted:", response.data);
    return response.data
  } catch (error) {
    console.error("Insert failed:", error.response?.data || error.message);
    return null
  }
};

// GET USER
export const getUsers = async () => {
  try {
    const response = await axios.get(`${api}/users`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error("Fetch failed:", error.response?.data || error.message);
    return [];
  }
};

// GET USER BY EMAIL AND PASSWORD

export const getUserByEmailPassword = async (email, password) => {
  try {
    const { data } = await axios.get(`${api}/users`, {
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

//GET USER BY ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(
      `${api}/users?id=eq.${id}`,
      {
        headers: headers,
      }
    );
    return response.data?.[0] || null;
  } catch (error) {
    console.error("Fetch user by ID failed:", error.response?.data || error.message);
    return null;
  }
};


//UPDATE USER
export const updateUser = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `${api}/users?id=eq.${id}`,
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
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${api}/users?id=eq.${id}`, {
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
