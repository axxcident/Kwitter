import { Link } from 'react-router-dom'
import { Colors, Shadows } from '../styles'
import styled from 'styled-components'
import LinkToUserPage from './LinkToUserpage'
import LinkToPostAPost from './LinkToPostAPost'
import { useLocation } from 'react-router-dom'

const backgroundImage = 'url("/kwitter-logo-3.png")'

const colorStroke = "#000"
const widthStroke = 2;

function NavBar() {
    const location = useLocation()
    const currentPath = location.pathname
    return (
        <Container>
            <Wrapper>
                <Link to="/">
                    <LogoContainer />
                </Link>
                <ButtonContainer>
                    <LinkToUserPage  strokeWidth={widthStroke} strokeColor={colorStroke} path={currentPath} />
                    <Link to="/" >
                        <svg
                            className={currentPath === '/' ? "active" : "flow-icon"}
                            id="a"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 120.41 73.79"
                        >
                            <path
                                className="flow-icon-detail"
                                d="M109.74,47.98c0-3.92-3.67-7.49-9.72-10.23-7.3,6.83-23.78,11.49-43.4,11.49-5.46,0-10.81-.37-15.91-1.09l-10.85,2.52c3.25,7.43,19.76,13.07,39.63,13.07,4.93,0,9.64-.33,14-.98l16.1,3.73-3.9-6.53c8.59-2.9,14.05-7.18,14.05-11.96Z"
                            />
                            <path
                                className="flow-icon-detail"
                                d="M56.61,44.23c26.58,0,44.44-8.52,44.44-16.47S83.2,11.29,56.61,11.29,12.17,19.81,12.17,27.76c0,4.49,5.61,9.06,15,12.22,.43,.14,.77,.48,.93,.9,.16,.42,.11,.9-.12,1.29l-2.65,4.46,14.97-3.47c.18-.04,.37-.05,.55-.02,5.04,.73,10.34,1.1,15.75,1.1Z"
                            />
                        </svg>
                    </Link>
                    <LinkToPostAPost strokeWidth={widthStroke} strokeColor={colorStroke} path={currentPath}/>
                </ButtonContainer>
            </Wrapper>
        </Container>
    )
}

export default NavBar

const Container = styled.div`
    /* background-color: #fff; */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /* border: 1px solid #000; */
    /* background-color: ${Colors.GREY};
        box-shadow: ${Shadows.DROPSHADOWS};
        -webkit-box-shadow: ${Shadows.DROPSHADOWS};
        -moz-box-shadow: ${Shadows.DROPSHADOWS}; */

    @media (max-width: 425px) {
        bottom: 0;
        top: auto !important;
        /* border: 1px solid #000; */
        background-color: ${Colors.GREY};
        box-shadow: ${Shadows.NAVBARSHADOW};
        -webkit-box-shadow: ${Shadows.NAVBARSHADOW};
        -moz-box-shadow: ${Shadows.NAVBARSHADOW};
    }
`

const Wrapper = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
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

    .active,
    .flow-icon {
        height: 30px;
    }

    .flow-icon-detail {
        fill: none;
        stroke: none;
        stroke : ${colorStroke};
        stroke-width: ${widthStroke};
    }

    .flow-icon:hover .flow-icon-detail,
    .flow-icon:active .flow-icon-detail{
        fill: #000;
        stroke: none;
    }

    .active .flow-icon-detail{
        fill: #000;
        stroke: none;
    }

`
