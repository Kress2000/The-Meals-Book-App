import React from 'react'


export default function PopUp(props){
    // tobe deleted;
  const  {
        strMeal, 
        strMealThumb,
        strArea, 
        strInstructions,
        strCategory, 
        strIngredient1, 
        strIngredient2,
        strIngredient3, 
        strIngredient4,
        strYoutube,
        idMeal
    } =props.dataPopUp;

 
    return(
        <div className= 'popup text-center row' id='popup' key={idMeal} >
            <div className='closePopUpBox col-12 position-relative d-flex mb-5'>
                <i className='fas fa-times fw-bold closePage text-warning m-3' onClick ={props.removePopUp}></i>
            </div>
            <div className='popUpViewBox col-12 container-fluid p-2'>
                <img src={strMealThumb} alt={strMeal} className=' w-90 img-fluid h-30'/>
                <p> Name: <strong className='h2 text-lg mt-2 p-4'>{strMeal}</strong></p>
                <div>
                    <p className='fw-bold'>Description:</p>
                    <p className ="description">{strInstructions}</p>
                </div>
                <ul>
                    <li className='p-1 d-flex flex-direction-column'>
                        <span className='lead h4 fw-bold'> Main Ingredients: </span>
                        <span>{strIngredient1}</span>
                        <span>{strIngredient2}</span>
                        <span>{strIngredient3}</span>
                        <span>{strIngredient4}</span>
                    </li>
                    <li className='p-1 d-flex flex-direction-column'>
                        <span className='lead h4 fw-bold'>Category:</span> 
                        <span>{strCategory}</span>
                    </li>
                    <li className='p-1 d-flex flex-direction-column'>
                        <span className='lead h4 fw-bold'>Origin: </span>
                        <span>{strArea}</span>
                    </li>
                </ul>
                {strYoutube !=="" &&
                    <div className='p-5 text-center'>
                        <a href={strYoutube} target="_blank" className='fw-bold text-sm'>See video on Youtube</a>
                    </div>
                }
                
            </div>

        </div>

    )
}