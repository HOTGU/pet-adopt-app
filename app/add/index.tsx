import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Toast from "react-native-toast-message";
import * as ImageManipulator from "expo-image-manipulator";

import Colors from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { db, storage } from "@/config/firebaseConfig";
import { CategoryList, CategoryType } from "@/types";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

type FormData = {
  name: string;
  breed: string;
  age: string;
  weight: string;
  address: string;
  about: string;
  sex: string;
  category: string;
};

const initValues = {
  name: "",
  breed: "",
  age: "",
  category: "강아지",
  weight: "",
  address: "",
  about: "",
  sex: "남자",
};

const AddNewPetScreen = () => {
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState<any>(initValues);
  const [gender, setGener] = useState<"남자" | "여자">("남자");
  const [image, setImage] = useState("");
  const [loader, setLoader] = useState(false);
  const [categoryList, setCategoryList] = useState<CategoryList[]>([]);

  const handleInputChange = (fieldName: string, fieldValue: string) => {
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const docsRef = collection(db, "Category");
    const snapshot = await getDocs(docsRef);
    const category = snapshot.docs.map((item) => {
      const data = item.data() as CategoryType;

      return data.name;
    });
    setCategoryList(category);
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });

    if (result.canceled) {
      return;
    }

    const assets = result.assets;
    // const resizeImages = [] as string[];

    if (assets[0]) {
      const resizeImage = await ImageManipulator.manipulateAsync(
        assets[0].uri,
        [{ resize: { width: 480, height: 480 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.PNG }
      );
      setImage(resizeImage.uri);
    }
  };

  const onSubmit = async () => {
    for (var key in formData) {
      if (!Boolean(formData[key])) {
        Toast.show({
          type: "info",
          text1: `항목이 비었습니다`,
          position: "bottom",
          visibilityTime: 2000,
        });

        return;
      }
    }
    setLoader(true);
    const imageUrl = await uploadImage();
    saveFormData(imageUrl);
    setLoader(false);
    router.replace("/(tabs)/home");
  };

  const uploadImage = async () => {
    const resp = await fetch(image);
    const blobImage = await resp.blob();
    const storageRef = ref(storage, "/PetAdopt/" + `${Date.now()}.jpg`);

    const response = await uploadBytes(storageRef, blobImage);
    const downloadUrl = await getDownloadURL(storageRef);

    return downloadUrl;
  };

  const saveFormData = async (imageUrl: string) => {
    const docId = Date.now().toString();
    const docRef = doc(db, "Pets", docId);
    await setDoc(docRef, {
      ...formData,
      imageUrl,
      user: {
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        imageUrl: user?.imageUrl,
      },
    });
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "ibm-medium", fontSize: 20 }}>
        입양을 위한 반려동물 등록
      </Text>
      <Pressable onPress={imagePicker}>
        {!image ? (
          <View
            style={{
              width: 100,
              height: 100,
              padding: 20,
              backgroundColor: Colors.WHITE,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={
                image
                  ? { uri: image }
                  : require("@/assets/images/placeholder.png")
              }
              style={{
                width: 70,
                height: 70,
              }}
            />
          </View>
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              backgroundColor: Colors.WHITE,
              borderRadius: 15,
            }}
          />
        )}
      </Pressable>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름 *</Text>
        <TextInput
          placeholder=""
          style={styles.input}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>카테고리 *</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => {
            setGener(itemValue);
            handleInputChange("category", itemValue);
          }}
          style={{ backgroundColor: Colors.WHITE }}
          itemStyle={{ height: 110 }}
        >
          {categoryList.map((c) => (
            <Picker.Item label={c} value={c} key={c} />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>품종 *</Text>
        <TextInput
          placeholder=""
          style={styles.input}
          onChangeText={(value) => handleInputChange("breed", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>나이 *</Text>
        <TextInput
          placeholder=""
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>성별 *</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => {
            setGener(itemValue);
            handleInputChange("sex", itemValue);
          }}
          style={{ backgroundColor: Colors.WHITE }}
          itemStyle={{ height: 110, backgroundColor: "white" }}
        >
          <Picker.Item label="남자" value="남자" />
          <Picker.Item label="여자" value="여자" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>무게 *</Text>
        <TextInput
          placeholder=""
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("weight", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>주소 *</Text>
        <TextInput
          placeholder=""
          style={styles.input}
          onChangeText={(value) => handleInputChange("address", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>설명 *</Text>
        <TextInput
          style={styles.input}
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChange("about", value)}
        />
      </View>

      <TouchableOpacity
        disabled={loader}
        style={styles.button}
        onPress={onSubmit}
      >
        {loader ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={{ fontFamily: "ibm-medium", textAlign: "center" }}>
            등록하기
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddNewPetScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
  },
  label: { marginBottom: 3, fontFamily: "ibm" },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginVertical: 10,
    marginBottom: 30,
  },
});
