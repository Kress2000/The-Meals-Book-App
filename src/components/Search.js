import React from 'react'


export default function Search(props){
   

    //fetched data
    const [mealsArr, setMealsArr] = React.useState([]);
    //input term
    const[search, setSearch]= React.useState({
        term: ""
    });
    //auto fill input search
    const [suggestions, setSuggestions] =React.useState([]);
    const [style, setStyle] = React.useState(false);
    //toggles visibiliy of search box
    const [searchVisibity, setSearchVisibility] = React.useState(false);
    //after making a search and display results
    const [mealsResults, setMealsResults] =React.useState(null);
    //when you searched a meal we don't have
    const [WarningSearch, setWarningSearch] = React.useState(false);
    
    
    //when we are writing in search bar
    function onchangeHandler(text){
        text.preventDefault();
        setStyle(prev => !prev)//make suggestions visible
        const term = text.target.value.toLowerCase();
        setSearch({term: term}); 

    }

    let {term} =search; //collecting the input value...!!!!!!!!
 
    //fetching data from api by Search whole term
    React.useEffect(
        ()=>{
          try{  
              fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term)
                .then(res => res.json())
                .then(res => setMealsArr(res.meals)
                );
               
            }
            catch(error){
                console.log(error)
            }
                    
        }, []);

   function clickSuggestion(suggestion){
       term = suggestion.target//when we click on a certain suggestion
        handleSearch(term);

    }
    //when we search
    
    function handleSearch(value){
        value.preventDefault();
        
        setSearchVisibility(prevState => !prevState);
     
        //check if it contains the such results
        const result = mealsArr.filter(recipe => {
            
            if( recipe.strMeal.toLowerCase().includes(term) || 
                recipe.strCategory.toLowerCase().includes(term) ||
                recipe.strIngredient1.toLowerCase().includes(term) ||
                recipe.strIngredient2.toLowerCase().includes(term) ||
                recipe.strIngredient3.toLowerCase().includes(term)
                )
            {

                return recipe;
            }
            else {setWarningSearch(true);
                    setTimeout(() => {
                        setWarningSearch(false);
                    }, 2000);
                setSearchVisibility(prevState => !prevState);
            }
        });
        //WORKING WITH POPUPSS
    if(!result) return;
    const SearchMealsPopUp = (event) =>{
        //TAKE EACH CARD BY FILTER IF IT IS CLICKED
    const newData =  result.filter(card =>{
        if(card.idMeal !== event) return;
        return card;
        });
    props.onClick(newData[0]);
    }
    //mapp to get every card results::::::
       const results=  result.map(meal => <div key={meal.idMeal} className='col-8 CardBox col-lg-6 col-xl-5 text-light m-2 d-flex p-2'>
                                                            <div className=' meal--image'>
                                                                <img src={meal.strMealThumb} className='img-fluid h-100' alt={meal.strMeal}/>
                                            
                                                            </div>
                                                            <div className='meal--details'> 
                                                                <h1 className='fw-bold pb-1'>{meal.strMeal}</h1>
                                                                <p className='text-sm description p-0'>
                                                                    {meal.strInstructions.substring(0, 80)}
                                                                    <strong className='lead'>...</strong>
                                                                </p>
                                                                <ul className='details d-flex'>
                                                                    <li className='p-1'>
                                                                        <span>Main Ingredients:</span>
                                                                        <strong>{meal.strIngredient1}</strong>
                                                                        <strong>{meal.strIngredient2}</strong>
                                                                        <strong className='h1'>...</strong>

                                                                    </li>
                                                                    <li className='p-1'>
                                                                        <span>Category:</span> 
                                                                        <strong>{meal.strCategory}</strong>
                                                                    </li>
                                                                    <li className='p-1'>
                                                                        <span>Origin: </span>
                                                                        <strong>{meal.strArea}</strong>
                                                                    </li>
                                                                </ul>
                                                                <button
                                                                className='btn bg-warning text-primary fw-bold'
                                                                id='viewBtn'
                                                                onClick={() => SearchMealsPopUp(meal.idMeal)}
                                                                >
                                                                    View recipe <i className="fas lead ps-3 fa-eye" aria-hidden="true"></i>
                                                                </button>
                                                            </div>
                                                    </div>
                                            )
          
            setMealsResults(results)
        
    }
    //END OF ESEARCH FUNCTION
    
    const closeSearch = () =>{
        setSearchVisibility(prevState => !prevState); 
    }
    
//preventing the window lo load when it is anull search
const [nullSearch, setNullSearch] = React.useState(false)
  const stopLoad = (e)=>{ 
        e.preventDefault();
        setNullSearch(prev => !prev);
        setTimeout(()=>{
            setNullSearch(prev => !prev);
        }, 2000)
}
 return(
        <div className='position-relative container w-100 searchBox'>
            {nullSearch && <p className='text-sm WarningSearch  bg-warning w-100 fw-bold'> Null Search!!</p>}
            {WarningSearch &&
                <div className="container">
                    <span className='text-sm WarningSearch  bg-warning w-100 fw-bold'> Your Seach did not match our strore! Try another search</span>
                </div>
            }
            <form className=' form
                search-container
                container 
                my-1 
                text-center'
                onSubmit={ term.length? handleSearch : stopLoad}
                id='form'
                autoComplete="off" 
                action="..."
            >
                <input
                className='input lead text-sm text-dark'
                placeholder='Search a Meal'
                type='text'
                onChange={onchangeHandler}
                value={term}
                name= "term"
                />
                <button className= 'd-flex justify-content-center btn-sm align-items-center' 
                 id='btnSearch'
                // onClick={term.length? handleSearch : stopLoad}
                 >
                    <i className='fas fa-search fw-bold lead '></i>
                </button>
                
            </form>
            {mealsResults &&
            searchVisibity &&
                <div className='Search-results w-100' id='Search-results'>
                    <h2 className='h3 lead fw-bold mb-3 position-relative w-100 text-light'>
                        Search Results:
                        <i className='fas fa-times  position-absolute text-warning closePage'
                            onClick={closeSearch}>
                        </i>
                    </h2>
                    <div className='resultsBox w-100 row container-fluid'>
                        {mealsResults}
                    </div>
                    
                </div>
            }
            
           
        </div>
        )  
}