import React, {useState, useEffect} from "react"
//, {useState, useEffect}
export default function RandomLetterMeals(props){
    //all meals by first letter:
    const [data, setData] = useState([]);
    const letters = "abcdefgahijklmnopqrstuvwxyz";
    const arrayOfLetters = letters.split("");
    
    //each letter:
        let randomNumber;
        
        //this is a random letter to be used while fetching a certain recipe data
          for(let i =0; i<arrayOfLetters.length; i++){ 
             
             randomNumber = Math.floor(Math.random()* arrayOfLetters.length);
       
          }
      
        const letter = arrayOfLetters[randomNumber]
        useEffect(()=>{
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
            .then(response => response.json())
            .then(resData => setData(resData.meals))

        }, [])
        // const firstLetterMeals = "www.themealdb.com/api/json/v1/1/search.php?f="
        if(!data) return;
        const RandomLetterMealsPopUp = (event) =>{
            //TAKE EACH CARD BY FILTER IF IT IS CLICKED
          const newData =  data.filter(card =>{
            if(card.idMeal !== event) return;
            return card;
            });
        props.onClick(newData[0]);
        }
        
    
    return(
        <>
            {data &&
                <div className="container row mt-3 lettersRandom">
                    {data.map((randomEl) =>(
                        <div className='p-2 CardBox col-10 col-lg-5  m-2'
                            key={randomEl.idMeal}
                            id={randomEl.idMeal}>
                            <div className=' meal--image'>
                                <img src={randomEl.strMealThumb} className='img-fluid h-100' alt={randomEl.strMeal}/>

                            </div>
                            <div className='meal--details text-start'> 
                                <h1 className='fw-bold pb-1'>{randomEl.strMeal}</h1>
                                <p className='text-sm description p-0'>
                                    {randomEl.strInstructions.substring(0, 80)}
                                    <strong className='h1'>...</strong>
                                </p>
                                <ul className='details d-flex'>
                                    <li className='p-1'>
                                        <span>Main Ingredient:</span>
                                        <strong>{randomEl.strIngredient1}</strong>
                                        <strong>{randomEl.strIngredient2}</strong>
                                        <strong className='h1'>...</strong>
                                    </li>
                                    <li className='p-1'>
                                        <span>Category:</span> 
                                        <strong>{randomEl.strCategory}</strong>
                                    </li>
                                    <li className='p-1'>
                                        <span>Origin: </span>
                                        <strong>{randomEl.strArea}</strong>
                                    </li>
                                </ul>
                                <button
                                className='btn-sm btn-primary fw-bold '
                                onClick={()=>RandomLetterMealsPopUp(randomEl.idMeal)}
                                id="viewBtn"
                                >
                                    View recipe <i className="fas lead ps-3 fa-eye" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                                
                    ))
                    }
                </div>
            }
        </>
    )
}