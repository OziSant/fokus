import { useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ActionButton } from "../components/ActionButton";
import { FokusButton } from "../components/fokusButton";
import { IconPause, IconPlay } from "../components/icons";
import { Timer } from "../components/Timer";

const pomodoro = [
  {
    id: 'focus',
    initialValue: 25 * 60,
    image: require('./pomodoro.png'),
    display: 'Foco'
  },
  {
    id: 'short',
    initialValue: 5,
    image: require('./Imagem descanso curto.png'),
    display: 'Pausa curta'
  },
  {
    id: 'long',
    initialValue: 15,
    image: require('./Imagem descanso longo.png'),
    display: 'Pausa longa'
  },
]

export default function Index() {

  const [timerType, setTimerType] = useState(pomodoro[0])
  const [timerRunning, setTimerRunning] =  useState(false)
  const [seconds, setSeconds] = useState(pomodoro[0].initialValue)

  const timerRef = useRef(null)
  
  const clear = () => {
    if (timerRef.current != null) {
      clearInterval(timerRef.current)
      timerRef.current = null
      setTimerRunning(false)
    }
  }

  const toogleTimerType = (newTimerType) =>{
    setTimerType(newTimerType)
    setSeconds(newTimerType.initialValue)
    clear()
  }

  const toggleTimer = () => {
    if (timerRef.current){
      // pausar
      clear()
      return
    }
    setTimerRunning(true)
    const id = setInterval(() => {
      setSeconds(oldState => {
        if (oldState === 0) {
          clear()
          return timerType.initialValue
        }
        return oldState - 1
      })
    }, 1000)
    timerRef.current = id
  }

  return (
    <View style={styles.container}>
      <Image source={timerType.image}/>
      <View style={styles.actions}>
        <View style={styles.context}>
          {pomodoro.map(p => (
            <ActionButton 
              key={p.id}
              active={ timerType.id === p.id}
              onPress={() => toogleTimerType(p)}
              display={p.display}
            />
          ))}
        </View>
        <Timer totalSeconds={seconds} />
        <FokusButton 
          title={timerRunning ? 'Pausar' : 'Começar'}
          icons={timerRunning ? <IconPause /> : <IconPlay />}
          onPress={toggleTimer}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Projeto fictício e sem fins comerciais.
        </Text>
         <Text style={styles.footerText}>
          Projeto fictício e sem fins comerciais.
          Desenvolvido com base Aula de React Native da Alura.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#021123',
    gap: 40
  },
  actions: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: '#14448080',
    width: '80%',
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#144480',
    gap: 32
  },
  context: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  footer: {
    width: '70%',
  },
  footerText: {
    textAlign: 'center',
    color: '#98A0A8',
    fontSize: 10
  }
});


