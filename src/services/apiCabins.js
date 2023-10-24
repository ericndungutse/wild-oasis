import supabase from './superbase';

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
