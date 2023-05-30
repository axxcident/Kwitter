import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LinkToUserPage from './LinkToUserpage'
import LinkToPostAPost from './LinkToPostAPost'

const backgroundImage = 'url("/kwitter-logo-3.png")'

function NavBar() {
    return (
        <Container>
            <Link to="/">
            <LogoContainer />
            </Link>
            <ButtonContainer>
                <LinkToUserPage />
                <Link to="/">
                    <svg
                        className="flow-icon"
                        id="a"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 42.5 26.04"
                    >
                        <path
                            id="b"
                            data-name="UPPER"
                            className="flow-icon-detail"
                            d="M19.71,.52C9.11,.52,.51,3.89,.51,8.03c0,2.28,2.6,4.32,6.7,5.7h0s-1.86,3.13-1.86,3.13l7.69-1.78h0c2.08,.3,4.33,.47,6.67,.47,10.6,0,19.2-3.36,19.2-7.51S30.32,.52,19.71,.52Z"
                        />
                        <path
                            id="c"
                            data-name="DOWN"
                            className="flow-icon-detail"
                            d="M13.04,15.08c14.96,1.86,22.45-2.77,22.45-2.77,3.91,1.2,6.42,3.06,6.42,5.16s-2.28,3.79-5.87,5l1.63,2.73-6.73-1.56c-1.82,.27-3.79,.41-5.85,.41-9.28,0-16.81-2.94-16.81-6.58,0-.47,.13-.93,.37-1.37l4.39-1.02Z"
                        />
                    </svg>
                </Link>
                <LinkToPostAPost />
            </ButtonContainer>
        </Container>
    )
}

export default NavBar

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border: 1px solid #000;

    @media (max-width: 425px) {
        bottom: 0;
        top: auto !important;
    }
`

const LogoContainer = styled.div`
    margin: 0 1rem;
    display: block;
    background-image: ${backgroundImage};
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 50px;
    height: 50px;
    @media (max-width: 425px) {
        display: none;
    }
`

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    padding: 1rem;

    @media (max-width: 425px) {
        justify-content: space-between;
    }
    .flow-icon {
        height: 40px;
    }
    .flow-icon-detail {
        fill: none;
        stroke: #000;
        stroke-width: 1px;
        /* stroke-miterlimit: 10; */
    }
`
