import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .construction {
    padding-top: 6rem;
    padding-bottom: 6rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  @media (min-width: 992px) {
    .construction {
      padding-top: 6rem;
      padding-bottom: 6rem;
      height: 100vh;
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
    }
  }
`;
export default Wrapper;
