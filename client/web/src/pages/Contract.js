import React from "react";
import queryString from "query-string";
import ContractPaper from "components/ContractPaper";

/**
 * /contract 라우트에서 보여지는 계약 컴포넌트
 * @param location URL 쿼리 정보를 담고 있는 객체
 */
const Contract = ({ location }) => {
  const query = queryString.parse(location.search);
  const type = query.type;

  return (
    <div>
      <ContractPaper type={type} className="Contract" />
    </div>
  );
};

export default Contract;
