import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import api from "../../services/api";

interface IProposition {
  id: number;
  uri: string;
  siglaTipo: string;
  codTipo: number;
  numero: number;
  ano: number;
  ementa: string;
}

const Propositions: React.FC = () => {
  const [propositions, setPropositions] = useState<IProposition[]>([]);

  useEffect(() => {
    async function loadData {
      const { data } = await api.get('propositions');

      const { dados } = data;

      setPropositions(dados as IProposition[]);
    }

    loadData()
  }, []);
  return <View>{
    propositions.map((proposition, index) => (
      <View key={`proposition-${index}`} style={{marginBottom: 20}}>
        <Text>{proposition.ano}</Text>
        <Text>{proposition.codTipo}</Text>
        <Text>{proposition.ementa}</Text>
        <Text>{proposition.id}</Text>
        <Text>{proposition.numero}</Text>
        <Text>{proposition.siglaTipo}</Text>
        <Text>{proposition.uri}</Text>
      </View>
    ))}</View>;
};

export default Propositions;
