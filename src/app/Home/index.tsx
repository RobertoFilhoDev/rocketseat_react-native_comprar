import { StatusBar } from 'expo-status-bar';
import { Image, TouchableOpacity, Text, View, FlatList, Alert } from 'react-native';
import { Button } from '@/components/Button';
import { styles } from './styles';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/Item';
import { useEffect, useState } from 'react';
import { itemsStorage, ItemStorage } from '@/storage/ItemsStorage';

const FILTER_STATUS: FilterStatus[] = [
  FilterStatus.PENDING,
  FilterStatus.DONE,
]
//const ITEMS = [
  //{ id: "1", status: FilterStatus.DONE, description: "Comprar pão" },
  //{ id: "2", status: FilterStatus.PENDING, description: "Comprar leite" },
  //{ id: "3", status: FilterStatus.PENDING, description: "Comprar queijo" },
//]

export function Home() {

const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
const [description, setDescription] = useState('');
const [items, setItems] = useState<ItemStorage[]>([]);

async function handleAddItem(){
  if(!description.trim()){
    return Alert.alert("Adicionar", "Informe a descrição para adicionar.");
  }
  const newItem = {
    id: Math.random().toString(36).substring(2),
    description: description,
    status: FilterStatus.PENDING,
  }
  await itemsStorage.add(newItem);
  await itemsByStatus();

  Alert.alert("Adicionado", `Adicionado o item: ${description}`);
  setFilter(FilterStatus.PENDING);
  setDescription('');
}
async function itemsByStatus(){
  try {
    const response = await itemsStorage.getByStatus(filter);
    setItems(response);
    
  } catch (error) {
    console.log("Erro ao buscar itens: ", error);
    Alert.alert("Erro", "Não foi possível buscar os itens.");
  }
}
async function handleRemoveItem(id: string){
  try {
    await itemsStorage.remove(id);
    await itemsByStatus();
  } catch (error) {
    console.log("Erro ao remover item: ", error);
    Alert.alert("Remover", "Não foi possível remover o item.");
  }
}
function handleClearItems(){
  Alert.alert("Limpar", "Tem certeza que deseja limpar todos os itens?",[
    {text: "Não", style: "cancel"},
    {text:"Sim", onPress: () => onClearItems()}
  ]);
}
async function onClearItems(){
  try {
    await itemsStorage.clear();
    setItems([]);
  } catch (error) {
    console.log("Erro ao limpar itens: ", error);
    Alert.alert("Erro", "Não foi possível limpar os itens.");
  }
}
async function handleToogleStatus(id: string){
  try {
    await itemsStorage.toogleStatus(id);
    await itemsByStatus();
  } catch (error) {
    console.log("Erro ao alterar status do item: ", error);
    Alert.alert("Erro", "Não foi possível alterar o status do item.");
  }
}
useEffect(() => {
  itemsByStatus();
}, [filter])
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('@/assets/logo.png')} />
      <View style={styles.form}>
        <Input 
        placeholder="O que você precisa comprar?"
        onChangeText={setDescription}
        value={description}
        />
        <Button title="Adicionar" onPress={handleAddItem} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter 
            key={status} 
            status={status} 
            isActive={filter === status}
            onPress={() => setFilter(status)} 
            />
          ))}
          <TouchableOpacity style={styles.clearButton} onPress={handleClearItems}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => handleToogleStatus(item.id)}
              onRemove={() => handleRemoveItem(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Nenhum item encontrado</Text>
          )}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}
