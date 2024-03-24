import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be Loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.imagename}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //https://huoqiyvsksclfnetgiep.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg?t=2024-03-24T09%3A24%3A27.124Z
  let query = supabase.from("cabins ");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id)
    query = query.update([{ ...newCabin, image: imagePath }]).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was noot created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
