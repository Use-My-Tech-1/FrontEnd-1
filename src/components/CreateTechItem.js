import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import Input from './Input';
import axios from 'axios';
import { useHistory } from "react-router-dom";

// react 2
//import { axiosWithAuth } from '../utils/axiosWithAuth';

// {
//     id: 1,
//     itemName: "Yamaha",
//     price: "69.00",
//     description: "Clavinova Yamaha CLP-625 ",
//     city: "Boston",
//     state: "MA",
//     rentalTerm: "Weekly",
//     available: true,
//     user: {
//         fullName: 'John Doe',
//         address: "",
//         city: "",
//         state: "",
//         email: 'johndoe@test.com'
//       },
//       owner: true,
//     imageUrl:
//       "https://cdnm2-kraftmusic.netdna-ssl.com/media/catalog/product//y/a/yam-p125b_ipad.jpg",
//   } (edited) 

function CreateTechItem(props) {
    //** REACT 2 */
    let history = useHistory();
    //*** END REACT 2 */

    const defaultState = {
        itemName: "",
        description: "",
        price: '',
        city: '',
        state: '',
        rentalTerm: 'Weekly',
        available: true,
        owner: true,
        imageUrl: ""
    };

    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] = useState(defaultState);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [auctions, setAuctions] = useState([]);

    let formSchema = yup.object().shape({
        itemName: yup
            .string()
            .required('Item Name is required'),
        description: yup
            .string()
            .required('Please add a description')
            .max(100, "Maximum of 50 characters for description"),
        price: yup
            .string()
            .required('Price in $ is required'),
        city: yup
            .string()
            .required('Please put in a city name'),
        state: yup
            .string()
            .required('Please put in a city name'),
        rentalTerm: yup
            .string()
            .required('Please put in a city name')
    });

    //State set for the add button to be enabled or disabled
    useEffect(() => {
        if (formState.itemName && formState.description && formState.startingPrice) {
            setButtonDisabled(false);
        }
        else if (!formState.itemName || !formState.description || !formState.startingPrice) {
            setButtonDisabled(true);
        }
        return () => console.log("The Effect Hook has been cleaned up.");
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        console.log('Form submitted');
        axios
            ({ method: "POST", url: 'https://api', data: formState, withCredentials: true })
            .then((res) => {console.log('form submit success', res)
                setAuctions([...auctions, res.data])})
            .catch(err => console.log('Form submission error', err));
            history.push("/auctions");
    };

    const inputChange = e => {
        e.persist();
        let value = e.target.value;
        yup.reach(formSchema, e.target.name)
        .validate(value)
        .then(valid => {
            setErrors({
                ...errors,
                [e.target.name]: ""
            })
        })
        .catch(err => {
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            })
        })
        setFormState({
            ...formState,
            [e.target.name]: value
        });
        console.log(formState);
    };

    
    return (
        <div className="formContainer">
            <form onSubmit={formSubmit}>
                <div className="RadioContainer">
                    <label>Weekly</label>
                    <input defaultChecked="Weekly" type='radio' name='type' onChange={inputChange} value='weekly' />

                    <label>Monthly</label>
                    <input type='radio' name='type' onChange={inputChange} value='monthly' />
                </div>
                <Input
                    type="text"
                    name="itemName"
                    onChange={inputChange}
                    value={formState.itemName}
                    label="Item Name"
                    errors={errors}
                    />
                <Input
                    type="text"
                    name="description"
                    onChange={inputChange}
                    value={formState.description}
                    label="Description"
                    errors={errors}
                    />
                <Input
                    type="decimal"
                    name="price"
                    onChange={inputChange}
                    value={formState.price}
                    label="Starting Price"
                    errors={errors}
                    />
                <Input
                    type="text"
                    name="city"
                    onChange={inputChange}
                    value={formState.city}
                    label="City"
                    errors={errors}
                    />
                <Input
                    type="text"
                    name="state"
                    onChange={inputChange}
                    value={formState.state}
                    label="State"
                    errors={errors}
                    />
                <button disabled={buttonDisabled}>Create Tech Item</button>
            </form>
        </div>
    )
};

export default CreateTechItem;