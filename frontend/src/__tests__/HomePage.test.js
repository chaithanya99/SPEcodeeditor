import {screen,render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import HomePage from '../components/HomePage';

test('homepage test-1', () => { 
    render(
        <BrowserRouter>
            <HomePage/>
        </BrowserRouter>
    );
    const numberOfBtn=screen.getAllByRole("button");
    expect(numberOfBtn.length).toBe(2);
})

test('homepage test-2', () => { 
    render(
        <BrowserRouter>
            <HomePage/>
        </BrowserRouter>
    );
    const text1=screen.getByText("Login");
    expect(text1).toBeInTheDocument();
    const text2=screen.getByText("Register");
    expect(text2).toBeInTheDocument();
})
