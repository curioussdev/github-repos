import React, { useCallback, useState } from "react";
import { FaGithub, FaSearch, FaSpinner, FaBars, FaTrash} from 'react-icons/fa'
import { Container, Form, SubmitButton } from "./styles";
import { List } from "../../components/List";
import { DeleteButton } from "../../components/DeleteButton";
import api from "../../services/api";


export default function Main() {
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        async function submit() {
            setLoading(true)
            setAlert(null);
            try {

                if(newRepo == ''){
                    throw new Error('Você precisa indicar um repositório');
                }
                const response = await api.get(`repos/${newRepo}`);

                const hasRepo = repositorios.find(repo => repo.name === newRepo);

                if(hasRepo){
                    throw new Error('Repositório duplicado');
                }

                const data = {
                    name: response.data.full_name,

                }
                setRepositorios([...repositorios, data]);
                setNewRepo('');
            } catch (error) {
                setAlert(true)
                console.log(error);
            } finally {
                setLoading(false)
            }
        }


        submit();
    }, [newRepo, repositorios])

    function handleInputChange(e) {
        setNewRepo(e.target.value);
    }

    const handleDelete = useCallback((repo)=> {
        const find = repositorios.filter(r => r.name !== repo);
        setRepositorios(find);
    }, [repositorios]);
    



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
                        placeholder="digite um repositório/projecto"
                        value={newRepo}
                        onChange={handleInputChange}
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
                            <DeleteButton onClick={()=>handleDelete(repo.name)}>
                                <FaTrash color="#e63946" size={20} /> 
                            </DeleteButton>
                            <span>{repo.name}</span>
                            <a href="">
                                <FaBars size={20} />
                            </a>
                        </li>
                    ))}
                </List>


            </Container>
        </div>
    )
}