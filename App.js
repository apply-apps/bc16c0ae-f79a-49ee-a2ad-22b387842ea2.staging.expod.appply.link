// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'https://apihub.staging.appply.link/chatgpt';

const App = () => {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(false);

  const generateGreeting = async () => {
    if (!name.trim()) {
      alert('Please enter a name');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        messages: [
          { role: "system", content: "You are a friendly AI assistant that generates personalized greetings." },
          { role: "user", content: `Generate a friendly greeting for ${name}` }
        ],
        model: "gpt-4o"
      });

      const { data } = response;
      setGreeting(data.response);
    } catch (error) {
      console.error('Error generating greeting:', error);
      alert('Failed to generate greeting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Greeting Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.button} onPress={generateGreeting} disabled={loading}>
        <Text style={styles.buttonText}>Generate Greeting</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.greeting}>{greeting}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
// End of App.js