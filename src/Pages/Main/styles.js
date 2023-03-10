import styled, {keyframes, css} from "styled-components";

export const Container = styled.div `
   max-width: 700px;
   background: #FFF;
   border-radius: 5px;
   padding: 30px;
   margin: 80px auto;

   h1{
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg{
      margin-right: 10px;
    }
   }
`;

export const Form = styled.form`
   margin-top: 30px;
   display: flex;
   flex-direction: row;

   input{
      flex: 1;
      border: 1px solid ${props => (props.error ? '#ff0000' : '#ddd')};
      padding: 10px 15px;
      border-radius: 5px
      font-size: 17px;
   }
`;

//button search animation

const animate = keyframes`
from{
   transform: rotate(0deg)
}
to{
   transform: rotate(360deg)
}

`;


export const SubmitButton = styled.div.attrs( props => ({
   type: 'submit button',
   disabled: props.loading,
})) `
    background: #4361ee;
    border:0;
    border-radius: 5px;
    margin-left: 10px;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &[disabled]{
      cursor: not-allowed;
      opacity: 0.5;
    }

    ${props => props.loading &&
      css`
         svg{
            animation: ${animate} 4s linear infinite;
         }
      `

   }
`;