import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { NavigationProps, Transaction } from "../../types";
import { AssetTickerSelector } from "./views/assetTickerSelector";
import { saveTransaction } from "../../utils/storage";
import { Button, ButtonGroup, Input } from "@rneui/themed";
import { validateAmountInput } from "../../utils/validateAmountInput";
import ScreenHeader from "../../components/screenHeader";
import DatePickerInput from "./views/datePickerInput";
import ScreenWrapper from "../../components/screenWrapper";
import { getInfoAboutCrypto } from "../../utils/getInfoAboutCrypto";

function AddTransaction({ navigation }: NavigationProps<"AddTransaction">) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssetTicker, setSelectedAssetTicker] = useState("BTC");
  const [quantity, setQuantity] = useState("");
  const [pricePerCoinInUSD, setPricePerCoinInUSD] = useState("");
  const [transactionType, setTransactionType] =
    useState<Transaction["type"]>("Buy");
  const [date, setDate] = useState(new Date());

  const fractionDigits = useMemo(() => {
    const info = getInfoAboutCrypto(selectedAssetTicker);
    return info ? info.fractionDigits : 4;
  }, [selectedAssetTicker]);

  const onSave = useCallback(async () => {
    setIsLoading(true);

    await saveTransaction({
      date: date.toDateString(),
      type: transactionType,
      quantity: Number(quantity),
      pricePerCoinInUSD: Number(pricePerCoinInUSD),
      assetTicker: selectedAssetTicker,
    });
    navigation.reset({
      index: 0,
      routes: [{ name: "PortfolioOverview" }],
    });
  }, [selectedAssetTicker, pricePerCoinInUSD, quantity, transactionType, date]);

  const onQuantityTextChangeHandler = useCallback(
    (value: string) => {
      const validValue = validateAmountInput(value, fractionDigits);

      if (validValue === null) {
        return;
      }
      setQuantity(validValue);
    },
    [fractionDigits]
  );

  const onPricePerCoinTextChangeHandler = useCallback(
    (value: string) => {
      const validValue = validateAmountInput(value, 2);

      if (validValue === null) {
        return;
      }
      setPricePerCoinInUSD(validValue);
    },
    [fractionDigits]
  );

  return (
    <>
      <ScreenWrapper>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.flexContainer}>
            <ScreenHeader
              title="Add Transaction"
              onPressBack={() => navigation.goBack()}
            />
            <AssetTickerSelector
              selectedAssetTicker={selectedAssetTicker}
              setSelectedAssetTicker={setSelectedAssetTicker}
              onSelectorOpen={() => {
                Keyboard.dismiss();
              }}
            />
            <Input
              label={quantity === "" ? "" : "Quantity"}
              placeholder={`Input ${selectedAssetTicker} quantity`}
              value={quantity}
              onChangeText={onQuantityTextChangeHandler}
              keyboardType="numeric"
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.inputStyle}
              errorStyle={styles.errorStyle}
            />
            <Input
              label={pricePerCoinInUSD === "" ? "" : "Price Per Coin in USD"}
              placeholder={`Input price per coin in USD`}
              value={pricePerCoinInUSD}
              onChangeText={onPricePerCoinTextChangeHandler}
              keyboardType="numeric"
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.inputStyle}
              errorStyle={styles.errorStyle}
            />
            <ButtonGroup
              buttons={["Buy", "Sell"]}
              selectedIndex={transactionType === "Buy" ? 0 : 1}
              onPress={(value) => {
                setTransactionType(value === 0 ? "Buy" : "Sell");
              }}
              containerStyle={styles.transactionTypeButtonGroup}
            />
            <DatePickerInput date={date} setDate={setDate} />
            <View style={styles.spacer} />
            <Button
              type="solid"
              size="lg"
              buttonStyle={styles.button}
              loading={isLoading}
              onPress={onSave}
            >
              Save
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </ScreenWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  errorStyle: {
    height: 0,
  },
  button: {
    width: Dimensions.get("window").width - 32,
    height: 48,
    marginTop: 16,
    borderRadius: 32,
  },
  spacer: {
    flex: 1,
  },
  transactionTypeButtonGroup: {
    width: Dimensions.get("window").width - 32,
    marginTop: 16,
    height: 48,
    borderRadius: 16,
  },
  flexContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default AddTransaction;
