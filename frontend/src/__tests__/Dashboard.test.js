import {screen,render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import axios from 'axios';
import FileRow from '../components/Filerow';


jest.mock('axios');

test('Dashboard test-1', () => { 
    const mockOnDelete=jest.fn();
    const fileName="testing";
    render(
        <BrowserRouter>
            <FileRow fileName={fileName} onDelete={mockOnDelete}/>
        </BrowserRouter>
    );
    const deleteBtn=screen.getByRole("button",{name: "Delete"});
    fireEvent.click(deleteBtn);
    expect(mockOnDelete).toHaveBeenCalled();
})

test('Dashboard test-2', () => { 
    const mockOnDelete=jest.fn();
    const fileName="testing";
    render(
        <BrowserRouter>
            <FileRow fileName={fileName} onDelete={mockOnDelete}/>
        </BrowserRouter>
    );
    const fileBtn=screen.getByRole("button",{name: fileName});
    expect(fileBtn).toBeInTheDocument();
})