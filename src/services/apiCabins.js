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
    let message = error.message;

    if (error.code === '23503')
      message =
        'Cannot delete cabin. It is carrently booked by one of your guests.';
    throw new Error(message);
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${
    newCabin.image.name
  }`.replaceAll('/', '');

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create/Edit cabin
  let query = supabase.from('cabins');

  // 1 Create a cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // 2. Edit
  if (id) {
    console.log('New Image Path');
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select();
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  //  2. Upload Image

  let uploadQuery = supabase.storage.from('cabin-images');

  if (!hasImagePath) {
    uploadQuery = uploadQuery.upload(imageName, newCabin.image);
  }

  const { error: storageError } = await uploadQuery;

  // 3. Delete Cabin there was an error uploading the image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data?.id);
    throw new Error('Cabin image could not be uploaded');
  }

  return data;
}
