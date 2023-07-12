import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;

  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .students {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 1rem;
    max-width: 100%;
  }
  @media (min-width: 992px) {
    .students {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 1rem;
    }
  }
`;
export default Wrapper;
