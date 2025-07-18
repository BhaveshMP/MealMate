import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const BUCKET = "meal-mate-images"; // Your bucket name

export const supabase = createClient(supabaseUrl, supabaseKey);


export const uploadImage = async (file, path = "") => {
  if (!file) return { success: false, error: "No file provided" };

  const filePath = `${path}/${file.name}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) return { success: false, error };

  const { data: publicData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filePath);

  return {
    success: true,
    url: publicData.publicUrl,
    data,
  };
};


export const getImageUrl = (path, fileName) => {
  const filePath = `${fileName}`;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
};


export const deleteImage = async (filePath) => {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .remove([filePath]);

  if (error) return { success: false, error };
  return { success: true, data };
};

export const listImages = async (folder = "") => {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(folder, { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } });

  if (error) return { success: false, error };
  return { success: true, data };
};
