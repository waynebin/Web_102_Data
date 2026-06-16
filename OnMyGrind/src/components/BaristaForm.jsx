import React from 'react'
import { useState } from 'react'


// This component will be responsible for rendering the form that the user will use to input their answer and check it against the correct answer. It will also have a button to generate a new drink for the user to try.

// new drink function that will be called when the user clicks the 
// "New Drink" button. It will generate a new drink and update the state of the component with the new drink's information.
const onNewDrink = () => {
    // TODO: implement new drink logic
};

// new drink function handler function that will be called when the user 
// clicks the "Check Answer" button. It will check the user's answer against the correct answer.
const onCheckAnswer = () => {
    // TODO: implement check answer logic
};
const BristaForm = () => {

    return(
        <div>
            <h2>Hi,I'd like to order a:</h2>
            <div> 
                <form>
                    
                </form>

                <button className="submit-button" onClick={onCheckAnswer}>Check Answer</button>
                <button className="submit-button" onClick={onNewDrink}>New Drink</button>

                const[inputs, setInputs] = useState({
                    'Temperature': "",
                    'Milk': "",
                    'Syrup': "",
                    'Blended': "",
                });

                const ingredients={
                    'Temperature':['Hot','Lukewarm','Cold'],
                    'Milk':['Cow','Oat','Goat','Almond','None'],
                    'Syrup':['Mocha','Vanilla','Toffee','Maple', 'Caramel','Other','None'],
                    'Blended':['Yes','Turbo','No']
                }

            </div>
        </div>





    );
};

export default BristaForm;