import supabase from './superbase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error('Cabins could loaded');

    throw new Error('Cabins could not be loaded');
  }

  return data;
}
