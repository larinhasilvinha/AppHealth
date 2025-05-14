import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/Ionicons';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    fetch('http://localhost:3000/categories')
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);

    // Fetch doctors from the API
    fetch('http://localhost:3000/doctors')
      .then((res) => res.json())
      .then(setDoctors)
      .catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.topBar}>
          <MaterialIcons name="signal-cellular-alt" size={18} color="#fff" />
          <MaterialIcons name="wifi" size={18} color="#fff" />
          <MaterialIcons name="battery-full" size={18} color="#fff" />
        </View>

        <View style={styles.userInfo}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.userName}>Dani Martinez</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={20} color="gray" style={{ marginHorizontal: 10 }} />
          <TextInput placeholder="Search doctor" style={styles.searchInput} />
        </View>
      </View>

      {/* Body */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.showAll}>Show All</Text>
        </View>

        <View style={styles.categories}>
          {categories.map((category) => (
            <TouchableOpacity style={styles.category} key={category.id}>
              <MaterialIcons name='md-checkmark-circle' size={32} color="#6A64F1" />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Top Doctors */}
        <Text style={styles.sectionTitle}>Top doctors</Text>
        {doctors.map((doctor) => (
          <View style={styles.doctorCard} key={doctor.id}>
            <Image source={{ uri: doctor.image }} style={styles.doctorImg} />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>dr. {doctor.name}</Text>
              <Text style={styles.specialty}>Consultant - {doctor.specialty}</Text>
              <Text style={styles.rating}>⭐ 4.9 (37 Reviews)</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity><MaterialIcons name="home" size={30} color="#6A64F1" /></TouchableOpacity>
        <TouchableOpacity><MaterialIcons name="medical-services" size={30} color="#6A64F1" /></TouchableOpacity>
        <TouchableOpacity><MaterialIcons name="event" size={30} color="#6A64F1" /></TouchableOpacity>
        <TouchableOpacity><MaterialIcons name="person" size={30} color="#6A64F1" /></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC' },
  header: {
    backgroundColor: '#6A64F1',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  showAll: {
    color: '#6A64F1',
    fontWeight: '500',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  category: {
    width: '30%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
  },
  categoryText: {
    marginTop: 5,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  doctorCard: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  doctorImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  doctorInfo: {
    marginLeft: 15,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  specialty: {
    color: 'gray',
  },
  rating: {
    color: '#FFB300',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default App;
