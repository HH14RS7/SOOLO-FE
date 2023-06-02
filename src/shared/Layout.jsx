import styled from 'styled-components';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

const Content = styled.div`
  padding-top: 75px;
  padding-bottom: 75px;
`;

export default Layout;
