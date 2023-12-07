import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Wrapper from "../../assets/wrappers/Stats";

const Stats = () => {
  return (
    <Wrapper>
      <div className="construction">
        <AiOutlineLoading3Quarters size={100} className="animate-spin" />
        <h1 className="text-5xl text-slate-700 capitalize font-bold tracking-wider mt-12">
          Under construction!
        </h1>
      </div>
    </Wrapper>
  );
};

export default Stats;
