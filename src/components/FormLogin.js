import styled from 'styled-components';

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};

const Form = styled.form`
  margin:auto;
  @media ${device.laptop}{
    max-width:600px
  }
  @media ${device.laptopL}{
    max-width:800px
  }
`;

const H1 = styled.h1`
text-align:center;
`;

const FormBlock = styled.div`
  margin:auto;
  display:flex;
  flex-wrap:wrap;
  width:100%;
  
`;

const FormElement = styled.div`
  margin-bottom:15px;
  display:flex;
  justify-content:center;
  width:100%;
`;

const Input = styled.input`
  padding-top:10px;
  padding-bottom:10px;
  padding-left:15px;
  padding-right:15px;
  border-radius:10px;
  border:1px solid #00b300;
  &:focus {
    
    }
`;

export  { H1, FormBlock ,Form,FormElement,Input,device,size};