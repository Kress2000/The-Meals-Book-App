import React from 'react'
//import PopUp from './PopUp';


export default function RandomMeal(props){
    
        const[randomMeal, setRandomMeal] = React.useState(null);

    //One Random meal top be transmitted by props in different Components:::::::::::::
    const mealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
    
    React.useEffect( () => {
        try{

            fetch(mealUrl)
            .then(resp => resp.json())
            .then(resp => setRandomMeal(resp.meals[0]))   
        }
        catch(error){
            console.log('Nothing done at all', error);
        }

        // use async function------
    //     async function getMealByRandom(){
    //         const res = await fetch(mealUrl);
    //         const data = await res.json();
    //         const mealObj = data.meals[0];
    //         // setMeal(mealObj);
    //        return mealObj;

    //     }
    //    console.log(getMealByRandom()) ;


    },[]);

    
    if(!randomMeal) return null;
    const RandomBtnPopUp = () =>{
        props.onClick(randomMeal);
    }
    
    const { 
        strMeal,
        strMealThumb,
        strArea, 
        strInstructions, 
        strCategory, 
        strIngredient1, 
        strIngredient2,
        idMeal
    } = randomMeal 
          
      

    return(
        <div className='p-2 CardBox col-10 col-lg-8'
           id={idMeal}
           >
                <div className=' meal--image'>
                    <img src={strMealThumb} className='img-fluid h-100' alt={strMeal}/>

                </div>
                <div className='meal--details  text-start'> 
                    <h1 className='fw-bold pb-1'>{strMeal}</h1>
                    <p className='text-sm description p-0'>
                        {strInstructions.substring(0, 200)}
                        <strong className='lead'>...</strong>
                    </p>
                    <ul className='details d-flex'>
                        <li className='p-1'>
                            <span>Main Ingredients:</span>
                            <strong>{strIngredient1}</strong>
                            <strong>{strIngredient2}</strong>
                            <strong className='h1'>...</strong>
                        </li>
                        <li className='p-1'>
                            <span>Category:</span> 
                            <strong>{strCategory}</strong>
                        </li>
                        <li className='p-1'>
                            <span>Origin: </span>
                            <strong>{strArea}</strong>
                        </li>
                    </ul>
                    <button
                    className='btn btn-primary fw-bold '
                    id='viewBtn' 
                    onClick={RandomBtnPopUp}
                    >
                        View recipe <i className="fas lead ps-3 fa-eye" aria-hidden="true"></i>
                    </button>
                </div>
           </div>
    )
}