import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: flex;
  /* grid-template-rows: 1fr auto; */
  box-shadow: var(--shadow-2);
  max-width: 70vw;

  .container {
    display: flex;
  }
  header {
    padding-right: 1rem;
    border-right: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    background: var(--primary-900);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  .info {
    h5,
    h4 {
      margin-bottom: 0.15rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .interview {
    background: var(--primary-200);
    color: var(--grey-400);
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    flex-grow: 1;
    max-width: 50%;
  }
  .content-center {
    display: flex;
    /* flex-wrap: wrap; */
    justify-content: space-between;
    text-align: left;

    /* width: 30%;
    margin: 0;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    } */
  }
  .content-center p {
    flex: 0 0 48%;
    margin: 0.05rem;
    margin-left: 0.5rem;
    max-width: 30%;
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
    margin-top: 0.5rem;
  }
  footer {
    margin-top: 1rem;
    width: 50%;
    text-align: end;
  }
  /* .actions {
    padding-left: 2rem;
    text-align: end;
  } */
  .edit-btn,
  .open-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  .open-btn {
    color: var(--green-dark);
    background: var(--primary-500);
    width: 80%;
    text-align: center;
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default Wrapper;
