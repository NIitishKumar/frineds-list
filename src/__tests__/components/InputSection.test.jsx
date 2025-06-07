import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import * as utils from '../../utils';
import { addNewFriend } from '../../store/friendsSlice';
import InputSection from '../../components/InputSection';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(() => []),
}));

jest.mock('../../store/friendsSlice', () => ({
  addNewFriend: jest.fn(),
}));

describe('InputSection Component', () => {
  const mockDispatch = jest.fn();

  const setup = ({
    searchTerm = '',
    newFriendName = '',
    setSearchTerm = jest.fn(),
    setNewFriendName = jest.fn(),
  } = {}) => {
    useDispatch.mockReturnValue(mockDispatch);
    render(
      <InputSection
        searchTerm={searchTerm}
        newFriendName={newFriendName}
        setSearchTerm={setSearchTerm}
        setNewFriendName={setNewFriendName}
      />
    );
    return { setSearchTerm, setNewFriendName };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search and input fields', () => {
    setup();
    expect(screen.getByPlaceholderText('Search friends...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add new friend...')).toBeInTheDocument();
  });

  it('calls setSearchTerm on typing in search input', () => {
    const { setSearchTerm } = setup();
    const input = screen.getByPlaceholderText('Search friends...');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(setSearchTerm).toHaveBeenCalledWith('test');
  });

  it('validates special characters and shows alert', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { setNewFriendName } = setup();
    jest.spyOn(utils, 'containsSpecialChars').mockReturnValue(true);

    const input = screen.getByPlaceholderText('Add new friend...');
    fireEvent.change(input, { target: { value: 'John@123' } });

    expect(alertMock).toHaveBeenCalledWith(
      'Please enter a valid name without special characters or without numeric value.'
    );
    expect(setNewFriendName).not.toHaveBeenCalled();
    alertMock.mockRestore();
  });

  it('calls setNewFriendName if input is valid', () => {
    const { setNewFriendName } = setup();
    jest.spyOn(utils, 'containsSpecialChars').mockReturnValue(false);

    const input = screen.getByPlaceholderText('Add new friend...');
    fireEvent.change(input, { target: { value: 'Alice' } });

    expect(setNewFriendName).toHaveBeenCalledWith('Alice');
  });

  it('disables the Add button if newFriendName is empty or whitespace', () => {
    setup({ newFriendName: '   ' });
    const button = screen.getByRole('button', { name: /add/i });
    expect(button).toBeDisabled();
  });

  it('dispatches addNewFriend on clicking Add button', () => {
    const friendName = 'Charlie';
    setup({ newFriendName: friendName });

    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalled();
    expect(addNewFriend).toHaveBeenCalledWith({
      friend: expect.objectContaining({
        name: friendName,
        isFavorite: false,
      }),
    });
  });

  it('adds friend on pressing Enter in input field', () => {
    const friendName = 'David';
    setup({ newFriendName: friendName });

    const input = screen.getByPlaceholderText('Add new friend...');
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(mockDispatch).toHaveBeenCalled();
  });
});
