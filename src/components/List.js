import styled from "styled-components";

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li{
        padding: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        & + li{
            border-top: 1px solid #eee;
        }
    }

    svg{
        color: #4361ee;
    }
`;