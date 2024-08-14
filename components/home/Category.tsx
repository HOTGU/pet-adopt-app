import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constants/Colors";
import { CategoryType, CategoryList } from "@/types";

const Category = ({
  category,
}: {
  category: (value: CategoryList) => void;
}) => {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [selected, setSelected] = useState<CategoryList>("강아지");
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    const docRef = collection(db, "Category");

    const snapshot = await getDocs(docRef);

    const categories = snapshot.docs.map((doc) => {
      const data = doc.data() as CategoryType;
      return data;
    });

    setCategoryList(categories);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "ibm-medium", fontSize: 20 }}>카테고리</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(item.name);
              category(item.name);
            }}
            style={{ flex: 1 }}
          >
            <View
              style={[
                styles.container,
                selected === item.name && styles.selectedCategoryContainer,
              ]}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={{ textAlign: "center", fontFamily: "ibm" }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    margin: 5,
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.SECONDARY,
    borderColor: Colors.SECONDARY,
  },
});
