import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Shared from "@/Shared";
import { useUser } from "@clerk/clerk-expo";

const MarkFav = ({
  petId,
  color = "black",
}: {
  petId: string;
  color?: string;
}) => {
  const { user } = useUser();
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    user && init();
  }, [user]);

  const init = async () => {
    const favorites = await getFav();
    favorites.includes(petId) ? setIsLike(true) : setIsLike(false);
  };

  const getFav = async () => {
    const result = await Shared.getFavList(user);

    if (result) {
      return result.favorites;
    } else {
      return [];
    }
  };

  const addToFav = async () => {
    setIsLike(true);
    const favorites = await getFav();
    const addFavorites = [...favorites, petId];
    await Shared.updateFav({ user, favorites: addFavorites });
  };

  const removeToFav = async () => {
    setIsLike(false);
    const favorites = await getFav();
    const removeFavorites = favorites.filter((item: string) => item !== petId);
    await Shared.updateFav({ user, favorites: removeFavorites });
  };

  return (
    <View>
      {isLike ? (
        <Pressable onPress={removeToFav}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={addToFav}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
};

export default MarkFav;

const styles = StyleSheet.create({});
