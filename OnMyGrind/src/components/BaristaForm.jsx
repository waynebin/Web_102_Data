import React from 'react'
import { useState } from 'react'
import RecipeChoices from './RecipeChoices'
import drinksJson from '../assets/drinks (1).json'



{/* This component will be responsible for rendering the form that the user will 
    use to input their answer and check it against the correct answer. 
    It will also have a button to generate a new drink for the user to try. */}

const BaristaForm = () => {
    {/*
    Create state variables to keep track of what drink we have 
    currently and what the true recipe is behind that drink.*/}
    const [currentDrink, setCurrentDrink] = useState('');
    const [trueRecipe, setTrueRecipe] = useState({});


    const [correctSyrup, setCorrectSyrup] = useState('');
    const [correctBlended, setCorrectBlended] = useState('');
    const [correctMilk, setCorrectMilk] = useState('');
    const [correctTemperature, setCorrectTemperature] = useState('');

    const [inputs, setInputs] = useState({
        'Temperature': "",
        'Milk': "",
        'Syrup': "",
        'Blended': "",
    });

    const getNewDrink = () => {
        let randomDrinkIndex=Math.floor(Math.random()* drinksJson.drinks.length);
        const drink = drinksJson.drinks[randomDrinkIndex];
        setCurrentDrink(drink.name);
        setTrueRecipe(drink);
    }

    const onNewDrink = () => {
        setInputs({
        'Temperature': "",
        'Milk': "",
        'Syrup': "",
        'Blended': ""
        });
        setCorrectTemperature('');
        setCorrectMilk('');
        setCorrectSyrup('');
        setCorrectBlended('');
        
        getNewDrink();
    };

    {/*
        // new drink function handler function that will be called when the user 
        // clicks the "Check Answer" button. It will check the user's answer against the correct answer.
    */}
    const onCheckAnswer = () => {
    
        if(trueRecipe.temp !=inputs['temperature']){
            setCheckedTemperature('Wrong');
        } else {
            setCheckedTemperature('Correct');
        }

        if(trueRecipe.milk !=inputs['milk']){
            setCheckedMilk('Wrong');
        } else {
            setCheckedMilk('Correct');
        }

        if(trueRecipe.syrup !=inputs['Syrup']){
            setCheckedSyrup('Wrong');
        } else{
            setCheckedSyrup('Correct');
        }

        if(trueRecipe.blended !=inputs['Blended']){
            setCheckedBlended('Wrong');
        } else{
            setCheckedBlended('Correct');
        }
    };

    const ingredients = {
        'Temperature': ['Hot','Lukewarm','Cold'],
        'Milk': ['Cow','Oat','Goat','Almond','None'],
        'Syrup': ['Mocha','Vanilla','Toffee','Maple', 'Caramel','Other','None'],
        'Blended': ['Yes','Turbo','No']
    };

    return(
        <div>
            <h2>Hi,I'd like to order a:</h2>
            <div className="drink-container">
                <h2 className="mini-header">{currentDrink}</h2>
                <button
                    className="button newdrink"
                    onClick={onNewDrink}
                >
                    🔄
                </button>
            </div>
            <div> 
                <form className="container">
                    <div className="mini-container">
                        <h3>Temperature</h3>
                        <div className={`answer-space ${correctTemperature}`} >
                            {inputs["Temperature"]} 
                        </div>
                        <RecipeChoices
                            handleChange={(e) => setInputs((prevState) => ({
                                ...prevState,
                                [e.target.name]: e.target.value,
                            }))}
                            label="Temperature"
                            choices={ingredients["Temperature"]}
                            checked={inputs["Temperature"]}
                        />
                    </div>
     
                    <div className="mini-container">
                            <h3>Milk</h3>
                            <div className={`answer-space ${correctMilk}`} >
                                {inputs["Milk"]}
                            </div>
                            {/* call the RecipeChoices component for the Milk ingredient */}
                            <RecipeChoices
                                handleChange={(e) => setInputs((prevState)=>({
                                    ...prevState,
                                    [e.target.name]:e.target.value,

                                }))}
                                label="Milk"
                                choices={ingredients["Milk"]}
                                checked={inputs["Milk"]}
                            />
                        </div>
                    <div className="mini-container">
                            <h3>Syrup</h3>
                            <div className={`answer-space ${correctSyrup}`} >
                                {inputs["Syrup"]}
                            </div>
                            {/* call the RecipeChoices component for the Syrup ingredient */}
                            <RecipeChoices
                                handleChange={(e) => setInputs((prevState)=>({
                                    ...prevState,
                                    [e.target.name]:e.target.value,
                                }))}
                                label="Syrup"
                                choices={ingredients["Syrup"]}
                                checked={inputs["Syrup"]}
                            />  
                    </div>

                        <div className="mini-container">
                            
                        <h3>Blended</h3>
                        <div className={`answer-space id={correctBlended}`} >
                            {inputs["Blended"]}
                        </div>
                        {/* call the RecipeChoices component for the Blended ingredient */}
                        <RecipeChoices
                            handleChange={(e) => setInputs((prevState)=>({
                                ...prevState,
                                [e.target.name]:e.target.value,
                            }))}
                            label="Blended"
                            choices={ingredients["Blended"]}
                            checked={inputs["Blended"]}
                        />
                    </div>

                </form>

                <button className="submit-button" onClick={onCheckAnswer}>Check Answer</button>
                <button className="submit-button" onClick={onNewDrink}>New Drink</button>
            </div>
        </div>





    );
};

export default BaristaForm;