import {act, cleanup, fireEvent, waitFor} from '@testing-library/react-native';
import * as React from 'react';
import axios from 'axios';
import {renderWithProviders} from '../test-utils';
import ProductList from '../src/screens/tab-feed/ProductList';
import {mockedResult} from '../__mocks__/mock';
import {NavigationProp} from '@react-navigation/native';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
type NavigationScreenPropAlias = NavigationProp<{}>;
describe('ProductList Component', () => {
  let navigation: Partial<NavigationScreenPropAlias>;
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('renders ProductList correctly', async () => {
    const {getByTestId} = renderWithProviders(
      <ProductList navigation={navigation as NavigationScreenPropAlias} />,
    );
    expect(getByTestId('product-list-container')).toBeDefined();
  });

  it('should show loading indicator while fetching data', async () => {
    mockedAxios.get.mockResolvedValueOnce({data: mockedResult});
    const {getByTestId} = renderWithProviders(
      <ProductList navigation={navigation as NavigationScreenPropAlias} />,
    );
    const loadingIndicator = getByTestId('loading-indicator');
    expect(loadingIndicator).toBeDefined();
  });

  it('should show an error dialog if an error occurs during data fetching', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch'));
    const {getByText, getByTestId} = renderWithProviders(
      <ProductList navigation={navigation as NavigationScreenPropAlias} />,
    );
    await waitFor(() => {
      expect(getByTestId('error-dialog')).toBeDefined();
      expect(getByText('Failed to fetch')).toBeDefined();
    });
  });

  it('should render product items when data is fetched successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({data: mockedResult});
    const {getAllByTestId} = renderWithProviders(
      <ProductList navigation={navigation as NavigationScreenPropAlias} />,
    );
    await waitFor(() => {
      const productItems = getAllByTestId('product-item');
      expect(productItems).toHaveLength(mockedResult.length);
    });
  });

  it('should navigate to the cart screen when the FAB (Floating Action Button) is pressed', async () => {
    const navigateMock = jest.fn();
    const {getByTestId} = renderWithProviders(
      <ProductList navigation={navigation as NavigationScreenPropAlias} />,
    );
    const fabButton = getByTestId('fab-button');
    act(() => {
      fireEvent.press(fabButton);
    });
    expect(navigateMock).toHaveBeenCalledWith('Cart');
  });

  it('should hide the badge when the cart is empty', async () => {
    const {queryByTestId} = renderWithProviders(
      <ProductList navigation={navigation as NavigationScreenPropAlias} />,
    );
    const badge = queryByTestId('badge');
    expect(badge).toBeNull();
  });

  it('should display the badge when the cart has items', async () => {
    mockedAxios.get.mockResolvedValueOnce({data: mockedResult});
    const {getByTestId} = renderWithProviders(
      <ProductList navigation={navigation as NavigationScreenPropAlias} />,
    );
    await waitFor(() => {
      const badge = getByTestId('badge');
      expect(badge).toBeDefined();
    });
  });
});
