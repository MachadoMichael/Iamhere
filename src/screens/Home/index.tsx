import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import { useState } from "react";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";

export const Home = () => {
  const [newParticipant, setNewParticipant] = useState("");
  const [participants, setParticipants] = useState(["Rodrigo", "Vini"]);

  const handleParticipantAdd = () => {
    if (participants.includes(newParticipant)) {
      return Alert.alert(
        "Participante existe",
        "Já existe um participante na lista com esse nome."
      );
    } else {
      setParticipants((prevState) => [...prevState, newParticipant]);
      setNewParticipant("");
    }
  };

  const handleParticipantRemove = (name: string) => {
    Alert.alert("Remover", `Remover o participante ${name}`, [
      {
        text: "Sim",
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name)
          ),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 14 de outubro de 2022</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setNewParticipant}
          value={newParticipant}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença.
          </Text>
        )}
      />
    </SafeAreaView>
  );
};
