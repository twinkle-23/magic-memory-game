import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './component/SingleCard';

const cardImages=[
  {"src":"/img/helmet-1.png", matched : false},
  {"src":"/img/potion-1.png", matched : false},
  {"src":"/img/ring-1.png", matched : false},
  {"src":"/img/scroll-1.png", matched : false},
  {"src":"/img/shield-1.png", matched : false},
  {"src":"/img/sword-1.png", matched : false}
]


function App() {

  const [card,setCards] =useState([])
  const [turns, setTurns] =useState(0)
  const [cone, setCone]= useState(null)
  const [ctwo,setCtwo] =useState(null)
  const [disabled, setDisabled]= useState(false)

  // for card shuffling
  const ShuffleCards=()=>{
    const ShuffleCards =[...cardImages,...cardImages]
    .sort(()=> Math.random()-0.5)
    .map((cards)=>({...cards,id: Math.random()}))
    setCone(null)
    setCtwo(null)
    setCards(ShuffleCards)
    setTurns(0)

  }

    // for handling choice
  const handleChoice=(card)=>{
    cone? setCtwo(card): setCone(card)
  }

    // compare two cards
    useEffect(()=>{
      
      if(cone && ctwo){
        setDisabled(true)
          if(cone.src === ctwo.src){
            setCards(prevcard=>{
              return prevcard.map(card=>{
                 if(card.src === cone.src){
                    return {...card, matched: true}
                 }else{
                    return card
                 }
              })
            })
            resetTurn()

          }else{
           
           setTimeout(()=> resetTurn(),2000)
          }
      }
    }, [cone,ctwo])


    console.log(card)

    // reset card
  
const resetTurn=()=>{
  setCone(null)
  setCtwo(null)
  setTurns(prevturn=>prevturn + 1)
  setDisabled(false)
}

// automatically start the game

useEffect(()=>{
  ShuffleCards()
},[])


  return (
    <div className="App">
      <h1> Magic Match</h1>
      <button onClick={ShuffleCards}> New Game</button>
          <div className='card-grid'>
                             {card.map(card=>(
                                  <SingleCard key={card.id} 
                                  card={card}
                                  handleChoice={handleChoice}
                                  flipped= {card===cone || card === ctwo || card.matched}
                                  disabled={disabled}/>
                                  ))}
          </div>

          <p> Turns={turns}</p>
      
    </div>
  );
}

export default App;
