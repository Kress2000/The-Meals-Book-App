import React from 'react';
import RandomMeal from './components/randomMeal';
import Title from './components/Title';
import Search from './components/Search';
import PopUp from './components/PopUp';
import RandomLetterMeals from "./components/RandomLetterMeals";
import Footer from './components/footer';


export default function App(){
    //toggle popup visibily
    const [PopUpVisible, setPopUpVisible] = React.useState(false);
    //data to distibute in child
    const[dataPopUp, setDataPopUp] = React.useState({});

    //get data and distribute in components popup from other copmnts
    const getData = (data)=>{
        
        //randomMeal, randomMealLetters, Search
        setDataPopUp(data);

        //make popUp visible
        setPopUpVisible(true)

    }
    
    return(
        <div className='container-fluid row p-0 position-relative app-box'>
            <Title />
            <Search
            onClick ={getData}
             />
            <div className='container px-2 mt-5 '>
                <h1 className='h2 p-4 text-dark text-center fw-bold' > Featured/Random recipes:</h1>
               <div className='container-fluid app-box--random row m-0 p-0'>
                    <RandomMeal
                        onClick ={getData}
                    />
                    {PopUpVisible &&
                    <PopUp
                        dataPopUp = {dataPopUp}
                        removePopUp={() => setPopUpVisible(false)}
                     />
                    }
                    <RandomLetterMeals
                        onClick ={getData}
                    />
               </div>
            </div>
            <Footer />
            

        </div>
    )
}