import React from "react";
import { FaGithub, FaPlus } from 'react-icons/fa'
import { Container, Form, SubmitButton } from "./styles";


export default function Main() {
    return (
        <div>
            <Container>
                <h1>
                    <FaGithub size={25} />
                    Repositórios
                </h1>

                <Form onSubmit={() => { }}>
                    <input type="text" placeholder="pesquise por um repositório" />

                    <SubmitButton>
                        <FaPlus size={15} color="#FFF" />
                    </SubmitButton>

                </Form>


            </Container>
        </div>
    )
}