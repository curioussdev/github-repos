import React, { useCallback, useState } from "react";
import { FaGithub, FaSearch, FaSpinner, FaBars } from 'react-icons/fa'
import { Container, Form, SubmitButton } from "./styles";
import { List } from "../../components/List";

import api from "../../services/api";


export default function Main() {
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        async function submit() {
            setLoading(true)
            try {
                const response = await api.get(`repos/${newRepo}`);
                const data = {
                    name: response.data.full_name,

                }
                setRepositorios([...repositorios, data]);
                setNewRepo('');
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }


        submit();
    }, [newRepo, repositorios])

    function handleInputChange() {

    }



    return (
        <div>
            <Container>
                <h1>
                    <FaGithub size={25} />
                    Repositórios
                </h1>

                <Form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="pesquise por um repositório"
                        value={newRepo}
                        onChange={(e) => { setNewRepo(e.target.value) }}
                    />

                    <SubmitButton loading={loading ? 1 : 0}>
                        {loading ? (
                            <FaSpinner size={15} color="#FFF" />
                        ) : (
                            <FaSearch size={15} color="#FFF" />
                        )
                        }

                        
                    </SubmitButton>

                </Form>

                <List>
                    {repositorios.map(repo => (
                        <li key={repo.id}>
                            <span>{repo.name}</span>
                                <a href="">
                                    <FaBars size={25} />
                                </a>   
                        </li>
                    ) )}
                </List>  


            </Container>
        </div>
    )
}