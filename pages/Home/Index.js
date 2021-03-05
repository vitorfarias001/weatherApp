import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import {useState, useEffect} from 'react'
import * as Location from 'expo-location'
import { EvilIcons } from '@expo/vector-icons' 
import ThemeContext from '../../context/ThemeContext';
import InfoCard from '../../components/InfoCard'
import MainCard from "../../components/MainCard"
import getCurrentWeather from '../../api/consultApi'
import styles from './styles'
import axios from 'axios';
export default function Home() {
  const themeHook = useState("dark");
  const [darkTheme, setDarkTheme] = useState(true)
  const [currentTemperature, setCurrentTemperature] = useState('31')
  const [locationCoords, setLocationCoords] = useState(null);
  const [locationName, setLocationName] = useState('Brasil, Florianópolis')
  const [temperatureMin, setTemperatureMin] = useState('21')
  const [temperatureMax, setTemperatureMax] = useState('32')
  const [wind, setWind] = useState('7')
  const [humidity, setHumidity] = useState('68')

  async function getLocation(){
    let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
      }else{
        let location = await Location.getCurrentPositionAsync({})
        await setLocationCoords(location.coords)
      }
  }

  async function setCurrentWeather(){
    await getLocation()
    const data = await getCurrentWeather(locationCoords)
    // Vem da api nessa ordem [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity]
    setCurrentTemperature(convertKelvinToC(data[0]))
    setTemperatureMin(convertKelvinToC(data[1]))
    setTemperatureMax(convertKelvinToC(data[2]))
    setLocationName(data[3])
    setWind(data[4])
    setHumidity(data[5])
    
  }

  function convertKelvinToC(kelvin){
    return parseInt(kelvin - 273)
  }

  useEffect(() => {
    setCurrentWeather()
  }, [])

  return (
      <View style={[styles.container,{backgroundColor:  darkTheme ? '#232634' : '#F2F2F2'}]}>
      
        <TouchableOpacity style={styles.refreshButton} onPress={() => setCurrentWeather()}>
          <EvilIcons name="refresh" color={darkTheme ? 'white'  : 'black'} size={40}/>
        </TouchableOpacity>

        <Feather style={{marginTop: 50}} name="sun" size={40} color="orange" />

        <View style={styles.temperatureView}>
          <Text style={[styles.temperatureText, { color: darkTheme ? '#e0e0e0' : 'black'}]}>{currentTemperature}</Text>
          <Text style={[styles.temperatureText, {fontSize: 14,  color: darkTheme ? '#e0e0e0' : 'black'}]}>°C</Text>
        </View>
        
        <Text style={{color: darkTheme ? '#e0e0e0' : 'black'}}>{locationName}, 13:52</Text>

        <View style={[styles.cardsView,{ color: darkTheme ? 'black' : 'white'}]}>
          <MainCard title={"Manhã"} icon={'morning'} temperature={"27°"} backgroundColor={ darkTheme ?'#D26F2F' : '#CC6E30'} ></MainCard>
          <MainCard title={"Tarde"} icon={'afternoon'} temperature={"31°"} backgroundColor={darkTheme ? '#D29600'  : '#FCC63F'} ></MainCard>
          <MainCard title={"Noite"} icon={'night'} temperature={"21°"} backgroundColor={darkTheme ? '#008081'  : '#38B7B8'} ></MainCard>
        </View>
    
        <View style={[styles.info, {backgroundColor: darkTheme ? '#393e54' : '#8F8F8F'}]}>
          <Text style={[styles.infoText,{color: darkTheme ? '#e0e0e0' : 'white'}]}>Informações adcionais:</Text>
          <View style={styles.addtionalInfo}>
            <InfoCard title={'Vento'} variable={wind}/>
            <InfoCard title={'Umidade'} variable={humidity}/>
            <InfoCard title={'Temp. Min'} variable={temperatureMin} />
            <InfoCard title={'Temp. Max'} variable={temperatureMax} />
          </View>
        </View>

        <View style={styles.themeButton}>
          <View style={[styles.themeButtonSquare,{backgroundColor: darkTheme ? '#F2F2F2' : '#8F8F8F'}]}>
            <TouchableOpacity style={[styles.themeButtonCircle,{backgroundColor: darkTheme ? '#232634' : '#F2F2F2', alignSelf: darkTheme ? 'flex-end' : 'flex-start'}]} onPress={() =>darkTheme ? setDarkTheme(false) : setDarkTheme(true)}></TouchableOpacity>
          </View>
        </View>
      </View>
  );
}


