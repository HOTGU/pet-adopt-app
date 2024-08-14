import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import PetInfo from "@/components/petDetails/PetInfo";
import PetSubInfo from "@/components/petDetails/PetSubInfo";
import PetAbout from "@/components/petDetails/PetAbout";
import OwnerInfo from "@/components/petDetails/OwnerInfo";
import { Pet } from "@/types";
import Colors from "@/constants/Colors";

const PetDetail = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const [pet, setPet] = useState<Pet | undefined>(undefined);

  useEffect(() => {
    getPet();
  }, []);

  const getPet = async () => {
    const docRef = doc(db, "Pets", id);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    const petData = { id: snapshot.id, ...data } as Pet;

    setPet(petData);
  };

  if (!pet) return null;

  return (
    <View>
      <ScrollView>
        <PetInfo pet={pet} />
        <PetSubInfo pet={pet} />
        <PetAbout pet={pet} />
        <OwnerInfo user={pet.user} />
        <View style={{ height: 80 }} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "ibm-medium",
              fontSize: 20,
            }}
          >
            입양 신청
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetDetail;

const styles = StyleSheet.create({
  button: { padding: 15, backgroundColor: Colors.PRIMARY },
  buttonContainer: { position: "absolute", bottom: 0, width: "100%" },
});
