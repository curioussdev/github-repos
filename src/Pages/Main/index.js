import React, { useCallback, useState, useEffect } from "react";
import { FaGithub, FaSearch, FaSpinner, FaBars, FaTrash} from 'react-icons/fa'
import { Container, Form, SubmitButton } from "./styles";
import { List } from "../../components/List";
import { DeleteButton } from "../../components/DeleteButton";
import api from "../../services/api";
import { Link } from "react-router-dom";


export default function Main() {
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);


    //DidMount || Buscar
    useEffect(() => {
        const repoStorage = localStorage.getItem('repos');

        if(repoStorage){
            setRepositorios(JSON.parse(repoStorage))
        }
    }, []);



    // DidUpdate || Salvar Alterações
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios));
    }, [repositorios]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        async function submit() {
            setLoading(true)
            setAlert(null);
            try {

                if(newRepo === ''){
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
        setAlert(null);
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

                <Form onSubmit={handleSubmit} error={alert}>
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
                            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                                <FaBars size={20} />
                            </Link>
                        </li>
                    ))}
                </List>


            </Container>
        </div>
    )
}