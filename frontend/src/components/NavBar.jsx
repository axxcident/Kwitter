import { Link } from 'react-router-dom'
import { Colors, Shadows } from '../styles'
import styled from 'styled-components'
import LinkToUserPage from './LinkToUserpage'
import LinkToPostAPost from './LinkToPostAPost'
import { useLocation } from 'react-router-dom'

const backgroundImage = 'url("/kwitter-logo-3.png")'

const colorStroke = ''
const widthStroke = 1

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
                    <LinkToUserPage
                        strokeWidth={widthStroke}
                        strokeColor={colorStroke}
                        path={currentPath}
                    />
                    <Link to="/">
                        <svg
                            className={
                                currentPath === '/' ? 'active' : 'flow-icon'
                            }
                            id="a"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 74.64 76.41"
                        >
                            <rect
                                className="flow-icon-detail"
                                x="7.65"
                                y="10.04"
                                width="60"
                                height="28.17"
                                rx="5"
                                ry="5"
                            />
                            <rect
                                className="flow-icon-detail"
                                x="7.65"
                                y="41.88"
                                width="60"
                                height="28.17"
                                rx="5"
                                ry="5"
                            />
                        </svg>
                    </Link>
                    <LinkToPostAPost
                        strokeWidth={widthStroke}
                        strokeColor={colorStroke}
                        path={currentPath}
                    />
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
        fill: ${Colors.KWITTERBLUE};
        stroke: none;
        stroke: ${colorStroke};
        stroke-width: ${widthStroke};
    }

    .flow-icon:hover .flow-icon-detail,
    .flow-icon:active .flow-icon-detail {
        fill: #000;
        stroke: none;
    }

    .active .flow-icon-detail {
        fill: #000;
        stroke: none;
    }
`
