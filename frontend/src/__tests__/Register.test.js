import {screen,render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import axios from 'axios';
import Register from '../components/Register';
jest.mock('axios');

test('checking placeholder text', () => { 
    render(
    <BrowserRouter>
        <Register/>
    </BrowserRouter>
    );
    const inputName =  screen.getByPlaceholderText("Name");
    expect(inputName).toBeInTheDocument();
    const email=screen.getByPlaceholderText("Email");
    expect(email).toBeInTheDocument();
})

test('checking number of input blocks', () => { 
    render(
    <BrowserRouter>
        <Register/>
    </BrowserRouter>
    );
    const numberOfInputs= screen.getAllByRole("textbox");
    expect(numberOfInputs.length).toBe(2);
})

test('checking whether register button rendered or not', () => { 
    render(
    <BrowserRouter>
        <Register/>
    </BrowserRouter>
    );
    const registerButton=screen.getByRole("button");
    expect(registerButton).toBeInTheDocument();
})

test('test-4', () => { 
    render(
    <BrowserRouter>
        <Register/>
    </BrowserRouter>
    );
    const text=screen.getByText("Login");
    expect(text).toBeInTheDocument();
 })

 test('test-5', () => { 
    render(
    <BrowserRouter>
        <Register/>
    </BrowserRouter>
    );
    const text=screen.getByText("Already have an account");
    expect(text).toBeInTheDocument();
 })

 test('test-6', () => { 
    render(
    <BrowserRouter>
        <Register/>
    </BrowserRouter>
    );
    const text=screen.getAllByText("Register");
    expect(text.length).toBe(2);
 })