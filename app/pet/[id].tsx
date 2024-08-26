import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

import { db } from "@/config/firebaseConfig";
import PetInfo from "@/components/petDetails/PetInfo";
import PetSubInfo from "@/components/petDetails/PetSubInfo";
import PetAbout from "@/components/petDetails/PetAbout";
import OwnerInfo from "@/components/petDetails/OwnerInfo";
import { Pet } from "@/types";
import Colors from "@/constants/Colors";

const PetDetail = () => {
  const { user } = useUser();
  const router = useRouter();
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

  const initateChat = async () => {
    const currentUserEmail = user?.primaryEmailAddress?.emailAddress;
    const currentUserName = user?.fullName;
    const currentUserImagerUrl = user?.imageUrl;

    const creatorEmail = pet?.user.email;
    const creatorName = pet?.user?.name;
    const creatorImageUrl = pet?.user?.imageUrl;

    const docId1 = `${currentUserEmail}_${creatorEmail}`;
    const docId2 = `${creatorEmail}_${currentUserEmail}`;

    const docsRef = collection(db, "Chat");
    const q = query(docsRef, where(documentId(), "in", [docId1, docId2]));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
      const docRef = doc(db, "Chat", docId1);
      await setDoc(docRef, {
        users: [
          {
            email: currentUserEmail,
            name: currentUserName,
            imageUrl: currentUserImagerUrl,
          },
          { email: creatorEmail, name: creatorName, imageUrl: creatorImageUrl },
        ],
        userIds: [currentUserEmail, creatorEmail],
      });
      router.push(`/chat/${docId1}`);
    } else {
      const id = querySnapshot.docs[0].id;
      router.push(`/chat/${id}`);
    }
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
        <TouchableOpacity onPress={initateChat} style={styles.button}>
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
