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

function handleAddItem(){
  if(!description.trim()){
    return Alert.alert("Adicionar", "Informe a descrição para adicionar.");
  }
  const newItem = {
    id: Math.random().toString(36).substring(2),
    description: description,
    status: FilterStatus.PENDING,
  }
  setItems([newItem, ...items]);
}
async function getItems(){
  try {
    const response = await itemsStorage.get();
    setItems(response);
    
  } catch (error) {
    console.log("Erro ao buscar itens: ", error);
    Alert.alert("Erro", "Não foi possível buscar os itens.");
  }
}
useEffect(() => {}, [])
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('@/assets/logo.png')} />
      <View style={styles.form}>
        <Input 
        placeholder="O que você precisa comprar?"
        onChangeText={setDescription}
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
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => console.log('trocar status')}
              onRemove={() => console.log('remover item')}
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
