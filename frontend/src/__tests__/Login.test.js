import {screen,render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import axios from 'axios';
import Login from '../components/Login';

jest.mock('axios');

test('Login test-1', () => { 
    render(
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    );
    const email=screen.getByPlaceholderText("Email");
    expect(email).toBeInTheDocument();
 })

test('Login test-2', () => { 
   render(
       <BrowserRouter>
           <Login/>
       </BrowserRouter>
   );
   const numberOfInputs= screen.getAllByRole("textbox");
   expect(numberOfInputs.length).toBe(1);
});

test('Login test-3', () => { 
    render(
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    );
    const registerButton=screen.getByRole("button");
    expect(registerButton).toBeInTheDocument();
});

test('Login test-4', () => { 
    render(
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    );
    const text=screen.getByText("Don't have an account");
    expect(text).toBeInTheDocument();
});

test('Login test-5', () => { 
    render(
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    );
    const text=screen.getAllByText("Login");
    expect(text.length).toBe(2);
});
