import supabase, { supabaseUrl } from './superbase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error('Cabins could loaded');

    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${
    newCabin.image.name
  }`.replaceAll('/', '');

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1 Create a cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  //  2. Upload Image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete Cabin there was an error uploading the image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error('Cabin image could not be uploaded');
  }

  return data;
}
