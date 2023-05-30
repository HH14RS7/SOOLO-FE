import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    /* color */
    --color-primary-25: #FFF5F6;
    --color-primary-50: #FFF1F3;
    --color-primary-100: #FFE4E8;
    --color-primary-200: #FECDD6;
    --color-primary-300: #FEA3B4;
    --color-primary-400: #FD6F8E;
    --color-primary-500: #F63D68;
    --color-primary-600: #E31B54;
    --color-primary-700: #E31B54;
    --color-primary-800: #A11043;
    --color-primary-900: #89123E;
    
    --color-gray-25 : #FFFFFF;
    --color-gray-50 : #F9FAFB;
    --color-gray-100 : #F2F4F7;
    --color-gray-200 : #E4E7EC;
    --color-gray-300 : #D0D5DD;
    --color-gray-400 : #98A2B3;
    --color-gray-500 : #667085;
    --color-gray-600 : #475467;
    --color-gray-700 : #344054;
    --color-gray-800 : #1D2939;

    --color-success-500: #12B76A;
    --color-error-500 : #F04438;
    
    --color-black: #000000;
    --color-white : #FFFFFF;

    /* font size */
    --font-large: 48px;
    --font-medium: 28px;
    --font-regular: 18px;
    --font-small: 16px;
    --font-micro: 14px;
  }

/* Typography */
/*
  h1 {
    font-size: var(--font-large);
    font-weight: var(--weight-bold);
    color: var(--color-black);
    margin: 16px 0px;
  }
  */

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input:focus {
    outline: none;
  }

  button {
    border: 0 none;
    background: none;
    cursor: pointer;
  }
  
  li {
    list-style: none;
  }
  
  a {
    text-decoration: none;
  }


`;

export default GlobalStyle;
