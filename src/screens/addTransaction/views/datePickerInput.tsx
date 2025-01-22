import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DatePicker from "react-native-neat-date-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function DatePickerInput({
  date,
  setDate,
}: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  return (
    <>
      <Pressable
        style={styles.dateSelector}
        onPress={() => {
          Keyboard.dismiss();
          setDatePickerVisibility(true);
        }}
      >
        <Text>
          {date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
        <FontAwesome name="expand" size={16} color="black" />
      </Pressable>
      <View style={styles.dateSelectorWrapper}>
        <DatePicker
          isVisible={isDatePickerVisible}
          mode={"single"}
          onCancel={() => setDatePickerVisibility(false)}
          onConfirm={(output) => {
            if (
              typeof output === "object" &&
              "dateString" in output &&
              typeof output.dateString === "string"
            ) {
              setDate(new Date(output.dateString));
            }
            setDatePickerVisibility(false);
          }}
          maxDate={new Date()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dateSelector: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  dateSelectorWrapper: {
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default DatePickerInput;
