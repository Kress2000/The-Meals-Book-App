import React from 'react'
 
const Title = () => {
    return(
        <div className='mb-3 container ' id='title'>
            <h1 className='h1 p-0 m-0 container-fluid mb-2 text-center display-3 fw-bold appTitle'>
                The Meals Book
            </h1>
           
            <p className='d-none d-md-flex justify-content-center text-dark '>
                <small className='fw-bold mx-3'>
                    Learn how to cook your favorite meal
                </small>
                <small className='fw-bold d-none d-xxl-flex text-dark'>
                    Do it at Home
                </small>
                <small className='fw-bold d-none d-lg-flex mx-3'>
                    And make yours delicious!!
                </small>
            </p>
        </div>
        
    )
}
export default Title


