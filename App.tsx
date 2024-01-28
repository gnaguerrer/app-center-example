/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface State {
  inflationRate: number;
  riskFreeRate: number;
  amount: number;
  timeInYears: number;
  afterInflation: number;
  atRiskFree: number;
  atRiskFreeAfterInflation: number;
  difference: number;
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [state, setState] = useState<State>({
    inflationRate: 0.0,
    riskFreeRate: 0.0,
    amount: 0.0,
    timeInYears: 1,
    afterInflation: 0.0,
    atRiskFree: 0.0,
    atRiskFreeAfterInflation: 0.0,
    difference: 0,
  });
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const checkPreviousSession = async () => {
    const didCrash = await Crashes.hasCrashedInLastSession();
    if (didCrash) {
      await Crashes.lastSessionCrashReport();
      Alert.alert(
        'Crash',
        "Sorry about that crash, we're working on a solution",
      );
    }
  };

  const calculateInflationImpact = (
    value: number,
    inflationRate: number,
    time: number,
  ) => {
    return value / Math.pow(1 + inflationRate, time);
  };

  const calculate = () => {
    const afterInflation = calculateInflationImpact(
      state.amount,
      state.inflationRate / 100,
      state.timeInYears,
    );
    const atRiskFree =
      state.amount * Math.pow(1 + state.riskFreeRate / 100, state.timeInYears);
    const atRiskFreeAfterInflation = calculateInflationImpact(
      atRiskFree,
      state.inflationRate / 100,
      state.timeInYears,
    );
    const difference = atRiskFreeAfterInflation - afterInflation;

    setState(prev => ({
      ...prev,
      afterInflation,
      atRiskFree,
      atRiskFreeAfterInflation,
      difference,
    }));
  };

  useEffect(() => {
    checkPreviousSession();

    return () => {};
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        <TextInput
          placeholder="Current inflation rate"
          style={styles.textBox}
          keyboardType="decimal-pad"
          onChangeText={inflationRate =>
            setState(prev => ({...prev, inflationRate: Number(inflationRate)}))
          }
        />
        <TextInput
          placeholder="Current risk free rate"
          style={styles.textBox}
          keyboardType="decimal-pad"
          onChangeText={riskFreeRate =>
            setState(prev => ({...prev, riskFreeRate: Number(riskFreeRate)}))
          }
        />
        <TextInput
          placeholder="Amount you want to save"
          style={styles.textBox}
          keyboardType="decimal-pad"
          onChangeText={amount =>
            setState(prev => ({...prev, amount: Number(amount)}))
          }
        />
        <TextInput
          placeholder="For how long (in years) will you save?"
          style={styles.textBox}
          keyboardType="decimal-pad"
          onChangeText={timeInYears =>
            setState(prev => ({...prev, timeInYears: Number(timeInYears)}))
          }
        />
        <Button
          title="Calculate inflation"
          onPress={() => {
            calculate();
            Analytics.trackEvent('calculate_inflation', {
              Internet: 'WiFi',
              GPS: 'Off',
            });
          }}
        />
        <Text style={styles.label}>
          {state.timeInYears} years from now you will still have ${state.amount}{' '}
          but it will only be worth ${state.afterInflation}.
        </Text>
        <Text style={styles.label}>
          But if you invest it at a risk free rate you will have $
          {state.atRiskFree}.
        </Text>
        <Text style={styles.label}>
          Which will be worth ${state.atRiskFreeAfterInflation} after inflation.
        </Text>
        <Text style={styles.label}>A difference of: ${state.difference}.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 16,
  },
  label: {
    marginTop: 10,
  },
  textBox: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
